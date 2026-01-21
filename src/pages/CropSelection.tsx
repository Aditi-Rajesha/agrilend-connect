import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wheat, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';

const NABARD_CROPS = [
  { id: 'wheat', name: 'Wheat', nameHi: 'गेहूं', season: 'rabi' as const, scaleOfFinance: 45000 },
  { id: 'rice', name: 'Rice (Paddy)', nameHi: 'धान', season: 'kharif' as const, scaleOfFinance: 55000 },
  { id: 'sugarcane', name: 'Sugarcane', nameHi: 'गन्ना', season: 'kharif' as const, scaleOfFinance: 80000 },
  { id: 'potato', name: 'Potato', nameHi: 'आलू', season: 'rabi' as const, scaleOfFinance: 65000 },
  { id: 'mustard', name: 'Mustard', nameHi: 'सरसों', season: 'rabi' as const, scaleOfFinance: 35000 },
  { id: 'maize', name: 'Maize', nameHi: 'मक्का', season: 'kharif' as const, scaleOfFinance: 40000 },
  { id: 'pulses', name: 'Pulses (Arhar)', nameHi: 'अरहर दाल', season: 'kharif' as const, scaleOfFinance: 38000 },
  { id: 'vegetables', name: 'Vegetables', nameHi: 'सब्जियां', season: 'rabi' as const, scaleOfFinance: 70000 },
];

export const CropSelection = () => {
  const { t, language } = useLanguage();
  const { verificationStatus, setVerificationStatus, farmerProfile, setFarmerProfile } = useApp();
  const navigate = useNavigate();
  
  const [selectedCrops, setSelectedCrops] = useState<string[]>(
    farmerProfile.selectedCrops?.map(c => c.id) || []
  );
  const [activeTab, setActiveTab] = useState<'kharif' | 'rabi'>('kharif');

  const toggleCrop = (cropId: string) => {
    setSelectedCrops(prev => 
      prev.includes(cropId) 
        ? prev.filter(id => id !== cropId)
        : [...prev, cropId]
    );
  };

  const handleContinue = () => {
    const crops = NABARD_CROPS.filter(c => selectedCrops.includes(c.id));
    setFarmerProfile({
      ...farmerProfile,
      selectedCrops: crops,
    });
    setVerificationStatus({ ...verificationStatus, crop: 'complete' });
    navigate('/calculate');
  };

  const filteredCrops = NABARD_CROPS.filter(c => c.season === activeTab);
  const isComplete = selectedCrops.length > 0;

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
          <h1 className="text-2xl font-bold text-foreground">{t('crop.title')}</h1>
          <p className="text-muted-foreground">{t('crop.subtitle')}</p>
        </div>
      </div>

      <div className="card-elevated p-6">
        {/* Season Tabs */}
        <div className="flex gap-2 p-1 bg-muted rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('kharif')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'kharif' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('crop.kharif')} (Jun-Oct)
          </button>
          <button
            onClick={() => setActiveTab('rabi')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'rabi' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('crop.rabi')} (Oct-Mar)
          </button>
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {filteredCrops.map((crop) => {
            const isSelected = selectedCrops.includes(crop.id);
            return (
              <button
                key={crop.id}
                onClick={() => toggleCrop(crop.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <Wheat className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="font-semibold text-foreground">
                  {language === 'hi' ? crop.nameHi : crop.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹{crop.scaleOfFinance.toLocaleString()}/ha
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Crops Summary */}
        {selectedCrops.length > 0 && (
          <div className="p-4 bg-secondary/10 rounded-xl mb-6">
            <p className="text-xs text-muted-foreground mb-2">{t('crop.selected')}</p>
            <div className="flex flex-wrap gap-2">
              {selectedCrops.map(id => {
                const crop = NABARD_CROPS.find(c => c.id === id);
                return (
                  <span key={id} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                    {language === 'hi' ? crop?.nameHi : crop?.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!isComplete}
          className="w-full py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('common.next')}: {t('loan.title')}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CropSelection;
