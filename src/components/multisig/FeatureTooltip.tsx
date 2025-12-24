import React from 'react';
import { Feature } from '../../types';

interface FeatureTooltipProps {
  features: Feature[];
}

const FeatureTooltip: React.FC<FeatureTooltipProps> = ({ features }) => {
  const getIcon = (type: Feature['type']) => {
    switch (type) {
      case 'positive':
        return '✓';
      case 'negative':
        return '✗';
      case 'warning':
        return '⚠';
      default:
        return '•';
    }
  };

  return (
    <div className="feature-tooltip">
      {features.map((feature, index) => (
        <div key={index} className="feature-tooltip-item">
          <span className={`feature-tooltip-icon ${feature.type}`}>
            {getIcon(feature.type)}
          </span>
          <span className="feature-tooltip-text">{feature.text}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureTooltip;
