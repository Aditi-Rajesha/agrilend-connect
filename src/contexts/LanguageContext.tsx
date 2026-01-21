import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Login
    'login.title': 'Agri Loan Marketplace',
    'login.subtitle': 'Digital Financial Identity for Farmers',
    'login.phone': 'Mobile Number',
    'login.phonePlaceholder': 'Enter 10-digit mobile number',
    'login.getOtp': 'Get OTP',
    'login.enterOtp': 'Enter OTP',
    'login.otpSent': 'OTP sent to',
    'login.verify': 'Verify & Login',
    'login.resend': 'Resend OTP',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.profile': 'Farmer Profile',
    'dashboard.verification': 'Verification Status',
    'dashboard.loanEligibility': 'Loan Eligibility',
    
    // Sidebar
    'sidebar.home': 'Home',
    'sidebar.aadhar': 'Aadhar Verification',
    'sidebar.credit': 'Credit Bureau Check',
    'sidebar.land': 'Land Verification',
    'sidebar.crop': 'Crop Selection',
    'sidebar.calculate': 'Calculate Loan',
    'sidebar.apply': 'Apply for Loan',
    'sidebar.logout': 'Logout',
    
    // Modules
    'aadhar.title': 'Aadhar Verification',
    'aadhar.subtitle': 'Verify your identity via DigiLocker',
    'aadhar.connect': 'Connect DigiLocker',
    'aadhar.verifying': 'Verifying...',
    'aadhar.verified': 'Aadhar Verified',
    'aadhar.name': 'Name',
    'aadhar.number': 'Aadhar Number',
    'aadhar.dob': 'Date of Birth',
    'aadhar.address': 'Address',
    
    'credit.title': 'Credit Bureau Check',
    'credit.subtitle': 'Check your credit score via CRIF',
    'credit.check': 'Check Credit Score',
    'credit.score': 'Credit Score',
    'credit.status': 'Credit Status',
    'credit.good': 'Good',
    'credit.excellent': 'Excellent',
    'credit.fair': 'Fair',
    
    'land.title': 'Land Verification',
    'land.subtitle': 'Verify land records via Agristack',
    'land.verify': 'Verify Land Records',
    'land.khasra': 'Khasra Number',
    'land.area': 'Total Area',
    'land.district': 'District',
    'land.village': 'Village',
    'land.ownership': 'Ownership Status',
    
    'crop.title': 'Crop Selection',
    'crop.subtitle': 'Select crops from NABARD list',
    'crop.select': 'Select Your Crops',
    'crop.selected': 'Selected Crops',
    'crop.season': 'Season',
    'crop.kharif': 'Kharif',
    'crop.rabi': 'Rabi',
    
    'loan.title': 'Loan Amount Calculation',
    'loan.subtitle': 'Based on NABARD Scale of Finance (UP)',
    'loan.calculate': 'Calculate Loan Amount',
    'loan.eligible': 'Eligible Loan Amount',
    'loan.max': 'Maximum: ₹2,00,000',
    'loan.tenure': 'Tenure: 5 Years',
    'loan.type': 'Crop Loan Overdraft',
    
    'apply.title': 'Apply for Loan',
    'apply.subtitle': 'Submit your loan application',
    'apply.submit': 'Submit Application',
    'apply.review': 'Review Details',
    'apply.success': 'Application Submitted!',
    'apply.reference': 'Reference Number',
    
    // Status
    'status.pending': 'Pending',
    'status.verified': 'Verified',
    'status.complete': 'Complete',
    'status.inProgress': 'In Progress',
    
    // Common
    'common.next': 'Next',
    'common.back': 'Back',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.hectares': 'Hectares',
    'common.acres': 'Acres',
  },
  hi: {
    // Login
    'login.title': 'कृषि ऋण मार्केटप्लेस',
    'login.subtitle': 'किसानों के लिए डिजिटल वित्तीय पहचान',
    'login.phone': 'मोबाइल नंबर',
    'login.phonePlaceholder': '10 अंकों का मोबाइल नंबर दर्ज करें',
    'login.getOtp': 'OTP प्राप्त करें',
    'login.enterOtp': 'OTP दर्ज करें',
    'login.otpSent': 'OTP भेजा गया',
    'login.verify': 'सत्यापित करें और लॉगिन करें',
    'login.resend': 'OTP पुनः भेजें',
    
    // Dashboard
    'dashboard.welcome': 'स्वागत है',
    'dashboard.profile': 'किसान प्रोफ़ाइल',
    'dashboard.verification': 'सत्यापन स्थिति',
    'dashboard.loanEligibility': 'ऋण पात्रता',
    
    // Sidebar
    'sidebar.home': 'होम',
    'sidebar.aadhar': 'आधार सत्यापन',
    'sidebar.credit': 'क्रेडिट ब्यूरो जांच',
    'sidebar.land': 'भूमि सत्यापन',
    'sidebar.crop': 'फसल चयन',
    'sidebar.calculate': 'ऋण गणना',
    'sidebar.apply': 'ऋण के लिए आवेदन',
    'sidebar.logout': 'लॉग आउट',
    
    // Modules
    'aadhar.title': 'आधार सत्यापन',
    'aadhar.subtitle': 'DigiLocker के माध्यम से अपनी पहचान सत्यापित करें',
    'aadhar.connect': 'DigiLocker से जुड़ें',
    'aadhar.verifying': 'सत्यापित हो रहा है...',
    'aadhar.verified': 'आधार सत्यापित',
    'aadhar.name': 'नाम',
    'aadhar.number': 'आधार नंबर',
    'aadhar.dob': 'जन्म तिथि',
    'aadhar.address': 'पता',
    
    'credit.title': 'क्रेडिट ब्यूरो जांच',
    'credit.subtitle': 'CRIF के माध्यम से अपना क्रेडिट स्कोर जांचें',
    'credit.check': 'क्रेडिट स्कोर जांचें',
    'credit.score': 'क्रेडिट स्कोर',
    'credit.status': 'क्रेडिट स्थिति',
    'credit.good': 'अच्छा',
    'credit.excellent': 'उत्कृष्ट',
    'credit.fair': 'ठीक',
    
    'land.title': 'भूमि सत्यापन',
    'land.subtitle': 'Agristack के माध्यम से भूमि रिकॉर्ड सत्यापित करें',
    'land.verify': 'भूमि रिकॉर्ड सत्यापित करें',
    'land.khasra': 'खसरा नंबर',
    'land.area': 'कुल क्षेत्र',
    'land.district': 'जिला',
    'land.village': 'गाँव',
    'land.ownership': 'स्वामित्व स्थिति',
    
    'crop.title': 'फसल चयन',
    'crop.subtitle': 'NABARD सूची से फसलें चुनें',
    'crop.select': 'अपनी फसलें चुनें',
    'crop.selected': 'चयनित फसलें',
    'crop.season': 'मौसम',
    'crop.kharif': 'खरीफ',
    'crop.rabi': 'रबी',
    
    'loan.title': 'ऋण राशि गणना',
    'loan.subtitle': 'NABARD स्केल ऑफ फाइनेंस (UP) के आधार पर',
    'loan.calculate': 'ऋण राशि की गणना करें',
    'loan.eligible': 'पात्र ऋण राशि',
    'loan.max': 'अधिकतम: ₹2,00,000',
    'loan.tenure': 'अवधि: 5 वर्ष',
    'loan.type': 'फसल ऋण ओवरड्राफ्ट',
    
    'apply.title': 'ऋण के लिए आवेदन',
    'apply.subtitle': 'अपना ऋण आवेदन जमा करें',
    'apply.submit': 'आवेदन जमा करें',
    'apply.review': 'विवरण की समीक्षा करें',
    'apply.success': 'आवेदन जमा हो गया!',
    'apply.reference': 'संदर्भ संख्या',
    
    // Status
    'status.pending': 'लंबित',
    'status.verified': 'सत्यापित',
    'status.complete': 'पूर्ण',
    'status.inProgress': 'प्रगति में',
    
    // Common
    'common.next': 'आगे',
    'common.back': 'पीछे',
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.continue': 'जारी रखें',
    'common.hectares': 'हेक्टेयर',
    'common.acres': 'एकड़',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
