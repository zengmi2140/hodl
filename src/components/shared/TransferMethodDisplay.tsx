import React from 'react';
import { CustodyData } from '../../types';

interface TransferMethodDisplayProps {
  // 单签模式
  selectedSigners?: string[];
  selectedWallet?: string | null;
  // 多签模式
  signerSlots?: (string | null)[];
  // 共用
  custodyData: CustodyData;
}

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

// 多签槽位颜色
const SLOT_COLORS = [
  { bg: '#86efac', text: '#166534' }, // 绿色
  { bg: '#93c5fd', text: '#1e40af' }, // 蓝色
  { bg: '#c4b5fd', text: '#5b21b6' }, // 紫色
  { bg: '#f9a8d4', text: '#9d174d' }, // 粉色
  { bg: '#fde047', text: '#854d0e' }, // 黄色
];

const TransferMethodDisplay: React.FC<TransferMethodDisplayProps> = ({
  selectedSigners,
  selectedWallet,
  signerSlots,
  custodyData,
}) => {
  // 判断是单签还是多签模式
  const isMultisigMode = signerSlots !== undefined;
  
  // 单签模式：判断是否选择了"不使用签名器"
  const isNoSignerSelected = selectedSigners?.includes('none') ?? false;
  
  // 获取传输方式
  const getTransferMethods = (): { method: string; slotIndex?: number }[] => {
    if (isMultisigMode) {
      // 多签模式
      if (!signerSlots || !selectedWallet) return [];
      
      const methods: { method: string; slotIndex: number }[] = [];
      signerSlots.forEach((signerId, slotIndex) => {
        if (signerId) {
          const signerMethods = custodyData.transferMethods?.[signerId]?.[selectedWallet] || [];
          signerMethods.forEach(method => {
            methods.push({ method, slotIndex });
          });
        }
      });
      return methods;
    } else {
      // 单签模式
      if (!selectedSigners?.length || !selectedWallet || isNoSignerSelected) {
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
      
      return transferMethods.map(method => ({ method }));
    }
  };

  const transferMethods = getTransferMethods();
  
  // 状态判断
  const hasSigners = isMultisigMode 
    ? signerSlots?.some(s => s !== null) 
    : (selectedSigners?.length ?? 0) > 0 && !isNoSignerSelected;
  const hasWallet = selectedWallet !== null;
  const disabledClass = isNoSignerSelected ? 'disabled' : '';

  return (
    <div className={`transfer-method-display ${disabledClass}`}>
      {/* 数据流箭头 */}
      <div className="transfer-arrows">
        <div className="transfer-arrow-block">
          <span className="arrow-label-top">公钥和签名</span>
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
      {transferMethods.length > 0 && (
        <div className="transfer-tags">
          {transferMethods.map((item, index) => (
            <span 
              key={index} 
              className={`transfer-tag ${getTransferMethodClass(item.method)}`}
              style={isMultisigMode && item.slotIndex !== undefined ? {
                backgroundColor: SLOT_COLORS[item.slotIndex]?.bg,
                color: SLOT_COLORS[item.slotIndex]?.text,
              } : undefined}
            >
              {item.method}
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
