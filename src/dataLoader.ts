import { CustodyData, Feature } from './types';
import { getSafeLanguage, DEFAULT_LANGUAGE } from './config/languages';

interface CoreFeature {
  type: 'positive' | 'negative' | 'warning';
}

interface CoreItem {
  id: string;
  name: string;
  logo: string;
  features: CoreFeature[];
  compatibleWallets?: string[];
  compatibleSigners?: string[];
  compatibleNodes?: string[];
  supportedPlatforms?: string[];
  multisigOnly?: boolean;
}

interface CoreData {
  hardwareSigners: CoreItem[];
  softwareWallets: CoreItem[];
  nodes: CoreItem[];
  transferMethods: Record<string, Record<string, string[]>>;
}

interface CustodyTranslation {
  names?: Record<string, string>;
  features?: Record<string, string[]>;
}

// 内存缓存核心结构数据与已加载的各语言文本
let cachedCoreData: CoreData | null = null;
const cachedTranslations: Record<string, CustodyTranslation> = {};

// 备份数据（防灾兜底）
export const getFallbackData = (): CustodyData => {
  return {
    hardwareSigners: [
      {
        id: 'trezor',
        name: 'Trezor',
        logo: '/images/logos/hardware/trezor.webp',
        features: [
          { type: 'positive', text: '支持 Taproot 单签名' },
          { type: 'positive', text: '开源安全芯片' },
          { type: 'positive', text: '支持 SLIP39 Shamir 备份' }
        ],
        compatibleWallets: ['sparrow', 'nunchuk', 'electrum', 'keeper', 'specter', 'wasabi']
      }
    ],
    softwareWallets: [],
    nodes: [],
    connections: [],
    transferMethods: {
      'trezor': {
        'sparrow': ['usb'],
        'electrum': ['usb']
      }
    }
  };
};

/**
 * 将核心机器事实与语言翻译文本组装为完整的 CustodyData
 */
const assembleCustodyData = (
  core: CoreData,
  trans: CustodyTranslation,
  enTrans: CustodyTranslation
): CustodyData => {
  const mapItem = <T extends CoreItem>(item: T) => {
    const localizedName = trans.names?.[item.id] || enTrans.names?.[item.id] || item.name;
    const localizedFeatures: Feature[] = item.features.map((f, index) => {
      const text = trans.features?.[item.id]?.[index]
        || enTrans.features?.[item.id]?.[index]
        || '';
      return {
        type: f.type,
        text
      };
    });

    return {
      ...item,
      name: localizedName,
      features: localizedFeatures,
      compatibleWallets: item.compatibleWallets || [],
      compatibleSigners: item.compatibleSigners || [],
      compatibleNodes: item.compatibleNodes || [],
      supportedPlatforms: item.supportedPlatforms || [],
    };
  };

  return {
    hardwareSigners: core.hardwareSigners.map(mapItem),
    softwareWallets: core.softwareWallets.map(mapItem),
    nodes: core.nodes.map(mapItem),
    connections: [],
    transferMethods: core.transferMethods
  };
};

/**
 * 异步加载托管数据（优先使用解耦后的 core + 语言字典模式）
 */
export const loadCustodyData = async (lang: string = DEFAULT_LANGUAGE): Promise<CustodyData> => {
  try {
    const safeLang = getSafeLanguage(lang);

    // 1. 获取或加载核心事实数据
    if (!cachedCoreData) {
      const coreRes = await fetch('/data/custody-core.json');
      if (!coreRes.ok) {
        // 兼容回退：如果 core 加载失败，尝试回退加载历史 data.json
        const fallbackRes = await fetch(`/locales/${safeLang}/data.json`);
        if (fallbackRes.ok) {
          return await fallbackRes.json();
        }
        throw new Error(`Failed to load custody-core.json: ${coreRes.status}`);
      }
      cachedCoreData = await coreRes.json();
    }

    // 2. 预加载英文基准文案（用于优雅缺词降级）
    if (!cachedTranslations[DEFAULT_LANGUAGE]) {
      try {
        const enRes = await fetch(`/locales/${DEFAULT_LANGUAGE}/custody.json`);
        if (enRes.ok) {
          cachedTranslations[DEFAULT_LANGUAGE] = await enRes.json();
        }
      } catch (e) {
        console.warn('Failed to load English fallback translations', e);
      }
    }
    const enTrans = cachedTranslations[DEFAULT_LANGUAGE] || {};

    // 3. 加载当前语言翻译
    if (!cachedTranslations[safeLang]) {
      try {
        const transRes = await fetch(`/locales/${safeLang}/custody.json`);
        if (transRes.ok) {
          cachedTranslations[safeLang] = await transRes.json();
        } else {
          cachedTranslations[safeLang] = enTrans;
        }
      } catch (e) {
        cachedTranslations[safeLang] = enTrans;
      }
    }
    const targetTrans = cachedTranslations[safeLang] || enTrans;

    // 4. 组装并返回
    return assembleCustodyData(cachedCoreData!, targetTrans, enTrans);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`Failed to load custody data for ${lang}:`, error);
    }
    return getFallbackData();
  }
};

// 同步导出原始数据（向后兼容）
export const custodyData: CustodyData = getFallbackData();
