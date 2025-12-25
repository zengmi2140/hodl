import React from 'react';
import { ThresholdType } from './MultisigPage';
import './ThresholdSelector.css';

interface ThresholdSelectorProps {
  value: ThresholdType;
  onChange: (threshold: ThresholdType) => void;
}

const thresholdOptions: { value: ThresholdType; label: string; desc: string }[] = [
  { value: '2-of-3', label: '2-of-3', desc: '3个签名器中需要2个签名' },
  { value: '3-of-5', label: '3-of-5', desc: '5个签名器中需要3个签名' },
];

const ThresholdSelector: React.FC<ThresholdSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="threshold-selector">
      <span className="threshold-label">多签阈值</span>
      <div className="threshold-segmented">
        {thresholdOptions.map((option) => (
          <button
            key={option.value}
            className={`threshold-segment ${value === option.value ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
            title={option.desc}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThresholdSelector;
