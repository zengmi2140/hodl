import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustodyData, ComponentState } from '../../types';
import OptimizedImage from '../shared/OptimizedImage';

interface SignerColumnProps {
  selectedSigners: string[];
  custodyData: CustodyData;
  getComponentState: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
}

// 判断是否为emoji的函数
const isEmoji = (str: string): boolean => {
  if (str.startsWith('/') || str.startsWith('http')) {
    return false;
  }
  const commonEmojis = ['🔒', '❄️', '📱', '💳', '📦', '🚫', '🐦', '⚡', '💙', '🥋', '🟢', '🌿', '₿', '🔌', '🔗', '🌐', '💎', '🌱'];
  return commonEmojis.includes(str) || str.length <= 4;
};

const SignerColumn: React.FC<SignerColumnProps> = ({
  selectedSigners,
  custodyData,
  getComponentState,
  onComponentClick,
}) => {
  const { t } = useTranslation();
  // 对硬件签名器列表进行排序，确保"不使用签名器"始终在最后
  const sortedHardwareSigners = [...custodyData.hardwareSigners].sort((a, b) => {
    if (a.id === 'none' && b.id !== 'none') return 1;
    if (b.id === 'none' && a.id !== 'none') return -1;
    return 0;
  });

  return (
    <div className="column">
      <div className="column-title">{t('columns.signer')}</div>
      {sortedHardwareSigners.map(signer => {
        const state = getComponentState(signer.id, 'signer');
        const isSelected = selectedSigners.includes(signer.id);
        const isBreathing = state === 'breathing';
        const isInactive = state === 'inactive';

        return (
          <div
            key={signer.id}
            className={`option-item ${isSelected ? 'selected' : ''} ${isBreathing ? 'breathing' : ''} ${isInactive ? '' : 'compatible'}`}
            onClick={() => onComponentClick(signer.id, 'signer')}
          >
            {isEmoji(signer.logo) || signer.id === 'none' ? (
              <span className="option-logo" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {signer.logo}
              </span>
            ) : (
              <OptimizedImage
                src={signer.logo}
                alt={signer.name}
                className="option-logo"
                loading="lazy"
              />
            )}
            <span className="option-name">{signer.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SignerColumn;