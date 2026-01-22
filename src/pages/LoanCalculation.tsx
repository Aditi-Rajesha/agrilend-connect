import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, ArrowLeft, IndianRupee, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';

export const LoanCalculation = () => {
  const { t, language } = useLanguage();
  const { verificationStatus, setVerificationStatus, farmerProfile, setFarmerProfile } = useApp();
  const navigate = useNavigate();
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculated, setCalculated] = useState(verificationStatus.loan === 'calculated');

  const landArea = farmerProfile.landDetails?.area || 0;
  const crops = farmerProfile.selectedCrops || [];
  
  // Calculate based on NABARD Scale of Finance
  const calculateLoan = () => {
    let totalFinance = 0;
    crops.forEach(crop => {
      totalFinance += crop.scaleOfFinance * landArea;
    });
    // Cap at ₹2 lakhs as per NABARD guidelines
    return Math.min(totalFinance, 200000);
  };

  const eligibleAmount = calculateLoan();

  const handleCalculate = async () => {
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFarmerProfile({
      ...farmerProfile,
      eligibleAmount,
    });
    setVerificationStatus({ ...verificationStatus, loan: 'calculated' });
    setCalculated(true);
    setIsCalculating(false);
  };

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
            <h1 className="text-2xl font-bold text-foreground">{t('loan.title')}</h1>
            <p className="text-muted-foreground">{t('loan.subtitle')}</p>
          </div>
        </div>

        <div className="pt-2">
          <StatusBadge status={verificationStatus.loan} />
        </div>
      </div>

      <div className="card-elevated p-6">
        {/* Input Summary */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">{t('land.area')}</span>
            <span className="font-semibold">{landArea} {t('common.hectares')}</span>
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground block mb-2">{t('crop.selected')}</span>
            <div className="flex flex-wrap gap-2">
              {crops.map(crop => (
                <span key={crop.id} className="px-2 py-1 bg-secondary/50 rounded text-xs font-medium">
                  {language === 'hi' ? crop.nameHi : crop.name} (₹{crop.scaleOfFinance.toLocaleString()}/ha)
                </span>
              ))}
            </div>
          </div>
        </div>

        {!calculated ? (
          <button
            onClick={handleCalculate}
            disabled={isCalculating || crops.length === 0}
            className="w-full py-4 rounded-xl btn-golden-gradient font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isCalculating ? (
              <>
                <Calculator className="w-5 h-5 animate-pulse" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5" />
                {t('loan.calculate')}
              </>
            )}
          </button>
        ) : (
          <div className="animate-slide-up">
            {/* Eligible Amount Display */}
            <div className="text-center py-8 mb-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 rounded-2xl border-2 border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">{t('loan.eligible')}</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                <IndianRupee className="w-8 h-8 text-primary" />
                <span className="text-5xl font-bold text-primary">
                  {eligibleAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  5 Years
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Overdraft Facility
                </span>
              </div>
            </div>

            {/* Loan Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Loan Type</span>
                <span className="font-semibold text-sm">{t('loan.type')}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Interest Rate</span>
                <span className="font-semibold text-sm">7% p.a. (Subsidized)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Processing Fee</span>
                <span className="font-semibold text-sm text-success">₹0 (Waived)</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/apply')}
              className="w-full py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2"
            >
              {t('common.next')}: {t('apply.title')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LoanCalculation;
