# ================================
# IMPORT REQUIRED LIBRARIES
# ================================

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import os


# ================================
# DATASET PATH
# ================================

# Path where LungDataset is stored
data_dir = r"C:\Users\Jeyakodi\OneDrive\Desktop\LungDataset"


# ================================
# BASIC PARAMETERS
# ================================

# Image size (MobileNetV2 standard input size)
img_size = (224, 224)

# Number of images per batch (CPU friendly)
batch_size = 16


# ================================
# LOAD DATASET WITH 80-20 SPLIT
# ================================

# Load training dataset (80%)
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,      # 20% used for validation
    subset="training",
    seed=123,                  # ensures same split every run
    image_size=img_size,
    batch_size=batch_size
)

# Load validation dataset (20%)
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=img_size,
    batch_size=batch_size
)


# Lists (not mandatory here but kept if needed for manual tracking)
train_losses = []
val_losses = []
train_accuracies = []
val_accuracies = []


# Get class names from dataset folders
class_names = train_ds.class_names
print("Classes:", class_names)


# ================================
# IMAGE NORMALIZATION
# ================================

# Use MobileNetV2 specific preprocessing
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# Apply preprocessing to training and validation sets
train_ds = train_ds.map(lambda x, y: (preprocess_input(x), y))
val_ds = val_ds.map(lambda x, y: (preprocess_input(x), y))


# ================================
# PERFORMANCE OPTIMIZATION
# ================================

# Prefetch improves CPU performance
train_ds = train_ds.prefetch(buffer_size=tf.data.AUTOTUNE)
val_ds = val_ds.prefetch(buffer_size=tf.data.AUTOTUNE)


# ================================
# TRANSFER LEARNING MODEL
# ================================

# Load pretrained MobileNetV2 (without classification head)
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,      # remove original classifier
    weights="imagenet"      # pretrained on ImageNet
)

# Freeze entire base model initially
base_model.trainable = False


# ================================
# DATA AUGMENTATION (Prevents Overfitting)
# ================================

data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
])


# ================================
# BUILD FINAL CLASSIFICATION MODEL
# ================================

model = keras.Sequential([
    data_augmentation,               # apply augmentation
    base_model,                      # pretrained backbone
    layers.GlobalAveragePooling2D(), # convert feature maps to vector
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.4),             # regularization
    layers.Dense(3, activation='softmax')  # 3 output classes
])


# ================================
# COMPILE MODEL
# ================================

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()


# ================================
# HANDLE CLASS IMBALANCE
# ================================

import numpy as np
from sklearn.utils.class_weight import compute_class_weight

# Extract all labels from training dataset
y_train = np.concatenate([y for x, y in train_ds], axis=0)

# Compute balanced class weights
class_weights = compute_class_weight(
    class_weight="balanced",
    classes=np.unique(y_train),
    y=y_train
)

class_weights = dict(enumerate(class_weights))
print("Class Weights:", class_weights)


# ================================
# EARLY STOPPING CALLBACK
# ================================

early_stop = keras.callbacks.EarlyStopping(
    monitor='val_loss',        # monitor validation loss
    patience=4,                # stop if no improvement for 4 epochs
    restore_best_weights=True  # restore best model
)


# ================================
# INITIAL TRAINING (FEATURE EXTRACTION)
# ================================

print("\nStarting Initial Training...")

history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=25,
    class_weight=class_weights,
    callbacks=[early_stop],
    verbose=1
)

# ================================
# FINE-TUNING STEP (SAFE VERSION)
# ================================

print("\nStarting Fine-Tuning...")

base_model.trainable = True

for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history_fine = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=5,  # reduce to 5
    class_weight=class_weights,
    verbose=1
)

print("\nFine-tuning completed.")


# ================================
# SAFE HISTORY COMBINATION
# ================================

# Combine only if fine-tuning actually ran
acc = history.history.get('accuracy', [])
val_acc = history.history.get('val_accuracy', [])
loss = history.history.get('loss', [])
val_loss = history.history.get('val_loss', [])

if history_fine.history:
    acc += history_fine.history.get('accuracy', [])
    val_acc += history_fine.history.get('val_accuracy', [])
    loss += history_fine.history.get('loss', [])
    val_loss += history_fine.history.get('val_loss', [])

total_epochs = range(1, len(acc) + 1)


# ================================
# ACCURACY GRAPH
# ================================

import matplotlib.pyplot as plt

plt.figure(figsize=(8,6))
plt.plot(total_epochs, acc, label='Training Accuracy')
plt.plot(total_epochs, val_acc, label='Validation Accuracy')

if history_fine.history:
    plt.axvline(x=len(history.history['accuracy']),
                color='gray',
                linestyle='--',
                label='Start Fine-Tuning')

plt.title('Training and Validation Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)

plt.savefig("accuracy_curve.png", dpi=600, bbox_inches='tight')
plt.show()


# ================================
# LOSS GRAPH
# ================================

plt.figure(figsize=(8,6))
plt.plot(total_epochs, loss, label='Training Loss')
plt.plot(total_epochs, val_loss, label='Validation Loss')

if history_fine.history:
    plt.axvline(x=len(history.history['accuracy']),
                color='gray',
                linestyle='--',
                label='Start Fine-Tuning')

plt.title('Training and Validation Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)

plt.savefig("loss_curve.png", dpi=600, bbox_inches='tight')
plt.show()


# ================================
# MODEL EVALUATION
# ================================

from sklearn.metrics import classification_report, confusion_matrix
import numpy as np

y_true = []
y_pred = []

for images, labels in val_ds:
    preds = model.predict(images, verbose=0)
    y_true.extend(labels.numpy())
    y_pred.extend(np.argmax(preds, axis=1))

print("\nClassification Report:")
print(classification_report(y_true, y_pred, target_names=class_names))

print("\nConfusion Matrix:")
cm = confusion_matrix(y_true, y_pred)
print(cm)


# ================================
# CONFUSION MATRIX HEATMAP
# ================================

plt.figure(figsize=(6,6))
plt.imshow(cm)
plt.title("Confusion Matrix")
plt.colorbar()

plt.xticks(np.arange(len(class_names)), class_names, rotation=45)
plt.yticks(np.arange(len(class_names)), class_names)

for i in range(len(class_names)):
    for j in range(len(class_names)):
        plt.text(j, i, cm[i, j], ha="center", va="center")

plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.tight_layout()
plt.show()


# ================================
# SAVE MODEL
# ================================

model.save("lung_ct_model.keras")
print("\nModel saved successfully.")