import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Shield, CheckCircle2, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';

export const AadharVerification = () => {
  const { t } = useLanguage();
  const { verificationStatus, setVerificationStatus, farmerProfile, setFarmerProfile } = useApp();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleConnect = async () => {
    setIsVerifying(true);
    setVerificationStatus({ ...verificationStatus, aadhar: 'verifying' });
    
    // Simulate DigiLocker verification
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setFarmerProfile({
      ...farmerProfile,
      aadharNumber: 'XXXX XXXX 4521',
      dob: '15/08/1985',
      address: 'Village Rampur, Block Chandauli, District Varanasi, Uttar Pradesh - 221104',
    });
    
    setVerificationStatus({ ...verificationStatus, aadhar: 'verified' });
    setIsVerifying(false);
  };

  const isVerified = verificationStatus.aadhar === 'verified';

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('aadhar.title')}</h1>
          <p className="text-muted-foreground">{t('aadhar.subtitle')}</p>
        </div>
      </div>

      <div className="card-elevated p-6">
        {!isVerified ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Fingerprint className="w-10 h-10 text-blue-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-foreground mb-2">
              DigiLocker Integration
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Securely verify your Aadhar card details through the official DigiLocker platform.
            </p>

            <button
              onClick={handleConnect}
              disabled={isVerifying}
              className="px-8 py-3.5 rounded-xl btn-primary-gradient font-semibold inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('aadhar.verifying')}
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  {t('aadhar.connect')}
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1">
              <Shield className="w-4 h-4 text-success" />
              Secured by Government of India
            </p>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-6 p-4 bg-success/10 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-success" />
              <span className="font-semibold text-success">{t('aadhar.verified')}</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{t('aadhar.name')}</p>
                <p className="font-semibold text-foreground">{farmerProfile.name}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{t('aadhar.number')}</p>
                <p className="font-semibold text-foreground font-mono">{farmerProfile.aadharNumber}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{t('aadhar.dob')}</p>
                <p className="font-semibold text-foreground">{farmerProfile.dob}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{t('aadhar.address')}</p>
                <p className="font-semibold text-foreground">{farmerProfile.address}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/credit')}
              className="w-full mt-6 py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2"
            >
              {t('common.next')}: {t('credit.title')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AadharVerification;
