import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Feature } from '../../types';
import MobileBottomSheet from './MobileBottomSheet';

interface FeatureGroup {
  title: string;
  features: Feature[];
}

interface MobileFeatureSheetProps {
  isOpen: boolean;
  onClose: () => void;
  featureGroups: FeatureGroup[];
}

const MobileFeatureSheet: React.FC<MobileFeatureSheetProps> = ({
  isOpen,
  onClose,
  featureGroups,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  // Filter out empty groups
  const validGroups = featureGroups.filter(g => g.features.length > 0);

  if (validGroups.length === 0) {
    return (
      <MobileBottomSheet isOpen={isOpen} onClose={onClose} title={t('features.title', '特性详情')}>
        <div className="mobile-empty-state">{t('features.empty', '暂无特性信息')}</div>
      </MobileBottomSheet>
    );
  }

  const getFeatureIcon = (type: Feature['type']) => {
    switch (type) {
      case 'positive':
        return '✅';
      case 'negative':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return '📌';
    }
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} title={t('features.title', '特性详情')}>
      {validGroups.length > 1 && (
        <div className="mobile-feature-tabs">
          {validGroups.map((group, index) => (
            <button
              key={index}
              className={`mobile-feature-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {group.title}
            </button>
          ))}
        </div>
      )}
      <div className="mobile-feature-list">
        {validGroups[activeTab]?.features.map((feature, index) => (
          <div key={index} className="mobile-feature-item">
            <span className="mobile-feature-icon">{getFeatureIcon(feature.type)}</span>
            <span className="mobile-feature-text">{feature.text}</span>
          </div>
        ))}
      </div>
    </MobileBottomSheet>
  );
};

export default MobileFeatureSheet;
