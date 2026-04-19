import React from 'react';

type FeatureType = 'positive' | 'negative' | 'warning';

interface FeatureIconProps {
  type: FeatureType;
  size?: number;
}

/**
 * 极简线条特性图标 — 1px 描边方框 + 中央符号
 * 设计风格统一于 "Cypherpunk Atelier"（极简、墨线、信号色）
 *
 * 状态：
 *  - positive: 绿色对勾  ✓
 *  - negative: 红色斜叉  ✕
 *  - warning : 琥珀感叹  !
 */
const FeatureIcon: React.FC<FeatureIconProps> = ({ type, size = 16 }) => {
  const config = {
    positive: {
      color: 'hsl(145 55% 38%)',
      bg: 'hsl(145 50% 96%)',
      symbol: (
        <polyline
          points="4.5,8.5 7,11 11.5,5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      ),
      label: 'supported',
    },
    negative: {
      color: 'hsl(0 60% 45%)',
      bg: 'hsl(0 55% 97%)',
      symbol: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        >
          <line x1="5" y1="5" x2="11" y2="11" />
          <line x1="11" y1="5" x2="5" y2="11" />
        </g>
      ),
      label: 'not supported',
    },
    warning: {
      color: 'hsl(35 85% 42%)',
      bg: 'hsl(38 90% 95%)',
      symbol: (
        <g fill="currentColor">
          <rect x="7.25" y="4" width="1.5" height="5" />
          <rect x="7.25" y="10.25" width="1.5" height="1.5" />
        </g>
      ),
      label: 'caveat',
    },
  }[type];

  return (
    <span
      className={`feature-icon-svg feature-icon-${type}`}
      role="img"
      aria-label={config.label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.color}`,
        borderRadius: 0,
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {config.symbol}
      </svg>
    </span>
  );
};

export default FeatureIcon;
