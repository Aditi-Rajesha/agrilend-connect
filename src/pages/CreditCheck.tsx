import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, CheckCircle2, Loader2, ArrowRight, ArrowLeft, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';

export const CreditCheck = () => {
  const { t } = useLanguage();
  const { verificationStatus, setVerificationStatus, farmerProfile, setFarmerProfile } = useApp();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async () => {
    setIsChecking(true);
    setVerificationStatus({ ...verificationStatus, credit: 'verifying' });
    
    // Simulate CRIF check
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setFarmerProfile({
      ...farmerProfile,
      creditScore: 742,
    });
    
    setVerificationStatus({ ...verificationStatus, credit: 'verified' });
    setIsChecking(false);
  };

  const isVerified = verificationStatus.credit === 'verified';
  const score = farmerProfile.creditScore || 0;
  
  const getScoreStatus = () => {
    if (score >= 750) return { label: t('credit.excellent'), color: 'text-success' };
    if (score >= 650) return { label: t('credit.good'), color: 'text-primary' };
    return { label: t('credit.fair'), color: 'text-secondary' };
  };

  const scoreStatus = getScoreStatus();

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
          <h1 className="text-2xl font-bold text-foreground">{t('credit.title')}</h1>
          <p className="text-muted-foreground">{t('credit.subtitle')}</p>
        </div>
      </div>

      <div className="card-elevated p-6">
        {!isVerified ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <CreditCard className="w-10 h-10 text-purple-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-foreground mb-2">
              CRIF Credit Bureau
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Check your credit score and history to determine loan eligibility.
            </p>

            <button
              onClick={handleCheck}
              disabled={isChecking}
              className="px-8 py-3.5 rounded-xl btn-primary-gradient font-semibold inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  {t('credit.check')}
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1">
              <Shield className="w-4 h-4 text-success" />
              Powered by CRIF High Mark
            </p>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-6 p-4 bg-success/10 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-success" />
              <span className="font-semibold text-success">Credit Check Complete</span>
            </div>

            {/* Score Display */}
            <div className="text-center py-8 mb-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
              <p className="text-sm text-muted-foreground mb-2">{t('credit.score')}</p>
              <div className="text-6xl font-bold text-primary mb-2">{score}</div>
              <p className={`font-semibold ${scoreStatus.color}`}>{scoreStatus.label}</p>
              
              {/* Score Bar */}
              <div className="max-w-xs mx-auto mt-6">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-destructive via-secondary to-success rounded-full transition-all duration-1000"
                    style={{ width: `${(score / 900) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>300</span>
                  <span>900</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">{t('credit.status')}</p>
              <p className="font-semibold text-foreground">
                ✅ No existing loans • ✅ Good repayment history • ✅ Eligible for crop loan
              </p>
            </div>

            <button
              onClick={() => navigate('/land')}
              className="w-full mt-6 py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2"
            >
              {t('common.next')}: {t('land.title')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreditCheck;
