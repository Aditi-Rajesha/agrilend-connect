import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wheat, Phone, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { LanguageToggle } from '@/components/LanguageToggle';

export const Login = () => {
  const { t } = useLanguage();
  const { setIsLoggedIn, setFarmerProfile, farmerProfile } = useApp();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOtp = async () => {
    if (phone.length !== 10) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.some(digit => !digit)) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // ✅ After OTP: only save phone + mark logged in
    setFarmerProfile({
      ...farmerProfile,
      phone,
      nameEn: '',
      nameHi: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      dob: '',
    });

    setIsLoggedIn(true);
    setIsLoading(false);

    // ✅ Go to profile setup instead of dashboard
    navigate('/profile-setup');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex flex-col">
      <header className="p-4 flex justify-end">
        <LanguageToggle />
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
              <Wheat className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{t('login.title')}</h1>
            <p className="text-muted-foreground">{t('login.subtitle')}</p>
          </div>

          <div className="card-elevated p-6">
            {step === 'phone' ? (
              <div className="space-y-6 animate-slide-up">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('login.phone')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder={t('login.phonePlaceholder')}
                      className="input-field pl-12"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    +91 {phone || 'XXXXXXXXXX'}
                  </p>
                </div>

                <button
                  onClick={handleGetOtp}
                  disabled={phone.length !== 10 || isLoading}
                  className="w-full py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {t('login.getOtp')}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">{t('login.otpSent')}</p>
                  <p className="font-semibold text-foreground">+91 {phone}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3 text-center">
                    {t('login.enterOtp')}
                  </label>
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="otp-input"
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleVerify}
                  disabled={otp.some(digit => !digit) || isLoading}
                  className="w-full py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {t('login.verify')}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep('phone')}
                  className="w-full py-2 text-sm text-primary hover:underline"
                >
                  {t('login.resend')}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-primary" />
              DigiLocker
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-primary" />
              CRIF
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-primary" />
              Agristack
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
