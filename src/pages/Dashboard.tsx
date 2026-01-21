import { useNavigate } from 'react-router-dom';
import { 
  Fingerprint, 
  CreditCard, 
  MapPin, 
  Wheat, 
  Calculator, 
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';

export const Dashboard = () => {
  const { t } = useLanguage();
  const { verificationStatus, farmerProfile } = useApp();
  const navigate = useNavigate();

  const modules = [
    {
      id: 'aadhar',
      title: t('aadhar.title'),
      subtitle: 'DigiLocker',
      icon: Fingerprint,
      url: '/aadhar',
      status: verificationStatus.aadhar,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      id: 'credit',
      title: t('credit.title'),
      subtitle: 'CRIF',
      icon: CreditCard,
      url: '/credit',
      status: verificationStatus.credit,
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      id: 'land',
      title: t('land.title'),
      subtitle: 'Agristack UP',
      icon: MapPin,
      url: '/land',
      status: verificationStatus.land,
      color: 'bg-green-500/10 text-green-600',
    },
    {
      id: 'crop',
      title: t('crop.title'),
      subtitle: 'NABARD',
      icon: Wheat,
      url: '/crop',
      status: verificationStatus.crop,
      color: 'bg-amber-500/10 text-amber-600',
    },
    {
      id: 'calculate',
      title: t('loan.title'),
      subtitle: t('loan.type'),
      icon: Calculator,
      url: '/calculate',
      status: verificationStatus.loan,
      color: 'bg-teal-500/10 text-teal-600',
    },
    {
      id: 'apply',
      title: t('apply.title'),
      subtitle: t('loan.max'),
      icon: FileText,
      url: '/apply',
      status: null,
      color: 'bg-primary/10 text-primary',
    },
  ];

  const completedCount = Object.values(verificationStatus).filter(
    s => s === 'verified' || s === 'complete' || s === 'calculated'
  ).length;

  const isComplete = (status: string | null) => 
    status === 'verified' || status === 'complete' || status === 'calculated';

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {t('dashboard.welcome')}, {farmerProfile.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          {t('dashboard.verification')}: {completedCount}/5 {t('status.complete')}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="card-elevated p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">{t('dashboard.loanEligibility')}</span>
          <span className="text-sm text-muted-foreground">{Math.round((completedCount / 5) * 100)}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
            style={{ width: `${(completedCount / 5) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {t('loan.max')} • {t('loan.tenure')}
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module, index) => (
          <div
            key={module.id}
            onClick={() => navigate(module.url)}
            className="module-card animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className={`module-icon ${module.color}`}>
                <module.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{module.title}</h3>
                  {isComplete(module.status) ? (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  ) : module.status === 'verifying' ? (
                    <Clock className="w-5 h-5 text-secondary shrink-0 animate-pulse" />
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">{module.subtitle}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
