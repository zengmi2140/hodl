import React from 'react';
import { CustodyData } from '../../types';
import { SLOT_COLORS } from './MultisigPage';

interface TransferMethodDisplayProps {
  signerSlots: (string | null)[];
  selectedWallet: string | null;
  custodyData: CustodyData;
}

const TransferMethodDisplay: React.FC<TransferMethodDisplayProps> = ({
  signerSlots,
  selectedWallet,
  custodyData,
}) => {
  // 获取每个签名器到钱包的传输方式
  const getTransferMethods = (signerId: string, walletId: string): string[] => {
    if (!custodyData.transferMethods) return [];
    const signerMethods = custodyData.transferMethods[signerId];
    if (!signerMethods) return [];
    return signerMethods[walletId] || [];
  };

  // 收集所有签名器的传输方式
  const allMethods: { slotIndex: number; signerId: string; methods: string[] }[] = [];
  
  signerSlots.forEach((signerId, index) => {
    if (signerId && selectedWallet) {
      const methods = getTransferMethods(signerId, selectedWallet);
      if (methods.length > 0) {
        allMethods.push({ slotIndex: index, signerId, methods });
      }
    }
  });

  const hasAnySelection = signerSlots.some(s => s !== null) || selectedWallet;

  return (
    <div className="transfer-method-display">
      {hasAnySelection ? (
        <>
          <div className="transfer-arrow">
            <span>←</span>
            <span>→</span>
          </div>
          <div className="transfer-methods-list">
            {allMethods.map(({ slotIndex, signerId, methods }) => {
              const color = SLOT_COLORS[slotIndex];
              const signer = custodyData.hardwareSigners.find(s => s.id === signerId);
              return methods.map((method, idx) => (
                <span
                  key={`${slotIndex}-${idx}`}
                  className="transfer-method-tag"
                  style={{
                    backgroundColor: color.bg,
                    borderColor: color.border,
                    border: `1px solid ${color.border}`,
                  }}
                  title={signer?.name}
                >
                  {method}
                </span>
              ));
            })}
            {allMethods.length === 0 && (
              <span style={{ 
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.75rem',
                textAlign: 'center',
              }}>
                选择签名器和钱包<br />查看传输方式
              </span>
            )}
          </div>
        </>
      ) : (
        <div style={{ 
          color: 'hsl(var(--muted-foreground))',
          fontSize: '0.875rem',
          textAlign: 'center',
        }}>
          数据传输
        </div>
      )}
    </div>
  );
};

export default TransferMethodDisplay;
