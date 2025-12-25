import React from 'react';
import { UserPreference, ComponentState, CustodyData } from '../types';
import ComponentColumn from './ComponentColumn';
import ColumnTitle from './ColumnTitle';
import BottomFeatureDock from './BottomFeatureDock';
import TransferMethodDisplay from './singlesig/TransferMethodDisplay';
import WalletNodeArrows from './singlesig/WalletNodeArrows';
import './singlesig/SinglesigStyles.css';

// 列标题常量（写死文案）
const COLUMN_TITLES = {
  signer: '硬件签名器',
  wallet: '软件钱包',
  node: '区块链节点',
} as const;

interface MainLayoutProps {
  userPreference: UserPreference | null;
  selectedSigners: string[];
  selectedWallet: string | null;
  selectedNode: string | null;
  getComponentState: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
  custodyData: CustodyData;
  onLayoutMeasured?: (bounds: { leftEdge: number; rightEdge: number }) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  userPreference,
  selectedSigners,
  selectedWallet,
  selectedNode,
  getComponentState,
  onComponentClick,
  custodyData,
  onLayoutMeasured
}) => {
  if (!userPreference) {
    return (
      <main className="main-layout loading">
        <div className="loading-message">
          正在加载...
        </div>
      </main>
    );
  }

  // 判断是否选择了"不使用签名器"
  const isNoSignerSelected = (): boolean => {
    return selectedSigners.includes('none');
  };

  const signerColumnRef = React.useRef<HTMLDivElement>(null);
  const walletColumnRef = React.useRef<HTMLDivElement>(null);
  const nodeColumnRef = React.useRef<HTMLDivElement>(null);
  const layoutRef = React.useRef<HTMLDivElement>(null);

  // 布局测量
  React.useLayoutEffect(() => {
    const measure = () => {
      const layoutRect = layoutRef.current?.getBoundingClientRect();
      const signerRect = signerColumnRef.current?.getBoundingClientRect();
      const nodeRect = nodeColumnRef.current?.getBoundingClientRect();
      
      if (onLayoutMeasured && layoutRect && signerRect && nodeRect) {
        onLayoutMeasured({
          leftEdge: signerRect.left,
          rightEdge: nodeRect.right
        });
      }
    };

    measure();
    window.addEventListener('resize', measure);
    
    // 字体加载后重新测量
    if ((document as any).fonts && (document as any).fonts.ready) {
      (document as any).fonts.ready.then(() => measure()).catch(() => {});
    }

    return () => {
      window.removeEventListener('resize', measure);
    };
  }, [onLayoutMeasured]);

  // 对硬件签名器列表进行排序，确保"不使用签名器"始终在最后
  const sortedHardwareSigners = [...custodyData.hardwareSigners].sort((a, b) => {
    if (a.id === 'none' && b.id !== 'none') return 1;
    if (b.id === 'none' && a.id !== 'none') return -1;
    return 0;
  });

  // 计算列宽度用于 BottomFeatureDock
  const [columnMetrics, setColumnMetrics] = React.useState<{
    centers: { signer?: number; wallet?: number; node?: number };
    columnWidths: { signer?: number; wallet?: number; node?: number };
    layoutLeft: number;
  }>({
    centers: {},
    columnWidths: {},
    layoutLeft: 0
  });

  React.useLayoutEffect(() => {
    const measure = () => {
      const layoutRect = layoutRef.current?.getBoundingClientRect();
      const signerRect = signerColumnRef.current?.getBoundingClientRect();
      const walletRect = walletColumnRef.current?.getBoundingClientRect();
      const nodeRect = nodeColumnRef.current?.getBoundingClientRect();
      
      if (layoutRect && signerRect && walletRect && nodeRect) {
        setColumnMetrics({
          centers: {
            signer: Math.round(signerRect.left - layoutRect.left + signerRect.width / 2),
            wallet: Math.round(walletRect.left - layoutRect.left + walletRect.width / 2),
            node: Math.round(nodeRect.left - layoutRect.left + nodeRect.width / 2),
          },
          columnWidths: {
            signer: Math.round(signerRect.width),
            wallet: Math.round(walletRect.width),
            node: Math.round(nodeRect.width),
          },
          layoutLeft: layoutRect.left
        });
      }
    };

    measure();
    window.addEventListener('resize', measure);
    
    const ro = new ResizeObserver(() => measure());
    [signerColumnRef.current, walletColumnRef.current, nodeColumnRef.current].forEach(el => {
      if (el) ro.observe(el);
    });

    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, []);

  return (
    <main className="main-layout">
      <div className="singlesig-layout-container" ref={layoutRef}>
        {/* 硬件签名器列 */}
        <div className="singlesig-column-wrapper" ref={signerColumnRef}>
          <ColumnTitle title={COLUMN_TITLES.signer} />
          <ComponentColumn
            components={sortedHardwareSigners}
            selectedComponents={selectedSigners}
            getComponentState={(id: string) => getComponentState(id, 'signer')}
            onComponentClick={(id: string) => onComponentClick(id, 'signer')}
            type="signer"
          />
        </div>

        {/* 签名器 ↔ 钱包 传输方式区域 */}
        <TransferMethodDisplay
          selectedSigners={selectedSigners}
          selectedWallet={selectedWallet}
          custodyData={custodyData}
        />

        {/* 软件钱包列 */}
        <div className="singlesig-column-wrapper" ref={walletColumnRef}>
          <ColumnTitle 
            title={COLUMN_TITLES.wallet}
            icon={userPreference.deviceType === 'mobile' ? '📱' : '💻'}
          />
          <ComponentColumn
            components={custodyData.softwareWallets}
            selectedComponents={selectedWallet ? [selectedWallet] : []}
            getComponentState={(id: string) => getComponentState(id, 'wallet')}
            onComponentClick={(id: string) => onComponentClick(id, 'wallet')}
            type="wallet"
          />
        </div>

        {/* 钱包 ↔ 节点 数据流箭头区域 */}
        <WalletNodeArrows
          hasWallet={selectedWallet !== null}
          hasNode={selectedNode !== null}
        />

        {/* 区块链节点列 */}
        <div className="singlesig-column-wrapper" ref={nodeColumnRef}>
          <ColumnTitle title={COLUMN_TITLES.node} />
          <ComponentColumn
            components={custodyData.nodes}
            selectedComponents={selectedNode ? [selectedNode] : []}
            getComponentState={(id: string) => getComponentState(id, 'node')}
            onComponentClick={(id: string) => onComponentClick(id, 'node')}
            type="node"
          />
        </div>
      </div>

      <BottomFeatureDock
        centers={columnMetrics.centers}
        columnWidths={columnMetrics.columnWidths}
        layoutLeft={columnMetrics.layoutLeft}
        selectedSigners={selectedSigners}
        selectedWallet={selectedWallet}
        selectedNode={selectedNode}
        custodyData={custodyData}
      />
    </main>
  );
};

export default MainLayout;
