export const predictBreast = async (features) => {
  const response = await fetch("http://localhost:5000/predict-breast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ features }),
  });

  return response.json();
};


export const predictLung = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("http://localhost:5000/predict-lung", {
    method: "POST",
    body: formData,
  });

  return response.json();
};