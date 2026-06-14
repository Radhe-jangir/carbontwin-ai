import { User } from 'lucide-react';

function Profile() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <User size={32} className="text-emerald-600" />
          Profile Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account and preferences.
        </p>
      </div>

      <div className="card p-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Profile management and settings will be available soon.
        </p>
      </div>
    </div>
  );
}

export default Profile;