import React, { useEffect, useState } from 'react';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`mobile-bottom-sheet-overlay ${isAnimating ? 'open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`mobile-bottom-sheet ${isAnimating ? 'open' : ''}`}>
        <div className="mobile-bottom-sheet-handle" />
        <div className="mobile-bottom-sheet-header">
          <h3 className="mobile-bottom-sheet-title">{title}</h3>
          <button className="mobile-bottom-sheet-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mobile-bottom-sheet-content">{children}</div>
      </div>
    </div>
  );
};

export default MobileBottomSheet;
