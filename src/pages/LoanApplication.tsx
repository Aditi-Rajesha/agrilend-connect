import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2, 
  User, 
  CreditCard as CreditCardIcon,
  MapPin,
  Wheat,
  IndianRupee,
  Download,
  PartyPopper
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';

export const LoanApplication = () => {
  const { t, language } = useLanguage();
  const { 
    farmerProfile, 
    verificationStatus,
    applicationSubmitted,
    setApplicationSubmitted,
    applicationReference,
    setApplicationReference
  } = useApp();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allVerified = 
    verificationStatus.aadhar === 'verified' &&
    verificationStatus.credit === 'verified' &&
    verificationStatus.land === 'verified' &&
    verificationStatus.crop === 'complete' &&
    verificationStatus.loan === 'calculated';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const refNumber = `AGRILOAN${Date.now().toString().slice(-8)}`;
    setApplicationReference(refNumber);
    setApplicationSubmitted(true);
    setIsSubmitting(false);
  };

  const sections = [
    {
      title: language === 'hi' ? 'व्यक्तिगत विवरण' : 'Personal Details',
      icon: User,
      verified: verificationStatus.aadhar === 'verified',
      items: [
        { label: t('aadhar.name'), value: farmerProfile.name },
        { label: t('aadhar.number'), value: farmerProfile.aadharNumber || '-' },
        { label: 'Phone', value: `+91 ${farmerProfile.phone}` },
      ],
    },
    {
      title: language === 'hi' ? 'क्रेडिट जानकारी' : 'Credit Information',
      icon: CreditCardIcon,
      verified: verificationStatus.credit === 'verified',
      items: [
        { label: t('credit.score'), value: farmerProfile.creditScore?.toString() || '-' },
        { label: t('credit.status'), value: farmerProfile.creditScore && farmerProfile.creditScore >= 650 ? '✅ Eligible' : '-' },
      ],
    },
    {
      title: language === 'hi' ? 'भूमि विवरण' : 'Land Details',
      icon: MapPin,
      verified: verificationStatus.land === 'verified',
      items: [
        { label: t('land.khasra'), value: farmerProfile.landDetails?.khasraNumber || '-' },
        { label: t('land.area'), value: `${farmerProfile.landDetails?.area || 0} ${t('common.hectares')}` },
        { label: t('land.district'), value: farmerProfile.landDetails?.district || '-' },
      ],
    },
    {
      title: language === 'hi' ? 'फसल और ऋण' : 'Crop & Loan',
      icon: Wheat,
      verified: verificationStatus.loan === 'calculated',
      items: [
        { 
          label: t('crop.selected'), 
          value: farmerProfile.selectedCrops?.map(c => language === 'hi' ? c.nameHi : c.name).join(', ') || '-' 
        },
        { 
          label: t('loan.eligible'), 
          value: farmerProfile.eligibleAmount ? `₹${farmerProfile.eligibleAmount.toLocaleString()}` : '-' 
        },
      ],
    },
  ];

  if (applicationSubmitted) {
    return (
      <DashboardLayout>
        <div className="card-elevated p-8 text-center animate-slide-up">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <PartyPopper className="w-12 h-12 text-success" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t('apply.success')} 🎉
          </h1>
          <p className="text-muted-foreground mb-6">
            Your loan application has been submitted successfully.
          </p>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
            <p className="text-xs text-muted-foreground mb-1">{t('apply.reference')}</p>
            <p className="font-mono text-xl font-bold text-primary">{applicationReference}</p>
          </div>

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Application Received</p>
                <p className="text-xs text-muted-foreground">Your application is under review</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg opacity-60">
              <div className="w-5 h-5 rounded-full border-2 border-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Bank Verification</p>
                <p className="text-xs text-muted-foreground">Usually takes 2-3 working days</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg opacity-60">
              <div className="w-5 h-5 rounded-full border-2 border-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Loan Disbursement</p>
                <p className="text-xs text-muted-foreground">Amount credited to your account</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition-colors"
            >
              Back to Dashboard
            </button>
            <button className="flex-1 py-3 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
          <h1 className="text-2xl font-bold text-foreground">{t('apply.title')}</h1>
          <p className="text-muted-foreground">{t('apply.subtitle')}</p>
        </div>
      </div>

      <div className="card-elevated p-6">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          {t('apply.review')}
        </h2>

        {/* Review Sections */}
        <div className="space-y-4 mb-6">
          {sections.map((section) => (
            <div key={section.title} className="p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <section.icon className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">{section.title}</span>
                {section.verified ? (
                  <CheckCircle2 className="w-4 h-4 text-success ml-auto" />
                ) : (
                  <span className="text-xs text-destructive ml-auto">Not Verified</span>
                )}
              </div>
              <div className="grid gap-2">
                {section.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Loan Summary */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{t('loan.eligible')}</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-1">
                <IndianRupee className="w-6 h-6" />
                {farmerProfile.eligibleAmount?.toLocaleString() || 0}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">@ 7% p.a.</p>
              <p className="text-sm font-medium">5 Year Overdraft</p>
            </div>
          </div>
        </div>

        {!allVerified && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl mb-6">
            <p className="text-sm text-destructive font-medium">
              ⚠️ Please complete all verifications before submitting
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!allVerified || isSubmitting}
          className="w-full py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting Application...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              {t('apply.submit')}
            </>
          )}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default LoanApplication;
