import { CustodyData } from './types';

// 备份数据（从原始data.ts复制）
export const getFallbackData = (): CustodyData => {
  return {
    hardwareSigners: [
      {
        id: 'trezor',
        name: 'Trezor',
        logo: '🔒',
        features: [
          { type: 'positive', text: '支持多种币种' },
          { type: 'positive', text: '开源固件' },
          { type: 'negative', text: '不防拆' },
          { type: 'warning', text: '需要通过Trezor Suite连接' }
        ],
        compatibleWallets: ['sparrow', 'electrum', 'bluewallet']
      }
    ],
    softwareWallets: [],
    nodes: [],
    connections: [],
    transferMethods: {
      'trezor': {
        'sparrow': ['USB'],
        'electrum': ['USB'],
        'bluewallet': ['USB']
      }
    }
  };
};

// 从JSON文件异步加载数据的函数
export const loadCustodyData = async (lang: string = 'zh-CN'): Promise<CustodyData> => {
  try {
    // 处理 zh-CN 别名，确保路径正确
    // i18next 可能返回 'zh', 'zh-CN', 'en-US' 等，确保与文件夹名匹配
    // 我们假设文件夹是 'zh-CN', 'zh-TW', 'en'
    
    const response = await fetch(`/locales/${lang}/data.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CustodyData = await response.json();
    return data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`Failed to load custody data for ${lang}:`, error);
    }
    // 生产环境静默失败，使用备用数据
    return getFallbackData();
  }
};

// 同步导出原始数据（向后兼容）
export const custodyData: CustodyData = getFallbackData();
