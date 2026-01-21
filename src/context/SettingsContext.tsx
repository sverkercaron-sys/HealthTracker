/**
 * Settings Context för att hantera användarinställningar
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Settings {
  dailyStepGoal: number;
  dailyCalorieGoal: number;
  dailyWaterGoal: number;
  notificationsEnabled: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  dailyStepGoal: 10000,
  dailyCalorieGoal: 2000,
  dailyWaterGoal: 8,
  notificationsEnabled: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    console.log('Settings updated:', { ...settings, ...newSettings });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings måste användas inom en SettingsProvider');
  }
  return context;
};
