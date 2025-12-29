import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPreference, ComponentState, CustodyData } from './types';
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import FaqDrawer from './components/FaqDrawer';
import MainLayout from './components/MainLayout';
import InitialGuide from './components/InitialGuide';
import { useIsMobile } from './hooks/useIsMobile';
import { SignatureMode, ThresholdType } from './components/SignatureModeSelector';
import { loadCustodyData } from './dataLoader';
import './index.css';
import './App.css';

// 槽位颜色配置
export const SLOT_COLORS = [
  { bg: '#dcfce7', border: '#86efac', label: '浅绿' },  // 槽位1
  { bg: '#dbeafe', border: '#93c5fd', label: '浅蓝' },  // 槽位2
  { bg: '#ede9fe', border: '#c4b5fd', label: '浅紫' },  // 槽位3
  { bg: '#fce7f3', border: '#f9a8d4', label: '浅粉' },  // 槽位4
  { bg: '#fef9c3', border: '#fde047', label: '浅黄' },  // 槽位5
];

interface AppState {
  selectedSigners: string[];
  selectedWallet: string | null;
  selectedNode: string | null;
  userPreference: UserPreference | null;
  showGuide: boolean;
  custodyData: CustodyData | null;
  isLoading: boolean;
  signatureMode: SignatureMode;
  threshold: ThresholdType;
  signerSlots: (string | null)[];
  multisigWallet: string | null;
  multisigNode: string | null;
}

function App() {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<AppState>({
    selectedSigners: [],
    selectedWallet: null,
    selectedNode: null,
    userPreference: null,
    showGuide: true,
    custodyData: null,
    isLoading: true,
    signatureMode: 'single',
    threshold: '2-of-3',
    signerSlots: [null, null, null],
    multisigWallet: null,
    multisigNode: null
  });
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [faqContent, setFaqContent] = useState('');
  const [layoutBounds, setLayoutBounds] = useState<{ leftEdge: number; rightEdge: number } | null>(null);
  const isMobile = useIsMobile(769);

  // 验证用户偏好数据结构
  const isValidUserPreference = (data: unknown): data is UserPreference => {
    return (
      data !== null &&
      typeof data === 'object' &&
      'deviceType' in data &&
      'signerWillingness' in data &&
      ((data as UserPreference).deviceType === 'mobile' || (data as UserPreference).deviceType === 'desktop') &&
      ((data as UserPreference).signerWillingness === 'no-signer' || (data as UserPreference).signerWillingness === 'with-signer')
    );
  };

  // SEO & Language settings
  useEffect(() => {
    document.title = t('meta.title', '比特币自主保管模拟器');
    document.documentElement.lang = i18n.language;
  }, [i18n.language, t]);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        // 加载托管数据
        const data = await loadCustodyData(i18n.language);
        setState(prev => ({ ...prev, custodyData: data, isLoading: false }));

        // 加载FAQ
        const faqResponse = await fetch(`/locales/${i18n.language}/faq.md`);
        if (faqResponse.ok) {
          const text = await faqResponse.text();
          setFaqContent(text);
        } else {
          console.error('Failed to load FAQ');
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Failed to load data:', error);
        }
        const { getFallbackData } = await import('./dataLoader');
        const fallbackData = getFallbackData();
        setState(prev => ({ ...prev, custodyData: fallbackData, isLoading: false }));
      }
    };
    
    loadData();
  }, [i18n.language]);

  // 从本地存储加载用户偏好
  useEffect(() => {
    const savedPreference = localStorage.getItem('userPreference');
    if (savedPreference) {
      try {
        const parsed = JSON.parse(savedPreference);
        if (isValidUserPreference(parsed)) {
          setState(prev => ({
            ...prev,
            userPreference: parsed,
            showGuide: false
          }));
        } else {
          localStorage.removeItem('userPreference');
        }
      } catch {
        localStorage.removeItem('userPreference');
      }
    }
  }, []);

  // 切换签名模式
  const handleModeChange = (mode: SignatureMode) => {
    setState(prev => ({
      ...prev,
      signatureMode: mode,
      selectedSigners: [],
      selectedWallet: null,
      selectedNode: null,
      signerSlots: mode === 'multi' 
        ? Array(prev.threshold === '2-of-3' ? 3 : 5).fill(null)
        : prev.signerSlots,
      multisigWallet: null,
      multisigNode: null
    }));
  };

  // 切换多签阈值
  const handleThresholdChange = (newThreshold: ThresholdType) => {
    const slotCount = newThreshold === '2-of-3' ? 3 : 5;
    setState(prev => ({
      ...prev,
      threshold: newThreshold,
      signerSlots: Array(slotCount).fill(null),
      multisigWallet: null,
      multisigNode: null
    }));
  };

  // 多签模式 - 选择签名器
  const handleMultisigSignerSelect = (slotIndex: number, signerId: string | null) => {
    setState(prev => {
      const newSlots = [...prev.signerSlots];
      newSlots[slotIndex] = signerId;
      return {
        ...prev,
        signerSlots: newSlots,
      };
    });
  };

  // 多签模式 - 选择钱包
  const handleMultisigWalletSelect = (walletId: string | null) => {
    setState(prev => {
      if (walletId === null) {
        return { ...prev, multisigWallet: null };
      }
      
      const wallet = prev.custodyData?.softwareWallets.find(w => w.id === walletId);
      let newPreference = prev.userPreference;
      
      if (wallet && prev.userPreference && wallet.supportedPlatforms.length === 1) {
        const walletPlatform = wallet.supportedPlatforms[0].toLowerCase();
        const currentDeviceType = prev.userPreference.deviceType;
        
        if ((walletPlatform === 'desktop' && currentDeviceType === 'mobile') ||
            (walletPlatform === 'mobile' && currentDeviceType === 'desktop')) {
          newPreference = {
            ...prev.userPreference,
            deviceType: walletPlatform === 'desktop' ? 'desktop' : 'mobile'
          };
          localStorage.setItem('userPreference', JSON.stringify(newPreference));
        }
      }
      
      return {
        ...prev,
        multisigWallet: walletId,
        userPreference: newPreference
      };
    });
  };

  // 多签模式 - 选择节点
  const handleMultisigNodeSelect = (nodeId: string | null) => {
    setState(prev => ({
      ...prev,
      multisigNode: nodeId,
    }));
  };

  // 多签模式 - 获取兼容的列表
  const getMultisigCompatibleWallets = (): string[] => {
    if (!state.custodyData) return [];
    const selectedSigners = state.signerSlots.filter(s => s !== null) as string[];
    if (selectedSigners.length === 0) {
      return state.custodyData.softwareWallets.map(w => w.id);
    }
    return state.custodyData.softwareWallets
      .filter(wallet => 
        selectedSigners.every(signerId => 
          wallet.compatibleSigners.includes(signerId)
        )
      )
      .map(w => w.id);
  };

  const getMultisigCompatibleSigners = (): string[] => {
    if (!state.custodyData) return [];
    if (!state.multisigWallet) {
      return state.custodyData.hardwareSigners
        .filter(s => s.id !== 'none')
        .map(s => s.id);
    }
    const wallet = state.custodyData.softwareWallets.find(w => w.id === state.multisigWallet);
    if (!wallet) return [];
    return wallet.compatibleSigners.filter(id => id !== 'none');
  };

  const getMultisigCompatibleNodes = (): string[] => {
    if (!state.custodyData) return [];
    if (!state.multisigWallet) {
      return state.custodyData.nodes.map(n => n.id);
    }
    return state.custodyData.nodes
      .filter(node => node.compatibleWallets.includes(state.multisigWallet!))
      .map(n => n.id);
  };

  // 计算组件状态（单签模式）
  const getComponentState = (componentId: string, type: 'signer' | 'wallet' | 'node'): ComponentState => {
    if (!state.custodyData || !state.userPreference) return 'inactive';
    const userDeviceType = state.userPreference.deviceType;
    
    if (type === 'signer') {
      if (state.selectedSigners.includes(componentId)) return 'active';
      if (state.selectedSigners.length > 0) return 'inactive';
      if (componentId === 'none') {
        if (state.userPreference.signerWillingness === 'with-signer') return 'inactive';
        return 'breathing';
      }
      if (state.selectedWallet) {
        const wallet = state.custodyData.softwareWallets.find(w => w.id === state.selectedWallet);
        if (wallet && wallet.compatibleSigners.includes(componentId)) return 'breathing';
      }
      if (state.userPreference.signerWillingness === 'with-signer' && state.selectedWallet === null && state.selectedNode === null) {
        return 'breathing';
      }
      return 'inactive';
    }
    
    if (type === 'wallet') {
      if (state.selectedWallet === componentId) return 'active';
      if (state.selectedWallet !== null) return 'inactive';
      const wallet = state.custodyData.softwareWallets.find(w => w.id === componentId);
      if (!wallet) return 'inactive';
      if (!wallet.supportedPlatforms.some(platform => platform.toLowerCase() === userDeviceType)) return 'inactive';
      if (state.selectedSigners.length > 0) {
        if (state.selectedSigners.includes('none')) return 'breathing';
        if (state.selectedSigners.some(signer => signer !== 'none' && wallet.compatibleSigners.includes(signer))) return 'breathing';
      }
      if (state.selectedNode) {
        const node = state.custodyData.nodes.find(n => n.id === state.selectedNode);
        if (node && node.compatibleWallets.includes(componentId)) return 'breathing';
      }
      return 'inactive';
    }
    
    if (type === 'node') {
      if (state.selectedNode === componentId) return 'active';
      if (state.selectedNode !== null) return 'inactive';
      if (state.selectedWallet) {
        const node = state.custodyData.nodes.find(n => n.id === componentId);
        if (node && node.compatibleWallets.includes(state.selectedWallet)) return 'breathing';
      }
      return 'inactive';
    }
    
    return 'inactive';
  };

  // 处理组件点击
  const handleComponentClick = (componentId: string, type: 'signer' | 'wallet' | 'node') => {
    const currentState = getComponentState(componentId, type);
    if (currentState === 'inactive') {
      setState(prev => {
        const newState = { ...prev, selectedSigners: [], selectedWallet: null, selectedNode: null };
        if (type === 'signer') {
          const newWillingness = componentId === 'none' ? 'no-signer' : 'with-signer';
          const newPreference = { ...prev.userPreference!, signerWillingness: newWillingness };
          localStorage.setItem('userPreference', JSON.stringify(newPreference));
          return { ...newState, userPreference: newPreference, selectedSigners: [componentId] };
        } else if (type === 'wallet') {
          const wallet = prev.custodyData?.softwareWallets.find(w => w.id === componentId);
          let newPreference = prev.userPreference;
          if (wallet && prev.userPreference && wallet.supportedPlatforms.length === 1) {
            const walletPlatform = wallet.supportedPlatforms[0].toLowerCase();
            newPreference = { ...prev.userPreference, deviceType: walletPlatform === 'desktop' ? 'desktop' : 'mobile' };
            localStorage.setItem('userPreference', JSON.stringify(newPreference));
          }
          return { ...newState, selectedWallet: componentId, userPreference: newPreference };
        } else if (type === 'node') {
          return { ...newState, selectedNode: componentId };
        }
        return newState;
      });
      return;
    }
    
    if (type === 'signer') {
      setState(prev => {
        const isSelected = prev.selectedSigners.includes(componentId);
        if (isSelected) {
          return { ...prev, selectedSigners: prev.selectedSigners.filter(id => id !== componentId), selectedWallet: null, selectedNode: null };
        }
        return { ...prev, selectedSigners: [...prev.selectedSigners, componentId] };
      });
    } else if (type === 'wallet') {
      setState(prev => {
        if (prev.selectedWallet === componentId) {
          return { ...prev, selectedWallet: null, selectedNode: null };
        }
        const wallet = prev.custodyData?.softwareWallets.find(w => w.id === componentId);
        let newPreference = prev.userPreference;
        if (wallet && prev.userPreference && wallet.supportedPlatforms.length === 1) {
          const walletPlatform = wallet.supportedPlatforms[0].toLowerCase();
          newPreference = { ...prev.userPreference, deviceType: walletPlatform === 'desktop' ? 'desktop' : 'mobile' };
          localStorage.setItem('userPreference', JSON.stringify(newPreference));
        }
        return { ...prev, selectedWallet: componentId, selectedNode: null, userPreference: newPreference };
      });
    } else if (type === 'node') {
      setState(prev => ({
        ...prev,
        selectedNode: prev.selectedNode === componentId ? null : componentId
      }));
    }
  };

  // 计算完成度
  const getCompletionPercentage = (): number => {
    if (!state.userPreference) return 0;
    if (state.signatureMode === 'multi') {
      const filledSlots = state.signerSlots.filter(s => s !== null).length;
      let progress = state.threshold === '2-of-3' ? filledSlots * 20 : filledSlots * 15;
      if (state.threshold === '3-of-5' && filledSlots === 5) progress += 5;
      if (state.multisigWallet) progress += 50;
      if (state.multisigNode && state.multisigNode !== 'publicnode') progress += 20;
      return progress;
    }
    const hasWallet = state.selectedWallet !== null;
    const hasNode = state.selectedNode !== null && state.selectedNode !== 'publicnode';
    const hasNoneSigner = state.selectedSigners.includes('none');
    const hasHardwareSigner = state.selectedSigners.some(id => id !== 'none');
    if (hasHardwareSigner && hasWallet && hasNode) return 120;
    if (hasHardwareSigner && hasWallet) return 100;
    if (hasNoneSigner && hasWallet && hasNode) return 80;
    if (hasNoneSigner && hasWallet) return 60;
    if (hasHardwareSigner && !hasWallet) return 50;
    return 0;
  };

  const handlePreferenceSet = (preference: UserPreference) => {
    setState(prev => {
      const newState = { ...prev, userPreference: preference, showGuide: false };
      if (preference.signerWillingness === 'no-signer') {
        newState.selectedSigners = ['none'];
        newState.selectedWallet = null;
        newState.selectedNode = null;
      }
      return newState;
    });
    localStorage.setItem('userPreference', JSON.stringify(preference));
  };

  const handleOpenFaq = () => setIsFaqOpen(true);
  const handleCloseFaq = () => setIsFaqOpen(false);

  const handleResetPreference = () => {
    setState(prev => ({
      ...prev,
      selectedSigners: [],
      selectedWallet: null,
      selectedNode: null,
      userPreference: null,
      showGuide: true,
      signatureMode: 'single',
      threshold: '2-of-3',
      signerSlots: [null, null, null],
      multisigWallet: null,
      multisigNode: null
    }));
    localStorage.removeItem('userPreference');
  };

  if (state.isLoading || !state.custodyData) {
    return (
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2rem', color: '#666' }}>
          {t('common.loading', '加载中...')}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {state.showGuide && (
        <InitialGuide onPreferenceSet={handlePreferenceSet} />
      )}
      
      {isMobile ? (
        <HeaderMobile
          completionPercentage={getCompletionPercentage()}
          maxProgress={state.signatureMode === 'multi' ? (state.threshold === '2-of-3' ? 130 : 150) : 120}
          onResetPreference={handleResetPreference}
          onOpenFaq={handleOpenFaq}
        />
      ) : (
        <Header 
          completionPercentage={getCompletionPercentage()}
          maxProgress={state.signatureMode === 'multi' ? (state.threshold === '2-of-3' ? 130 : 150) : 120}
          onResetPreference={handleResetPreference}
          onOpenFaq={handleOpenFaq}
          layoutLeftEdge={layoutBounds?.leftEdge}
          layoutRightEdge={layoutBounds?.rightEdge}
        />
      )}
      
      <MainLayout
        userPreference={state.userPreference}
        selectedSigners={state.selectedSigners}
        selectedWallet={state.selectedWallet}
        selectedNode={state.selectedNode}
        getComponentState={getComponentState}
        onComponentClick={handleComponentClick}
        custodyData={state.custodyData}
        onLayoutMeasured={setLayoutBounds}
        signatureMode={state.signatureMode}
        threshold={state.threshold}
        onModeChange={handleModeChange}
        onThresholdChange={handleThresholdChange}
        signerSlots={state.signerSlots}
        multisigWallet={state.multisigWallet}
        multisigNode={state.multisigNode}
        onMultisigSignerSelect={handleMultisigSignerSelect}
        onMultisigWalletSelect={handleMultisigWalletSelect}
        onMultisigNodeSelect={handleMultisigNodeSelect}
        getMultisigCompatibleSigners={getMultisigCompatibleSigners}
        getMultisigCompatibleWallets={getMultisigCompatibleWallets}
        getMultisigCompatibleNodes={getMultisigCompatibleNodes}
      />

      <FaqDrawer 
        isOpen={isFaqOpen}
        onClose={handleCloseFaq}
        content={faqContent}
      />
    </div>
  );
}

export default App;
