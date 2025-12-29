import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPreference } from '../types';

interface InitialGuideProps {
  onPreferenceSet: (preference: UserPreference) => void;
}

const InitialGuide: React.FC<InitialGuideProps> = ({ onPreferenceSet }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'device' | 'signer'>('device');
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null);

  const handleDeviceChoice = (choice: 'mobile' | 'desktop') => {
    setDeviceType(choice);
    setStep('signer');
  };

  const handleSignerChoice = (choice: 'no-signer' | 'with-signer') => {
    if (deviceType) {
      onPreferenceSet({
        deviceType,
        signerWillingness: choice
      });
    }
  };

  return (
    <div className="initial-guide-overlay">
      <div className="initial-guide">
        {step === 'device' && (
          <div className="guide-step">
            <h2>{t('guide.step1_title')}</h2>
            <p>{t('guide.step1_desc')}</p>
            
            <div className="choice-cards">
              <button 
                className="choice-card"
                onClick={() => handleDeviceChoice('mobile')}
              >
                <div className="choice-icon">📱</div>
                <div className="choice-title">{t('guide.device.mobile')}</div>
                <div className="choice-description">{t('guide.device.mobileDesc')}</div>
              </button>
              
              <button 
                className="choice-card"
                onClick={() => handleDeviceChoice('desktop')}
              >
                <div className="choice-icon">💻</div>
                <div className="choice-title">{t('guide.device.desktop')}</div>
                <div className="choice-description">{t('guide.device.desktopDesc')}</div>
              </button>
            </div>
          </div>
        )}

        {step === 'signer' && (
          <div className="guide-step">
            <h2>{t('guide.step2_title')}</h2>
            <p>{t('guide.step2_desc')}</p>
            
            <div className="choice-cards">
              <button 
                className="choice-card"
                onClick={() => handleSignerChoice('no-signer')}
              >
                <div className="choice-icon">📱</div>
                <div className="choice-title">{t('guide.signer.no')}</div>
                <div className="choice-description">{t('guide.signer.noDesc')}</div>
              </button>
              
              <button 
                className="choice-card"
                onClick={() => handleSignerChoice('with-signer')}
              >
                <div className="choice-icon">🔒</div>
                <div className="choice-title">{t('guide.signer.yes')}</div>
                <div className="choice-description">{t('guide.signer.yesDesc')}</div>
              </button>
            </div>
          </div>
        )}

        <div className="guide-progress">
          <div className={`progress-dot ${step === 'device' ? 'active' : 'completed'}`} />
          <div className={`progress-dot ${step === 'signer' ? 'active' : ''}`} />
        </div>
      </div>
    </div>
  );
};

export default InitialGuide;