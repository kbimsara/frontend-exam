import React, { useState } from 'react';
import PageLayout from '../components/ui/PageLayout';
import SectionCard from '../components/ui/SectionCard';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import toast from 'react-hot-toast';
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
    toast.success('Settings saved successfully');
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
    toast.success('Settings reset to default');
  };

  const handleChangePassword = () => {
    toast.error('Password change is not implemented in demo');
  };

  const handleDeleteAccount = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-[13px] font-medium text-white">
          Are you sure? This action cannot be undone.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              toast.success('Account deletion requested');
            }}
            className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-[12px] font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-200 text-[12px] font-medium hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
    });
  };

  const SettingRow = ({ label, description, children }) => (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-100 last:border-0 last:pb-0 first:pt-0">
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-slate-900">{label}</p>
        <p className="text-[12px] text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );

  return (
    <PageLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar Menu */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200/80 p-2 lg:sticky lg:top-20">
            <nav className="space-y-0.5">
              {menuItems.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setActiveMenu(label)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    activeMenu === label
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
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
          {activeMenu === 'General' && (
            <SectionCard title="General Settings">
              <div className="flex flex-col">
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
          )}

          {/* Notification Preferences */}
          {activeMenu === 'Notifications' && (
            <SectionCard title="Notification Preferences">
              <div className="flex flex-col">
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
          )}

          {/* Security */}
          {activeMenu === 'Security' && (
            <div className="space-y-6">
              <SectionCard title="Security Settings">
                <div className="flex flex-col">
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
                      className="btn-secondary py-1.5 px-3 text-[13px]"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      Change
                    </button>
                  </SettingRow>
                </div>
              </SectionCard>

              {/* Danger Zone */}
              <div className="bg-white rounded-xl border-2 border-red-200 overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-red-100 bg-red-50/30">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <h2 className="text-sm font-semibold text-red-700">Danger Zone</h2>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-medium text-slate-900">
                        Delete Account
                      </p>
                      <p className="text-[12px] text-slate-500 mt-0.5">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <button
                      onClick={handleDeleteAccount}
                      className="btn-danger py-1.5 px-3 text-[13px] flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeMenu === 'Preferences' && (
            <SectionCard title="Preferences">
              <div className="flex flex-col">
                <SettingRow
                  label="Language"
                  description="Select your preferred language"
                >
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="input-base py-1.5 text-[13px] min-w-[160px]"
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
                    className="input-base py-1.5 text-[13px] min-w-[160px]"
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
                    className="input-base py-1.5 text-[13px] min-w-[160px]"
                  >
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                  </select>
                </SettingRow>
              </div>
            </SectionCard>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
            <button
              onClick={handleResetSettings}
              className="btn-secondary w-full sm:w-auto text-[13px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Default
            </button>
            <button
              onClick={handleSaveSettings}
              className="btn-primary w-full sm:w-auto text-[13px]"
            >
              <Save className="w-3.5 h-3.5" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;