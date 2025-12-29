import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CustodyData, ComponentState, Feature } from '../../types';
import MobileFeatureSheet from './MobileFeatureSheet';
import OptimizedImage from '../shared/OptimizedImage';

interface MobileSignerCardProps {
  selectedSigners: string[];
  custodyData: CustodyData;
  getComponentState: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
}

const MobileSignerCard: React.FC<MobileSignerCardProps> = ({
  selectedSigners,
  custodyData,
  getComponentState,
  onComponentClick,
}) => {
  const { t } = useTranslation();
  const cardEndRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [featureSheetOpen, setFeatureSheetOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

  // Sort signers: put "none" at the end
  const sortedSigners = [...custodyData.hardwareSigners].sort((a, b) => {
    if (a.id === 'none') return 1;
    if (b.id === 'none') return -1;
    return 0;
  });

  const handleInfoClick = (e: React.MouseEvent, features: Feature[]) => {
    e.stopPropagation();
    setSelectedFeatures(features);
    setFeatureSheetOpen(true);
  };

  const selectedSigner = selectedSigners.length > 0
    ? custodyData.hardwareSigners.find(s => s.id === selectedSigners[0])
    : null;

  return (
    <>
      <div className="mobile-card">
        <div className="mobile-card-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="mobile-card-title">
            <span className="mobile-card-title-icon">🔐</span>
            {t('columns.signer')}
            {selectedSigner && (
              <span className="mobile-card-selected-badge">{selectedSigner.name}</span>
            )}
          </div>
          <span className={`mobile-card-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </div>
        <div className={`mobile-card-body ${isExpanded ? 'expanded' : ''}`}>
          <div className="mobile-card-content">
            {sortedSigners.map(signer => {
              const state = getComponentState(signer.id, 'signer');
              const isSelected = selectedSigners.includes(signer.id);
              // 使用更兼容的方式判断是否为 Emoji，替换了可能导致崩溃的正则
              const isEmoji = signer.id === 'none' || (signer.logo.length <= 10 && !signer.logo.includes('/') && !signer.logo.includes('.'));

              return (
                <div
                  key={signer.id}
                  className={`mobile-option-item ${state} ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    const wasSelected = selectedSigners.includes(signer.id);
                    onComponentClick(signer.id, 'signer');
                    // Only scroll if selecting (not deselecting)
                    if (!wasSelected) {
                      setTimeout(() => {
                        cardEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                >
                  {isEmoji ? (
                    <span style={{ fontSize: '2rem', width: 40, textAlign: 'center' }}>
                      {signer.logo}
                    </span>
                  ) : (
                    <OptimizedImage src={signer.logo} alt={signer.name} className="mobile-option-logo" loading="lazy" />
                  )}
                  <span className="mobile-option-name">{signer.name}</span>
                  {isSelected && <span className="mobile-option-check">✓</span>}
                  {signer.features.length > 0 && (
                    <span
                      className="mobile-option-info"
                      onClick={(e) => handleInfoClick(e, signer.features)}
                    >
                      i
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={cardEndRef} style={{ scrollMarginTop: '110px' }} />
          </div>
        </div>
      </div>

      <MobileFeatureSheet
        isOpen={featureSheetOpen}
        onClose={() => setFeatureSheetOpen(false)}
        featureGroups={[{ title: t('features.signer'), features: selectedFeatures }]}
      />
    </>
  );
};

export default MobileSignerCard;
