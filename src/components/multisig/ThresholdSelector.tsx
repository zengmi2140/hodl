import React from 'react';
import { ThresholdType } from './MultisigPage';
import './ThresholdSelector.css';

interface ThresholdSelectorProps {
  value: ThresholdType;
  onChange: (threshold: ThresholdType) => void;
}

const ThresholdSelector: React.FC<ThresholdSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="threshold-selector">
      <div className="threshold-label">选择多签阈值</div>
      <div className="threshold-options">
        <button
          className={`threshold-option ${value === '2-of-3' ? 'active' : ''}`}
          onClick={() => onChange('2-of-3')}
        >
          <span className="threshold-numbers">2-of-3</span>
          <span className="threshold-desc">3个签名器中需要2个签名</span>
        </button>
        <button
          className={`threshold-option ${value === '3-of-5' ? 'active' : ''}`}
          onClick={() => onChange('3-of-5')}
        >
          <span className="threshold-numbers">3-of-5</span>
          <span className="threshold-desc">5个签名器中需要3个签名</span>
        </button>
      </div>
    </div>
  );
};

export default ThresholdSelector;
