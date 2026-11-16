import { Bell, Calendar, Pill, Activity, CheckCircle, Clock } from 'lucide-react';

export default function Reminders() {
  const upcomingReminders = [
    {
      id: 1,
      title: 'Annual Mammography',
      description: 'Schedule your yearly screening at City Health Center',
      date: 'May 15, 2026',
      time: '10:00 AM',
      type: 'appointment',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Vitamin D Supplement',
      description: 'Take 2000 IU daily with breakfast',
      date: 'Daily',
      time: '8:00 AM',
      type: 'medication',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Blood Test Follow-up',
      description: 'Review results with Dr. Smith',
      date: 'May 5, 2026',
      time: '2:30 PM',
      type: 'appointment',
      priority: 'high',
    },
    {
      id: 4,
      title: 'Exercise Routine',
      description: '30-minute cardio session',
      date: 'Daily',
      time: '6:00 PM',
      type: 'activity',
      priority: 'medium',
    },
    {
      id: 5,
      title: 'Omega-3 Fish Oil',
      description: 'Take 1000mg with dinner',
      date: 'Daily',
      time: '7:00 PM',
      type: 'medication',
      priority: 'medium',
    },
  ];

  const recentNotifications = [
    {
      id: 1,
      message: 'Your test results are ready to view',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      message: 'Health score improved by 5% this month!',
      time: '1 day ago',
      read: false,
    },
    {
      id: 3,
      message: 'Reminder: Schedule your next appointment',
      time: '2 days ago',
      read: true,
    },
    {
      id: 4,
      message: 'New personalized health recommendations available',
      time: '3 days ago',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return Calendar;
      case 'medication':
        return Pill;
      case 'activity':
        return Activity;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-orange-500';
      case 'medium':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div className="min-h-full p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reminders & Notifications</h1>
          <p className="text-gray-600">Stay on top of your health schedule</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Upcoming Reminders */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Reminders</h2>

            {upcomingReminders.map((reminder) => {
              const Icon = getIcon(reminder.type);
              return (
                <div
                  key={reminder.id}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${getPriorityColor(reminder.priority)} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{reminder.title}</h3>
                        {reminder.priority === 'high' && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-semibold">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{reminder.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{reminder.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{reminder.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="flex-shrink-0 p-2 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </button>
                  </div>
                </div>
              );
            })}

            <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              + Add New Reminder
            </button>
          </div>

          {/* Recent Notifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Notifications</h2>

            <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-purple-100 last:border-b-0 ${
                    !notification.read ? 'bg-purple-50' : 'bg-white'
                  } hover:bg-purple-50 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    {!notification.read && (
                      <div className="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-semibold">
              View All Notifications
            </button>

            {/* Settings Card */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-white mt-6">
              <h3 className="font-semibold mb-3">Notification Settings</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Email notifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Push notifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>SMS reminders</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
