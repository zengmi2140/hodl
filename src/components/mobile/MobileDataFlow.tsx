import React from 'react';

interface MobileDataFlowProps {
  isActive: boolean;
  label?: string;
  coloredLabels?: Array<{ color: string; label: string }>;
}

const MobileDataFlow: React.FC<MobileDataFlowProps> = ({
  isActive,
  label,
  coloredLabels,
}) => {
  return (
    <div className="mobile-data-flow-vertical">
      <div className={`mobile-data-flow-arrow ${isActive ? 'active' : ''}`}>↓</div>
      {label && (
        <div className="mobile-data-flow-label">{label}</div>
      )}
      {coloredLabels && coloredLabels.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
          {coloredLabels.map((item, index) => (
            <span
              key={index}
              className="mobile-data-flow-label"
              style={{ borderLeft: `3px solid ${item.color}` }}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
      <div className={`mobile-data-flow-arrow ${isActive ? 'active' : ''}`}>↓</div>
    </div>
  );
};

export default MobileDataFlow;
