import React, { useState } from 'react';
import { CustodyData, Feature } from '../../types';
import { SLOT_COLORS } from '../../App';
import MobileBottomSheet from './MobileBottomSheet';
import MobileFeatureSheet from './MobileFeatureSheet';
import OptimizedImage from '../shared/OptimizedImage';

interface MobileMultisigSignerCardProps {
  signerSlots: (string | null)[];
  custodyData: CustodyData;
  compatibleSigners: string[];
  onSignerSelect: (slotIndex: number, signerId: string | null) => void;
}

const MobileMultisigSignerCard: React.FC<MobileMultisigSignerCardProps> = ({
  signerSlots,
  custodyData,
  compatibleSigners,
  onSignerSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [featureSheetOpen, setFeatureSheetOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

  const filledCount = signerSlots.filter(s => s !== null).length;

  // Get available signers (exclude 'none')
  const availableSigners = custodyData.hardwareSigners.filter(s => s.id !== 'none');

  const handleSlotClick = (index: number, signerId: string | null) => {
    if (!signerId) {
      setActiveSlotIndex(index);
    }
  };

  const handleSignerSelect = (signerId: string) => {
    if (activeSlotIndex !== null) {
      onSignerSelect(activeSlotIndex, signerId);
      setActiveSlotIndex(null);
    }
  };

  const handleDelete = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onSignerSelect(index, null);
  };

  const handleInfoClick = (e: React.MouseEvent, features: Feature[]) => {
    e.stopPropagation();
    setSelectedFeatures(features);
    setFeatureSheetOpen(true);
  };

  const isSignerCompatible = (signerId: string) => compatibleSigners.includes(signerId);

  return (
    <>
      <div className="mobile-card">
        <div className="mobile-card-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="mobile-card-title">
            <span className="mobile-card-title-icon">🔐</span>
            硬件签名器
            {filledCount > 0 && (
              <span className="mobile-card-selected-badge">
                已选 {filledCount}/{signerSlots.length}
              </span>
            )}
          </div>
          <span className={`mobile-card-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </div>
        <div className={`mobile-card-body ${isExpanded ? 'expanded' : ''}`}>
          <div className="mobile-signer-slots">
            {signerSlots.map((signerId, index) => {
              const signer = signerId
                ? custodyData.hardwareSigners.find(s => s.id === signerId)
                : null;
              const slotColor = SLOT_COLORS[index];

              return (
                <div
                  key={index}
                  className={`mobile-signer-slot ${signerId ? 'filled' : ''}`}
                  style={{
                    borderColor: signerId ? slotColor.border : undefined,
                    backgroundColor: signerId ? slotColor.bg : undefined,
                  }}
                  onClick={() => handleSlotClick(index, signerId)}
                >
                  <div
                    className="mobile-signer-slot-number"
                    style={{
                      backgroundColor: slotColor.border,
                      color: '#374151',
                    }}
                  >
                    {index + 1}
                  </div>
                  {signer ? (
                    <>
                      <img
                        src={signer.logo}
                        alt={signer.name}
                        className="mobile-signer-slot-logo"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="mobile-signer-slot-name">{signer.name}</span>
                      <button
                        className="mobile-signer-slot-delete"
                        onClick={(e) => handleDelete(e, index)}
                      >
                        ×
                      </button>
                      {signer.features.length > 0 && (
                        <span
                          className="mobile-signer-slot-info"
                          onClick={(e) => handleInfoClick(e, signer.features)}
                        >
                          i
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="mobile-signer-slot-empty">
                      <span className="mobile-signer-slot-add">+</span>
                      <span>选择签名器</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom sheet for signer selection */}
      <MobileBottomSheet
        isOpen={activeSlotIndex !== null}
        onClose={() => setActiveSlotIndex(null)}
        title={`选择签名器 #${activeSlotIndex !== null ? activeSlotIndex + 1 : ''}`}
      >
        <div className="mobile-card-content">
          {/* Sort signers: compatible first, incompatible last */}
          {[...availableSigners]
            .sort((a, b) => {
              const aCompatible = isSignerCompatible(a.id);
              const bCompatible = isSignerCompatible(b.id);
              if (aCompatible && !bCompatible) return -1;
              if (!aCompatible && bCompatible) return 1;
              return 0;
            })
            .map(signer => {
              const isCompatible = isSignerCompatible(signer.id);
              return (
                <div
                  key={signer.id}
                  className={`mobile-option-item ${!isCompatible ? 'inactive' : ''}`}
                  onClick={() => isCompatible && handleSignerSelect(signer.id)}
                >
                  <OptimizedImage src={signer.logo} alt={signer.name} className="mobile-option-logo" loading="lazy" />
                  <span className="mobile-option-name">{signer.name}</span>
                  {!isCompatible && (
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>不兼容</span>
                  )}
                </div>
              );
            })}
        </div>
      </MobileBottomSheet>

      <MobileFeatureSheet
        isOpen={featureSheetOpen}
        onClose={() => setFeatureSheetOpen(false)}
        featureGroups={[{ title: '签名器特性', features: selectedFeatures }]}
      />
    </>
  );
};

export default MobileMultisigSignerCard;
