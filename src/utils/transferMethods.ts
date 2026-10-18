// 统一传输方式标识规范化与样式映射

export type TransferMethodCode = 'qr' | 'usb' | 'sd_card' | 'nfc' | 'bluetooth' | 'none';

/**
 * 将任意语言或历史字符串标准化为统一枚举标识
 */
export const normalizeTransferMethodKey = (method: string): TransferMethodCode => {
  if (!method) return 'usb';
  const lower = method.trim().toLowerCase();
  
  if (['qr', 'qr-code', 'qrcode', 'qr code', '二维码', '二維碼'].includes(lower)) {
    return 'qr';
  }
  if (['usb'].includes(lower)) {
    return 'usb';
  }
  if (['sd', 'sd card', 'sd-card', 'sd卡', 'sd 卡', 'microsd card', 'microsd 卡', 'microsd', 'sd_card'].includes(lower)) {
    return 'sd_card';
  }
  if (['nfc'].includes(lower)) {
    return 'nfc';
  }
  if (['bluetooth', '蓝牙', '藍牙', 'bt'].includes(lower)) {
    return 'bluetooth';
  }
  if (['none', '无', '無'].includes(lower)) {
    return 'none';
  }
  return 'usb';
};

/**
 * 传输方式对应的 CSS 类名映射（彻底修复 zh-TW "二維碼" / "SD 卡" 以及新语言的样式失效问题）
 */
export const getTransferMethodClass = (method: string): string => {
  const key = normalizeTransferMethodKey(method);
  const classMap: Record<TransferMethodCode, string> = {
    qr: 'qr-code',
    usb: 'usb',
    sd_card: 'sd-card',
    nfc: 'nfc',
    bluetooth: 'bluetooth',
    none: 'none'
  };
  return classMap[key] || 'usb';
};

/**
 * 格式化传输方式的显示标签（通过 i18n 查找翻译）
 */
export const formatTransferMethodLabel = (
  method: string, 
  t: (key: string, defaultValue?: string) => string
): string => {
  const key = normalizeTransferMethodKey(method);
  // 查找翻译，如 transferMethods.qr -> "二维码" / "二維碼" / "QR Code"
  return t(`transferMethods.${key}`, method);
};
