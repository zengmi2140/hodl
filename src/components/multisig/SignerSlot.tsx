import React, { useState, useRef, useEffect } from 'react';
import { CustodyData, Feature } from '../../types';
import { SLOT_COLORS } from './MultisigPage';
import FeatureTooltip from './FeatureTooltip';

interface SignerSlotProps {
  slotIndex: number;
  selectedSignerId: string | null;
  custodyData: CustodyData;
  compatibleSigners: string[];
  selectedSignerIds: string[];
  onSelect: (signerId: string | null) => void;
}

const SignerSlot: React.FC<SignerSlotProps> = ({
  slotIndex,
  selectedSignerId,
  custodyData,
  compatibleSigners,
  selectedSignerIds,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const slotColor = SLOT_COLORS[slotIndex];

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const selectedSigner = selectedSignerId
    ? custodyData.hardwareSigners.find(s => s.id === selectedSignerId)
    : null;

  // 获取可选的签名器列表（排除已选择的和不兼容的）
  const availableSigners = custodyData.hardwareSigners.filter(signer => {
    if (signer.id === 'none') return false; // 多签模式不显示"不使用签名器"
    if (signer.id === selectedSignerId) return true; // 当前选中的保持可见
    // 允许同一型号重复选择，所以不排除已选择的
    return true;
  });

  const handleSlotClick = () => {
    if (!selectedSignerId) {
      setIsDropdownOpen(true);
    }
  };

  const handleSignerSelect = (signerId: string) => {
    onSelect(signerId);
    setIsDropdownOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(null);
  };

  const isSignerCompatible = (signerId: string): boolean => {
    return compatibleSigners.includes(signerId);
  };

  return (
    <div 
      ref={dropdownRef}
      className={`signer-slot ${selectedSignerId ? 'filled' : 'empty'}`}
      style={{
        borderColor: selectedSignerId ? slotColor.border : undefined,
        backgroundColor: selectedSignerId ? slotColor.bg : undefined,
      }}
      onClick={handleSlotClick}
    >
      {selectedSignerId && selectedSigner ? (
        <>
          <img
            src={selectedSigner.logo}
            alt={selectedSigner.name}
            className="signer-slot-logo"
          />
          <span className="signer-slot-name">{selectedSigner.name}</span>
          <button
            className="signer-slot-delete"
            onClick={handleDelete}
            title="删除"
          >
            ×
          </button>
          <div
            className="signer-slot-info"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            i
          </div>
          {showTooltip && (
            <FeatureTooltip features={selectedSigner.features} />
          )}
        </>
      ) : (
        <div className="signer-slot-add-icon">+</div>
      )}

      {isDropdownOpen && (
        <div className="signer-dropdown">
          {availableSigners.map(signer => {
            const isCompatible = isSignerCompatible(signer.id);
            return (
              <div
                key={signer.id}
                className={`signer-dropdown-item ${!isCompatible ? 'disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isCompatible) {
                    handleSignerSelect(signer.id);
                  }
                }}
              >
                <img
                  src={signer.logo}
                  alt={signer.name}
                  className="signer-dropdown-item-logo"
                />
                <span className="signer-dropdown-item-name">{signer.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SignerSlot;
