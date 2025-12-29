import React from 'react';
import { useTranslation } from 'react-i18next';
import './SignatureModeSelector.css';

export type SignatureMode = 'single' | 'multi';
export type ThresholdType = '2-of-3' | '3-of-5';

interface SignatureModeSelectorProps {
  mode: SignatureMode;
  threshold: ThresholdType;
  onModeChange: (mode: SignatureMode) => void;
  onThresholdChange: (threshold: ThresholdType) => void;
}

const SignatureModeSelector: React.FC<SignatureModeSelectorProps> = ({
  mode,
  threshold,
  onModeChange,
  onThresholdChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="signature-mode-selector">
      {/* 签名模式选择 */}
      <div className="mode-selector-group">
        <span className="mode-label">{t('mode.selectMode')}</span>
        <div className="mode-segmented">
          <button
            className={`mode-segment ${mode === 'single' ? 'active' : ''}`}
            onClick={() => onModeChange('single')}
          >
            {t('mode.single_short')}
          </button>
          <button
            className={`mode-segment ${mode === 'multi' ? 'active' : ''}`}
            onClick={() => onModeChange('multi')}
          >
            {t('mode.multi_short')}
          </button>
        </div>
      </div>

      {/* 多签阈值选择 - 始终渲染，单签模式下隐藏以保持布局一致 */}
      <div className={`threshold-section ${mode === 'single' ? 'hidden' : ''}`}>
        <div className="mode-divider" />
        <div className="threshold-group">
          <span className="threshold-label">{t('mode.threshold_label')}</span>
          <div className="threshold-segmented">
            <button
              className={`threshold-segment ${threshold === '2-of-3' ? 'active' : ''}`}
              onClick={() => onThresholdChange('2-of-3')}
              title={t('mode.threshold_hint_2of3')}
            >
              2-of-3
            </button>
            <button
              className={`threshold-segment ${threshold === '3-of-5' ? 'active' : ''}`}
              onClick={() => onThresholdChange('3-of-5')}
              title={t('mode.threshold_hint_3of5')}
            >
              3-of-5
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureModeSelector;
