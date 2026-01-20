'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Diagnosis {
  disease: string;
  description: string;
  recommendation: string;
}

interface AppContextType {
  userName: string;
  setUserName: (name: string) => void;
  diagnosisResult: Diagnosis | null;
  setDiagnosisResult: (result: Diagnosis | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState<Diagnosis | null>(null);

  return (
    <AppContext.Provider value={{ userName, setUserName, diagnosisResult, setDiagnosisResult }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
