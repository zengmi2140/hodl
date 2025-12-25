import React from 'react';
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
  return (
    <div className="signature-mode-selector">
      {/* 签名模式选择 */}
      <div className="mode-selector-group">
        <span className="mode-label">选择您的签名模式</span>
        <div className="mode-segmented">
          <button
            className={`mode-segment ${mode === 'single' ? 'active' : ''}`}
            onClick={() => onModeChange('single')}
          >
            单签
          </button>
          <button
            className={`mode-segment ${mode === 'multi' ? 'active' : ''}`}
            onClick={() => onModeChange('multi')}
          >
            多签
          </button>
        </div>
      </div>

      {/* 多签阈值选择（仅在多签模式下显示） */}
      {mode === 'multi' && (
        <>
          <div className="mode-divider" />
          <div className="threshold-group">
            <span className="threshold-label">多签阈值</span>
            <div className="threshold-segmented">
              <button
                className={`threshold-segment ${threshold === '2-of-3' ? 'active' : ''}`}
                onClick={() => onThresholdChange('2-of-3')}
                title="3个签名器中需要2个签名"
              >
                2-of-3
              </button>
              <button
                className={`threshold-segment ${threshold === '3-of-5' ? 'active' : ''}`}
                onClick={() => onThresholdChange('3-of-5')}
                title="5个签名器中需要3个签名"
              >
                3-of-5
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignatureModeSelector;
