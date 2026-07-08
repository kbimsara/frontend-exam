import React, { useState } from 'react';
import PageLayout from '../components/ui/PageLayout';
import SectionCard from '../components/ui/SectionCard';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Globe,
  Trash2,
  KeyRound,
  Save,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

const menuItems = [
  { label: 'General', icon: SettingsIcon },
  { label: 'Notifications', icon: Bell },
  { label: 'Security', icon: Shield },
  { label: 'Preferences', icon: Globe },
];

const Settings = () => {
  const [activeMenu, setActiveMenu] = useState('General');
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [promotions, setPromotions] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');
  const [timeZone, setTimeZone] = useState('America/New_York');

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setNewsletter(false);
    setDarkMode(false);
    setEmailNotifications(true);
    setSmsNotifications(false);
    setPromotions(true);
    setTwoFactor(false);
    setLanguage('English');
    setCurrency('USD');
    setTimeZone('America/New_York');
  };

  const handleChangePassword = () => {
    alert('Password change feature not implemented');
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      alert('Account deletion feature not implemented');
    }
  };

  const SettingRow = ({ label, description, children }) => (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-slate-100 hover:bg-slate-50/50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );

  return (
    <PageLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Menu */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sticky top-24">
            <nav className="space-y-1">
              {menuItems.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setActiveMenu(label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeMenu === label
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          <SectionCard title="General Settings">
            <div className="space-y-3">
              <SettingRow
                label="Enable Notifications"
                description="Receive notifications about your orders and updates"
              >
                <ToggleSwitch
                  checked={notifications}
                  onChange={setNotifications}
                />
              </SettingRow>
              <SettingRow
                label="Subscribe to Newsletter"
                description="Get the latest news, updates, and special offers"
              >
                <ToggleSwitch checked={newsletter} onChange={setNewsletter} />
              </SettingRow>
              <SettingRow
                label="Dark Mode"
                description="Switch to dark theme for better viewing at night"
              >
                <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
              </SettingRow>
            </div>
          </SectionCard>

          {/* Notification Preferences */}
          <SectionCard title="Notification Preferences">
            <div className="space-y-3">
              <SettingRow
                label="Email Notifications"
                description="Receive order updates and promotions via email"
              >
                <ToggleSwitch
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                />
              </SettingRow>
              <SettingRow
                label="SMS Notifications"
                description="Get order updates via text message"
              >
                <ToggleSwitch
                  checked={smsNotifications}
                  onChange={setSmsNotifications}
                />
              </SettingRow>
              <SettingRow
                label="Promotional Offers"
                description="Receive exclusive deals and discounts"
              >
                <ToggleSwitch checked={promotions} onChange={setPromotions} />
              </SettingRow>
            </div>
          </SectionCard>

          {/* Security */}
          <SectionCard title="Security Settings">
            <div className="space-y-3">
              <SettingRow
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              >
                <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
              </SettingRow>
              <SettingRow
                label="Change Password"
                description="Update your account password"
              >
                <button
                  onClick={handleChangePassword}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Change
                </button>
              </SettingRow>
            </div>
          </SectionCard>

          {/* Preferences */}
          <SectionCard title="Preferences">
            <div className="space-y-3">
              <SettingRow
                label="Language"
                description="Select your preferred language"
              >
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition min-w-[160px]"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </SettingRow>
              <SettingRow
                label="Currency"
                description="Choose your preferred currency"
              >
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition min-w-[160px]"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </SettingRow>
              <SettingRow
                label="Time Zone"
                description="Set your local time zone"
              >
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition min-w-[160px]"
                >
                  <option value="America/New_York">Eastern Time (US & Canada)</option>
                  <option value="America/Chicago">Central Time (US & Canada)</option>
                  <option value="America/Denver">Mountain Time (US & Canada)</option>
                  <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                </select>
              </SettingRow>
            </div>
          </SectionCard>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-rose-200 overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-rose-100 bg-rose-50/50">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <h2 className="text-lg font-semibold text-rose-700">Danger Zone</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-rose-100">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Delete Account
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Permanently delete your account and all data
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handleResetSettings}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
            <button
              onClick={handleSaveSettings}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all"
            >
              <Save className="w-4 h-4" />
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;