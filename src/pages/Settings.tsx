import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import { Settings as SettingsIcon, Palette, Bell, User, Shield, Database, Globe, Moon, Sun } from 'lucide-react';

const PageContainer = styled.div`
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
`;

const SettingsCard = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SettingName = styled.span`
  font-weight: 500;
  color: #374151;
`;

const SettingDescription = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #3b82f6;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const ColorPicker = styled.input`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: none;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`;

const ThemePreview = styled.div<{ primaryColor: string; secondaryColor: string }>`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${props => props.color};
  border: 1px solid #d1d5db;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 8px;
`;

const NotificationIcon = styled.div<{ type: 'success' | 'warning' | 'info' | 'error' }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  color: white;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: 500;
  color: #111827;
  margin-bottom: 2px;
`;

const NotificationMessage = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const SaveButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`;

export const Settings: React.FC = () => {
  const { state, actions, theme } = useApp();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    lowStock: true,
    salesReport: true,
    systemUpdates: false
  });

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: theme.primary,
    secondaryColor: theme.secondary,
    mode: 'light' as 'light' | 'dark'
  });

  const [sampleNotifications] = useState([
    { id: 1, type: 'success', title: 'Sale Completed', message: 'Product sold successfully - ₦15,000', time: '2 min ago' },
    { id: 2, type: 'warning', title: 'Low Stock Alert', message: 'iPhone 13 Pro is running low (3 items left)', time: '15 min ago' },
    { id: 3, type: 'info', title: 'Daily Report Ready', message: 'Your sales report for today is available', time: '1 hour ago' },
    { id: 4, type: 'error', title: 'Payment Failed', message: 'Credit card payment failed for order #1234', time: '2 hours ago' }
  ]);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (key: string, value: string) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyTheme = () => {
    // For now, we'll just update the theme name
    // In a real app, you'd want to create a custom theme with the selected colors
    actions.setTheme('blue'); // This is a placeholder - you'd implement custom theme creation
  };

  return (
    <PageContainer>
      <Header>
        <SettingsIcon size={28} color="#3b82f6" />
        <HeaderTitle>Settings</HeaderTitle>
      </Header>

      <SettingsGrid>
        {/* Theme Settings */}
        <SettingsCard>
          <CardHeader>
            <Palette size={20} color="#3b82f6" />
            <CardTitle>Theme Customization</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <SettingLabel>
              <SettingName>Primary Color</SettingName>
              <SettingDescription>Main brand color for buttons and accents</SettingDescription>
            </SettingLabel>
            <ColorPicker
              type="color"
              value={themeSettings.primaryColor}
              onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Secondary Color</SettingName>
              <SettingDescription>Secondary color for highlights</SettingDescription>
            </SettingLabel>
            <ColorPicker
              type="color"
              value={themeSettings.secondaryColor}
              onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Theme Mode</SettingName>
              <SettingDescription>Choose between light and dark mode</SettingDescription>
            </SettingLabel>
            <Select
              value={themeSettings.mode}
              onChange={(e) => handleThemeChange('mode', e.target.value)}
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </Select>
          </SettingItem>

          <ThemePreview primaryColor={themeSettings.primaryColor} secondaryColor={themeSettings.secondaryColor}>
            <ColorSwatch color={themeSettings.primaryColor} />
            <ColorSwatch color={themeSettings.secondaryColor} />
          </ThemePreview>

          <SaveButton onClick={applyTheme}>
            Apply Theme
          </SaveButton>
        </SettingsCard>

        {/* Notification Settings */}
        <SettingsCard>
          <CardHeader>
            <Bell size={20} color="#3b82f6" />
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <SettingLabel>
              <SettingName>Email Notifications</SettingName>
              <SettingDescription>Receive updates via email</SettingDescription>
            </SettingLabel>
            <Toggle>
              <ToggleInput
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Push Notifications</SettingName>
              <SettingDescription>Desktop notifications</SettingDescription>
            </SettingLabel>
            <Toggle>
              <ToggleInput
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>SMS Notifications</SettingName>
              <SettingDescription>Text message alerts</SettingDescription>
            </SettingLabel>
            <Toggle>
              <ToggleInput
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Low Stock Alerts</SettingName>
              <SettingDescription>Get notified when inventory is low</SettingDescription>
            </SettingLabel>
            <Toggle>
              <ToggleInput
                type="checkbox"
                checked={notifications.lowStock}
                onChange={(e) => handleNotificationChange('lowStock', e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Sales Reports</SettingName>
              <SettingDescription>Daily and weekly sales summaries</SettingDescription>
            </SettingLabel>
            <Toggle>
              <ToggleInput
                type="checkbox"
                checked={notifications.salesReport}
                onChange={(e) => handleNotificationChange('salesReport', e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>
        </SettingsCard>

        {/* Account Settings */}
        <SettingsCard>
          <CardHeader>
            <User size={20} color="#3b82f6" />
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <SettingLabel>
              <SettingName>Profile Information</SettingName>
              <SettingDescription>Update your personal details</SettingDescription>
            </SettingLabel>
            <SaveButton>Edit Profile</SaveButton>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Change Password</SettingName>
              <SettingDescription>Update your account password</SettingDescription>
            </SettingLabel>
            <SaveButton>Change Password</SaveButton>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Two-Factor Authentication</SettingName>
              <SettingDescription>Add extra security to your account</SettingDescription>
            </SettingLabel>
            <Toggle>
              <ToggleInput type="checkbox" />
              <ToggleSlider />
            </Toggle>
          </SettingItem>
        </SettingsCard>

        {/* System Settings */}
        <SettingsCard>
          <CardHeader>
            <Shield size={20} color="#3b82f6" />
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <SettingLabel>
              <SettingName>Auto Backup</SettingName>
              <SettingDescription>Automatically backup data daily</SettingDescription>
            </SettingLabel>
            <Toggle>
              <ToggleInput type="checkbox" defaultChecked />
              <ToggleSlider />
            </Toggle>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Data Export</SettingName>
              <SettingDescription>Export your data to CSV/Excel</SettingDescription>
            </SettingLabel>
            <SaveButton>Export Data</SaveButton>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>System Updates</SettingName>
              <SettingDescription>Automatically check for updates</SettingDescription>
            </SettingLabel>
            <Toggle>
              <ToggleInput type="checkbox" defaultChecked />
              <ToggleSlider />
            </Toggle>
          </SettingItem>
        </SettingsCard>

        {/* Recent Notifications */}
        <SettingsCard>
          <CardHeader>
            <Bell size={20} color="#3b82f6" />
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          
          {sampleNotifications.map(notification => (
            <NotificationItem key={notification.id}>
              <NotificationIcon type={notification.type}>
                <Bell size={16} />
              </NotificationIcon>
              <NotificationContent>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
              </NotificationContent>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>{notification.time}</span>
            </NotificationItem>
          ))}
        </SettingsCard>

        {/* App Information */}
        <SettingsCard>
          <CardHeader>
            <Database size={20} color="#3b82f6" />
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <SettingLabel>
              <SettingName>Version</SettingName>
              <SettingDescription>Current application version</SettingDescription>
            </SettingLabel>
            <span style={{ color: '#6b7280' }}>v2.1.0</span>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Last Updated</SettingName>
              <SettingDescription>When the app was last updated</SettingDescription>
            </SettingLabel>
            <span style={{ color: '#6b7280' }}>Dec 15, 2024</span>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Database Size</SettingName>
              <SettingDescription>Current database size</SettingDescription>
            </SettingLabel>
            <span style={{ color: '#6b7280' }}>2.4 MB</span>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              <SettingName>Total Records</SettingName>
              <SettingDescription>Number of records in database</SettingDescription>
            </SettingLabel>
            <span style={{ color: '#6b7280' }}>1,247</span>
          </SettingItem>
        </SettingsCard>
      </SettingsGrid>
    </PageContainer>
  );
};
