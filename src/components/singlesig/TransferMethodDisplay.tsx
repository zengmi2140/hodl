import React from 'react';
import { CustodyData } from '../../types';
import './SinglesigStyles.css';

interface TransferMethodDisplayProps {
  selectedSigners: string[];
  selectedWallet: string | null;
  custodyData: CustodyData;
}

const TransferMethodDisplay: React.FC<TransferMethodDisplayProps> = ({
  selectedSigners,
  selectedWallet,
  custodyData,
}) => {
  // 判断是否选择了"不使用签名器"
  const isNoSignerSelected = selectedSigners.includes('none');
  
  // 获取传输方式
  const getTransferMethods = (): string[] => {
    if (!selectedSigners.length || !selectedWallet || isNoSignerSelected) {
      return [];
    }
    
    const transferMethods: string[] = [];
    selectedSigners.forEach(signerId => {
      const methods = custodyData.transferMethods?.[signerId]?.[selectedWallet] || [];
      methods.forEach(method => {
        if (!transferMethods.includes(method)) {
          transferMethods.push(method);
        }
      });
    });
    
    return transferMethods;
  };

  const transferMethods = getTransferMethods();
  const hasSigners = selectedSigners.length > 0 && !isNoSignerSelected;
  const hasWallet = selectedWallet !== null;
  const disabledClass = isNoSignerSelected ? 'disabled' : '';

  // 获取传输方式对应的CSS类名
  const getTransferMethodClass = (method: string): string => {
    const methodClassMap: { [key: string]: string } = {
      'SD卡': 'sd-card',
      'microSD 卡': 'sd-card',
      '二维码': 'qr-code', 
      'USB': 'usb',
      '蓝牙': 'bluetooth',
      'NFC': 'nfc'
    };
    return methodClassMap[method] || 'usb';
  };

  return (
    <div className={`singlesig-transfer-display ${disabledClass}`}>
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

      {/* 传输方式标签 - 在整个箭头区域底部 */}
      {transferMethods.length > 0 && (
        <div className="singlesig-transfer-tags">
          {transferMethods.map((method, index) => (
            <span key={index} className={`transfer-tag ${getTransferMethodClass(method)}`}>
              {method}
            </span>
          ))}
        </div>
      )}

      {/* 提示信息 */}
      {!hasSigners && !hasWallet && !isNoSignerSelected && (
        <div className="transfer-method-hint">选择签名器和钱包</div>
      )}
      {!hasSigners && hasWallet && !isNoSignerSelected && (
        <div className="transfer-method-hint">请选择签名器</div>
      )}
      {hasSigners && !hasWallet && (
        <div className="transfer-method-hint">请选择钱包</div>
      )}
      {isNoSignerSelected && (
        <div className="transfer-method-hint">未使用硬件签名器</div>
      )}
    </div>
  );
};

export default TransferMethodDisplay;
