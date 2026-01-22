import React, { createContext, useContext, useState } from 'react';

interface FarmerProfile {
  nameEn: string;
  nameHi: string;
  phone: string;

  // ✅ New fields
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  dob?: string;

  aadharNumber?: string;
  creditScore?: number;
  landDetails?: {
    khasraNumber: string;
    area: number;
    district: string;
    village: string;
    ownershipVerified: boolean;
  };
  selectedCrops?: Array<{
    id: string;
    name: string;
    nameHi: string;
    season: 'kharif' | 'rabi';
    scaleOfFinance: number;
  }>;
  eligibleAmount?: number;
}

interface VerificationStatus {
  aadhar: 'pending' | 'verifying' | 'verified';
  credit: 'pending' | 'verifying' | 'verified';
  land: 'pending' | 'verifying' | 'verified';
  crop: 'pending' | 'complete';
  loan: 'pending' | 'calculated';
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  farmerProfile: FarmerProfile;
  setFarmerProfile: (profile: FarmerProfile) => void;
  verificationStatus: VerificationStatus;
  setVerificationStatus: (status: VerificationStatus) => void;
  applicationSubmitted: boolean;
  setApplicationSubmitted: (value: boolean) => void;
  applicationReference: string | null;
  setApplicationReference: (ref: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationReference, setApplicationReference] = useState<string | null>(null);

  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>({
    nameEn: '',
    nameHi: '',
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    dob: '',
  });

  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    aadhar: 'pending',
    credit: 'pending',
    land: 'pending',
    crop: 'pending',
    loan: 'pending',
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        farmerProfile,
        setFarmerProfile,
        verificationStatus,
        setVerificationStatus,
        applicationSubmitted,
        setApplicationSubmitted,
        applicationReference,
        setApplicationReference,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
