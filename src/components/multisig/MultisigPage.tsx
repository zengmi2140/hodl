import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MultisigHeader from './MultisigHeader';
import ThresholdSelector from './ThresholdSelector';
import SignerColumn from './SignerColumn';
import WalletColumn from './WalletColumn';
import NodeColumn from './NodeColumn';
import TransferMethodDisplay from './TransferMethodDisplay';
import { CustodyData } from '../../types';
import './MultisigPage.css';

// 槽位颜色配置
export const SLOT_COLORS = [
  { bg: '#dcfce7', border: '#86efac', label: '浅绿' },  // 槽位1
  { bg: '#dbeafe', border: '#93c5fd', label: '浅蓝' },  // 槽位2
  { bg: '#ede9fe', border: '#c4b5fd', label: '浅紫' },  // 槽位3
  { bg: '#fce7f3', border: '#f9a8d4', label: '浅粉' },  // 槽位4
  { bg: '#fef9c3', border: '#fde047', label: '浅黄' },  // 槽位5
];

export type ThresholdType = '2-of-3' | '3-of-5';

export interface MultisigState {
  threshold: ThresholdType;
  signerSlots: (string | null)[];
  selectedWallet: string | null;
  selectedNode: string | null;
}

const MultisigPage: React.FC = () => {
  const navigate = useNavigate();
  const [custodyData, setCustodyData] = useState<CustodyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [state, setState] = useState<MultisigState>({
    threshold: '2-of-3',
    signerSlots: [null, null, null],
    selectedWallet: null,
    selectedNode: null,
  });

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/custody-data.json');
        if (!response.ok) throw new Error('Failed to load data');
        const data: CustodyData = await response.json();
        setCustodyData(data);
      } catch (error) {
        console.error('Failed to load custody data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 计算进度
  const getCompletionPercentage = (): number => {
    const slotCount = state.threshold === '2-of-3' ? 3 : 5;
    const filledSlots = state.signerSlots.filter(s => s !== null).length;
    
    // 10% 阈值选择（始终完成）
    let progress = 10;
    
    // 每个槽位的权重
    const slotWeight = state.threshold === '2-of-3' ? 20 : 12;
    progress += filledSlots * slotWeight;
    
    // 钱包 20%
    if (state.selectedWallet) {
      progress += 20;
    }
    
    // 节点 10%
    if (state.selectedNode) {
      progress += 10;
    }
    
    return Math.min(progress, 100);
  };

  // 切换阈值
  const handleThresholdChange = (newThreshold: ThresholdType) => {
    const slotCount = newThreshold === '2-of-3' ? 3 : 5;
    setState({
      threshold: newThreshold,
      signerSlots: Array(slotCount).fill(null),
      selectedWallet: null,
      selectedNode: null,
    });
  };

  // 选择签名器
  const handleSignerSelect = (slotIndex: number, signerId: string | null) => {
    setState(prev => {
      const newSlots = [...prev.signerSlots];
      newSlots[slotIndex] = signerId;
      return {
        ...prev,
        signerSlots: newSlots,
      };
    });
  };

  // 选择钱包
  const handleWalletSelect = (walletId: string | null) => {
    setState(prev => ({
      ...prev,
      selectedWallet: walletId,
      selectedNode: null, // 清空节点选择
    }));
  };

  // 选择节点
  const handleNodeSelect = (nodeId: string | null) => {
    setState(prev => ({
      ...prev,
      selectedNode: nodeId,
    }));
  };

  // 获取兼容的钱包列表
  const getCompatibleWallets = (): string[] => {
    if (!custodyData) return [];
    
    const selectedSigners = state.signerSlots.filter(s => s !== null) as string[];
    if (selectedSigners.length === 0) {
      // 没有选择签名器时，返回所有钱包
      return custodyData.softwareWallets.map(w => w.id);
    }
    
    // 返回与所有已选签名器都兼容的钱包
    return custodyData.softwareWallets
      .filter(wallet => 
        selectedSigners.every(signerId => 
          wallet.compatibleSigners.includes(signerId)
        )
      )
      .map(w => w.id);
  };

  // 获取兼容的签名器列表
  const getCompatibleSigners = (): string[] => {
    if (!custodyData) return [];
    
    if (!state.selectedWallet) {
      // 没有选择钱包时，返回所有签名器（除了 none）
      return custodyData.hardwareSigners
        .filter(s => s.id !== 'none')
        .map(s => s.id);
    }
    
    // 返回与已选钱包兼容的签名器
    const wallet = custodyData.softwareWallets.find(w => w.id === state.selectedWallet);
    if (!wallet) return [];
    
    return wallet.compatibleSigners.filter(id => id !== 'none');
  };

  // 获取兼容的节点列表
  const getCompatibleNodes = (): string[] => {
    if (!custodyData) return [];
    
    if (!state.selectedWallet) {
      return [];
    }
    
    const wallet = custodyData.softwareWallets.find(w => w.id === state.selectedWallet);
    if (!wallet) return [];
    
    return wallet.compatibleNodes;
  };

  if (isLoading || !custodyData) {
    return (
      <div className="multisig-page">
        <div className="multisig-loading">加载中...</div>
      </div>
    );
  }

  return (
    <div className="multisig-page">
      <MultisigHeader 
        completionPercentage={getCompletionPercentage()}
        onNavigateBack={() => navigate('/')}
      />
      
      <div className="multisig-content">
        <ThresholdSelector 
          value={state.threshold}
          onChange={handleThresholdChange}
        />
        
        <div className="multisig-columns">
          <SignerColumn
            signerSlots={state.signerSlots}
            custodyData={custodyData}
            compatibleSigners={getCompatibleSigners()}
            onSignerSelect={handleSignerSelect}
          />
          
          <TransferMethodDisplay
            signerSlots={state.signerSlots}
            selectedWallet={state.selectedWallet}
            custodyData={custodyData}
          />
          
          <WalletColumn
            selectedWallet={state.selectedWallet}
            custodyData={custodyData}
            compatibleWallets={getCompatibleWallets()}
            onWalletSelect={handleWalletSelect}
          />
          
          <NodeColumn
            selectedNode={state.selectedNode}
            custodyData={custodyData}
            compatibleNodes={getCompatibleNodes()}
            onNodeSelect={handleNodeSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default MultisigPage;
