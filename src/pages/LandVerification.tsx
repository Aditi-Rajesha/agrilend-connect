import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Shield, CheckCircle2, Loader2, ArrowRight, ArrowLeft, Map } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';

export const LandVerification = () => {
  const { t } = useLanguage();
  const { verificationStatus, setVerificationStatus, farmerProfile, setFarmerProfile } = useApp();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerificationStatus({ ...verificationStatus, land: 'verifying' });
    
    // Simulate Agristack verification
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setFarmerProfile({
      ...farmerProfile,
      landDetails: {
        khasraNumber: '123/45',
        area: 2.5,
        district: 'Varanasi',
        village: 'Rampur',
        ownershipVerified: true,
      },
    });
    
    setVerificationStatus({ ...verificationStatus, land: 'verified' });
    setIsVerifying(false);
  };

  const isVerified = verificationStatus.land === 'verified';
  const land = farmerProfile.landDetails;

  return (
    <DashboardLayout>
      {/* ✅ Header with right-side badge */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('land.title')}</h1>
            <p className="text-muted-foreground">{t('land.subtitle')}</p>
          </div>
        </div>

        <div className="pt-2">
          <StatusBadge status={verificationStatus.land} />
        </div>
      </div>

      <div className="card-elevated p-6">
        {!isVerified ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Agristack India (UP)
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Verify your land ownership records through Uttar Pradesh's Agristack database.
            </p>

            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="px-8 py-3.5 rounded-xl btn-primary-gradient font-semibold inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Map className="w-5 h-5" />
                  {t('land.verify')}
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1">
              <Shield className="w-4 h-4 text-success" />
              Powered by Agristack UP
            </p>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-6 p-4 bg-success/10 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-success" />
              <span className="font-semibold text-success">Land Records Verified</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{t('land.khasra')}</p>
                <p className="font-semibold text-foreground font-mono">{land?.khasraNumber}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{t('land.area')}</p>
                <p className="font-semibold text-foreground">{land?.area} {t('common.hectares')}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{t('land.district')}</p>
                <p className="font-semibold text-foreground">{land?.district}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{t('land.village')}</p>
                <p className="font-semibold text-foreground">{land?.village}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-success/5 border border-success/20 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">{t('land.ownership')}</p>
              <p className="font-semibold text-success flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Verified Owner - राजेश कुमार
              </p>
            </div>

            <button
              onClick={() => navigate('/crop')}
              className="w-full mt-6 py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2"
            >
              {t('common.next')}: {t('crop.title')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LandVerification;
