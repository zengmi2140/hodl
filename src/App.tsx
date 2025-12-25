import React, { useState, useEffect } from 'react';
import { UserPreference, ComponentState, CustodyData } from './types';
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import FaqDrawer from './components/FaqDrawer';
import faqContent from './content/FAQ.md?raw';
import MainLayout from './components/MainLayout';
import InitialGuide from './components/InitialGuide';
import { useIsMobile } from './hooks/useIsMobile';
import { SignatureMode, ThresholdType } from './components/SignatureModeSelector';
import './index.css';
import './App.css';

// 槽位颜色配置（从 MultisigPage 移过来）
export const SLOT_COLORS = [
  { bg: '#dcfce7', border: '#86efac', label: '浅绿' },  // 槽位1
  { bg: '#dbeafe', border: '#93c5fd', label: '浅蓝' },  // 槽位2
  { bg: '#ede9fe', border: '#c4b5fd', label: '浅紫' },  // 槽位3
  { bg: '#fce7f3', border: '#f9a8d4', label: '浅粉' },  // 槽位4
  { bg: '#fef9c3', border: '#fde047', label: '浅黄' },  // 槽位5
];

interface AppState {
  // 单签模式状态
  selectedSigners: string[];
  selectedWallet: string | null;
  selectedNode: string | null;
  userPreference: UserPreference | null;
  showGuide: boolean;
  custodyData: CustodyData | null;
  isLoading: boolean;
  // 签名模式
  signatureMode: SignatureMode;
  // 多签模式状态
  threshold: ThresholdType;
  signerSlots: (string | null)[];
  multisigWallet: string | null;
  multisigNode: string | null;
}

function App() {
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
  const [layoutBounds, setLayoutBounds] = useState<{ leftEdge: number; rightEdge: number } | null>(null);
  const isMobile = useIsMobile(769);

  // 加载JSON数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/custody-data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: CustodyData = await response.json();
        setState(prev => ({ ...prev, custodyData: data, isLoading: false }));
      } catch (error) {
        console.error('Failed to load custody data:', error);
        // 如果加载失败，使用备用数据
        const { getFallbackData } = await import('./dataLoader');
        const fallbackData = getFallbackData();
        setState(prev => ({ ...prev, custodyData: fallbackData, isLoading: false }));
      }
    };
    
    loadData();
  }, []);

  // 从本地存储加载用户偏好
  useEffect(() => {
    const savedPreference = localStorage.getItem('userPreference');
    if (savedPreference) {
      const preference = JSON.parse(savedPreference);
      setState(prev => ({
        ...prev,
        userPreference: preference,
        showGuide: false
      }));
    }
  }, []);

  // 切换签名模式
  const handleModeChange = (mode: SignatureMode) => {
    setState(prev => ({
      ...prev,
      signatureMode: mode,
      // 切换模式时重置对应的选择
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
    setState(prev => ({
      ...prev,
      multisigWallet: walletId,
    }));
  };

  // 多签模式 - 选择节点
  const handleMultisigNodeSelect = (nodeId: string | null) => {
    setState(prev => ({
      ...prev,
      multisigNode: nodeId,
    }));
  };

  // 多签模式 - 获取兼容的钱包列表
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

  // 多签模式 - 获取兼容的签名器列表
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

  // 多签模式 - 获取兼容的节点列表
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
    
    // 使用用户偏好中存储的设备类型
    const userDeviceType = state.userPreference.deviceType;
    
    if (type === 'signer') {
      // 已选中的签名器显示为active
      if (state.selectedSigners.includes(componentId)) return 'active';
      
      // 如果该列已有选中项，其他项不呼吸
      if (state.selectedSigners.length > 0) {
        return 'inactive';
      }
      
      // 特殊处理："不使用签名器"选项
      if (componentId === 'none') {
        // 如果用户选择了"愿意尝试硬件签名器"，则"不使用签名器"不呼吸
        if (state.userPreference.signerWillingness === 'with-signer') {
          return 'inactive';
        }
        // 如果用户选择了"暂不使用"，则"不使用签名器"正常呼吸
        return 'breathing';
      }
      
      // 检查与当前选择的钱包是否兼容（反向兼容）
      if (state.selectedWallet) {
        const wallet = state.custodyData.softwareWallets.find(w => w.id === state.selectedWallet);
        if (wallet && wallet.compatibleSigners.includes(componentId)) {
          return 'breathing';
        }
      }
      
      // 初始状态：如果用户选择了"愿意尝试硬件签名器"，硬件签名器列呼吸（除了"不使用签名器"）
      if (state.userPreference.signerWillingness === 'with-signer' && state.selectedWallet === null && state.selectedNode === null) {
        return 'breathing';
      }
      
      return 'inactive';
    }
    
    if (type === 'wallet') {
      // 已选中的钱包显示为active
      if (state.selectedWallet === componentId) return 'active';
      
      // 如果该列已有选中项，其他项不呼吸
      if (state.selectedWallet !== null) {
        return 'inactive';
      }
      
      const wallet = state.custodyData.softwareWallets.find(w => w.id === componentId);
      if (!wallet) return 'inactive';
      
      // 检查是否支持用户选择的设备类型
      if (!wallet.supportedPlatforms.some(platform => 
        platform.toLowerCase() === userDeviceType
      )) {
        return 'inactive';
      }
      
      // 检查与选择的签名器是否兼容（正向兼容）
      if (state.selectedSigners.length > 0) {
        // 如果选中的是"不使用签名器"，支持当前设备的钱包就呼吸
        if (state.selectedSigners.includes('none')) {
          return 'breathing';
        }
        // 如果选中的是其他硬件签名器，检查兼容性
        if (state.selectedSigners.some(signer => signer !== 'none' && wallet.compatibleSigners.includes(signer))) {
          return 'breathing';
        }
      }
      
      // 检查与当前选择的节点是否兼容（反向兼容）
      if (state.selectedNode) {
        const node = state.custodyData.nodes.find(n => n.id === state.selectedNode);
        if (node && node.compatibleWallets.includes(componentId)) {
          return 'breathing';
        }
      }
      
      return 'inactive';
    }
    
    if (type === 'node') {
      // 已选中的节点显示为active
      if (state.selectedNode === componentId) return 'active';
      
      // 如果该列已有选中项，其他项不呼吸
      if (state.selectedNode !== null) {
        return 'inactive';
      }
      
      // 检查与选择的钱包是否兼容（正向兼容）
      if (state.selectedWallet) {
        const node = state.custodyData.nodes.find(n => n.id === componentId);
        if (node && node.compatibleWallets.includes(state.selectedWallet)) {
          return 'breathing';
        }
      }
      
      return 'inactive';
    }
    
    return 'inactive';
  };

  // 处理组件点击（单签模式）
  const handleComponentClick = (componentId: string, type: 'signer' | 'wallet' | 'node') => {
    const currentState = getComponentState(componentId, type);
    
    // 如果点击的是非呼吸状态（inactive）的选项，执行重置逻辑
    if (currentState === 'inactive') {
      setState(prev => {
        // 重置所有选择
        const newState = {
          ...prev,
          selectedSigners: [],
          selectedWallet: null,
          selectedNode: null
        };
        
        // 根据点击的组件类型，设置相应的选择
        if (type === 'signer') {
          // 如果点击的是"不使用签名器"
          if (componentId === 'none') {
            const newPreference = {
              ...prev.userPreference!,
              signerWillingness: 'no-signer' as const
            };
            localStorage.setItem('userPreference', JSON.stringify(newPreference));
            
            return {
              ...newState,
              userPreference: newPreference,
              selectedSigners: [componentId]
            };
          } else {
            // 选择硬件签名器
            const newPreference = {
              ...prev.userPreference!,
              signerWillingness: 'with-signer' as const
            };
            localStorage.setItem('userPreference', JSON.stringify(newPreference));
            
            return {
              ...newState,
              userPreference: newPreference,
              selectedSigners: [componentId]
            };
          }
        } else if (type === 'wallet') {
          // 选择软件钱包
          return {
            ...newState,
            selectedWallet: componentId
          };
        } else if (type === 'node') {
          // 选择区块链节点
          return {
            ...newState,
            selectedNode: componentId
          };
        }
        
        return newState;
      });
      return;
    }
    
    // 如果点击的是呼吸状态（breathing）或已选中（active）的选项，执行级联选择逻辑
    if (type === 'signer') {
      setState(prev => {
        const isSelected = prev.selectedSigners.includes(componentId);
        
        if (isSelected) {
          // 取消选择
          return {
            ...prev,
            selectedSigners: prev.selectedSigners.filter(id => id !== componentId),
            selectedWallet: null,
            selectedNode: null
          };
        } else {
          // 添加到选择中
          return {
            ...prev,
            selectedSigners: [...prev.selectedSigners, componentId]
          };
        }
      });
    } else if (type === 'wallet') {
      setState(prev => {
        if (prev.selectedWallet === componentId) {
          // 取消选择
          return {
            ...prev,
            selectedWallet: null,
            selectedNode: null
          };
        } else {
          // 选择新钱包
          return {
            ...prev,
            selectedWallet: componentId,
            selectedNode: null // 清除节点选择，重新开始级联
          };
        }
      });
    } else if (type === 'node') {
      setState(prev => {
        if (prev.selectedNode === componentId) {
          // 取消选择
          return {
            ...prev,
            selectedNode: null
          };
        } else {
          // 选择新节点
          return {
            ...prev,
            selectedNode: componentId
          };
        }
      });
    }
  };

  // 计算完成度
  const getCompletionPercentage = (): number => {
    if (!state.userPreference) return 0;
    
    if (state.signatureMode === 'multi') {
      // 多签模式进度计算
      const slotCount = state.threshold === '2-of-3' ? 3 : 5;
      const filledSlots = state.signerSlots.filter(s => s !== null).length;
      
      let progress = 10; // 阈值选择始终完成
      const slotWeight = state.threshold === '2-of-3' ? 20 : 12;
      progress += filledSlots * slotWeight;
      
      if (state.multisigWallet) progress += 20;
      if (state.multisigNode) progress += 10;
      
      return Math.min(progress, 100);
    }
    
    // 单签模式进度计算
    const hasWallet = state.selectedWallet !== null;
    const hasSigner = state.selectedSigners.length > 0;
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

  // 处理用户偏好设置
  const handlePreferenceSet = (preference: UserPreference) => {
    setState(prev => {
      const newState = {
        ...prev,
        userPreference: preference,
        showGuide: false
      };
      
      // 如果用户选择了"暂时不用硬件签名器"，自动选中"不使用签名器"
      if (preference.signerWillingness === 'no-signer') {
        newState.selectedSigners = ['none'];
        newState.selectedWallet = null;
        newState.selectedNode = null;
      }
      
      return newState;
    });
    localStorage.setItem('userPreference', JSON.stringify(preference));
  };

  const handleOpenFaq = () => {
    setIsFaqOpen(true);
  };

  const handleCloseFaq = () => {
    setIsFaqOpen(false);
  };

  // 重置偏好
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

  // 如果数据还在加载中，显示加载状态
  if (state.isLoading || !state.custodyData) {
    return (
      <div className="App">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          加载中...
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
          onResetPreference={handleResetPreference}
          onOpenFaq={handleOpenFaq}
        />
      ) : (
        <Header 
          completionPercentage={getCompletionPercentage()}
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
