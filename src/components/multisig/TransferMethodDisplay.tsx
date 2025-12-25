import React from 'react';
import { CustodyData } from '../../types';
import { SLOT_COLORS } from '../../App';

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
  const allMethods: { slotIndex: number; signerId: string; signerName: string; methods: string[] }[] = [];
  
  signerSlots.forEach((signerId, index) => {
    if (signerId && selectedWallet) {
      const methods = getTransferMethods(signerId, selectedWallet);
      const signer = custodyData.hardwareSigners.find(s => s.id === signerId);
      if (methods.length > 0 && signer) {
        allMethods.push({ 
          slotIndex: index, 
          signerId, 
          signerName: signer.name,
          methods 
        });
      }
    }
  });

  const hasSigners = signerSlots.some(s => s !== null);
  const hasWallet = selectedWallet !== null;

  return (
    <div className="transfer-method-display">
      {/* 数据流箭头 - 文字在上方 */}
      <div className="transfer-arrows">
        <div className="transfer-arrow-block">
          <span className="arrow-label-top">签名和公钥</span>
          <div className="arrow-row">
            <div className="arrow-line-static"></div>
            <span className="arrow-head">▶</span>
          </div>
        </div>
        <div className="transfer-arrow-block reverse">
          <span className="arrow-label-top">待签名交易</span>
          <div className="arrow-row">
            <span className="arrow-head">◀</span>
            <div className="arrow-line-static"></div>
          </div>
        </div>
      </div>

      {/* 传输方式标签 */}
      <div className="transfer-methods-container">
        {allMethods.length > 0 ? (
          <div className="transfer-methods-list">
            {allMethods.map(({ slotIndex, signerName, methods }) => {
              const color = SLOT_COLORS[slotIndex];
              return (
                <div key={slotIndex} className="transfer-method-group">
                  <div 
                    className="transfer-method-signer"
                    style={{ color: color.border }}
                  >
                    #{slotIndex + 1}
                  </div>
                  <div className="transfer-method-tags">
                    {methods.map((method, idx) => (
                      <span
                        key={idx}
                        className="transfer-method-tag"
                        style={{
                          backgroundColor: color.bg,
                          border: `1px solid ${color.border}`,
                        }}
                        title={`${signerName}: ${method}`}
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="transfer-method-hint">
            {!hasSigners && !hasWallet && '选择签名器和钱包'}
            {hasSigners && !hasWallet && '请选择钱包'}
            {!hasSigners && hasWallet && '请选择签名器'}
            {hasSigners && hasWallet && '无传输方式'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferMethodDisplay;
