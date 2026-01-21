import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'lang-active' : 'lang-inactive'}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={language === 'hi' ? 'lang-active' : 'lang-inactive'}
      >
        हिं
      </button>
    </div>
  );
};
