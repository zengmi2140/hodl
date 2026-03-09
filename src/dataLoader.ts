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
const SUPPORTED_LANGS = ['en', 'zh-CN', 'zh-TW', 'zh'];

export const loadCustodyData = async (lang: string = 'zh-CN'): Promise<CustodyData> => {
  try {
    const safeLang = SUPPORTED_LANGS.includes(lang) ? lang : 'en';
    const response = await fetch(`/locales/${safeLang}/data.json`);
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
