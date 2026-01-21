import { Check, Clock, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatusBadgeProps {
  status: 'pending' | 'verifying' | 'verified' | 'complete' | 'calculated';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useLanguage();

  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
      case 'complete':
      case 'calculated':
        return {
          className: 'verification-complete',
          icon: <Check className="w-4 h-4" />,
          label: t('status.verified'),
        };
      case 'verifying':
        return {
          className: 'verification-pending bg-secondary/20 text-secondary-foreground',
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          label: t('status.inProgress'),
        };
      default:
        return {
          className: 'verification-pending',
          icon: <Clock className="w-4 h-4" />,
          label: t('status.pending'),
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={config.className}>
      {config.icon}
      {config.label}
    </span>
  );
};
