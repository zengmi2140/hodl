import React, { useState, useRef } from 'react';
import { CustodyData, ComponentState, Feature } from '../../types';
import MobileFeatureSheet from './MobileFeatureSheet';

interface MobileNodeCardProps {
  selectedNode: string | null;
  custodyData: CustodyData;
  compatibleNodes: string[];
  // For single-sig mode
  getComponentState?: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick?: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
  // For multi-sig mode
  onNodeSelect?: (nodeId: string | null) => void;
}

const MobileNodeCard: React.FC<MobileNodeCardProps> = ({
  selectedNode,
  custodyData,
  compatibleNodes,
  getComponentState,
  onComponentClick,
  onNodeSelect,
}) => {
  const cardEndRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [featureSheetOpen, setFeatureSheetOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

  const handleInfoClick = (e: React.MouseEvent, features: Feature[]) => {
    e.stopPropagation();
    setSelectedFeatures(features);
    setFeatureSheetOpen(true);
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      cardEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleNodeClick = (nodeId: string) => {
    // Single-sig mode
    if (getComponentState && onComponentClick) {
      const state = getComponentState(nodeId, 'node');
      if (state !== 'inactive') {
        const wasSelected = selectedNode === nodeId;
        onComponentClick(nodeId, 'node');
        // Only scroll if selecting (not deselecting)
        if (!wasSelected) {
          scrollToEnd();
        }
      }
    }
    // Multi-sig mode
    else if (onNodeSelect) {
      if (selectedNode === nodeId) {
        onNodeSelect(null);
        // Don't scroll on deselect
      } else if (compatibleNodes.includes(nodeId)) {
        onNodeSelect(nodeId);
        scrollToEnd();
      }
    }
  };

  const getNodeState = (nodeId: string): ComponentState => {
    if (getComponentState) {
      return getComponentState(nodeId, 'node');
    }
    // Multi-sig mode
    if (selectedNode === nodeId) return 'active';
    if (!compatibleNodes.includes(nodeId)) return 'inactive';
    return 'breathing';
  };

  const selectedNodeData = selectedNode
    ? custodyData.nodes.find(n => n.id === selectedNode)
    : null;

  return (
    <>
      <div className="mobile-card">
        <div className="mobile-card-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="mobile-card-title">
            <span className="mobile-card-title-icon">🌐</span>
            区块链节点
            {selectedNodeData && (
              <span className="mobile-card-selected-badge">{selectedNodeData.name}</span>
            )}
          </div>
          <span className={`mobile-card-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </div>
        <div className={`mobile-card-body ${isExpanded ? 'expanded' : ''}`}>
          <div className="mobile-card-content">
            {custodyData.nodes.map(node => {
              const state = getNodeState(node.id);
              const isSelected = selectedNode === node.id;

              return (
                <div
                  key={node.id}
                  className={`mobile-option-item ${state} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <img src={node.logo} alt={node.name} className="mobile-option-logo" loading="lazy" decoding="async" />
                  <span className="mobile-option-name">{node.name}</span>
                  {isSelected && <span className="mobile-option-check">✓</span>}
                  {node.features.length > 0 && (
                    <span
                      className="mobile-option-info"
                      onClick={(e) => handleInfoClick(e, node.features)}
                    >
                      i
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={cardEndRef} style={{ scrollMarginTop: '110px' }} />
          </div>
        </div>
      </div>

      <MobileFeatureSheet
        isOpen={featureSheetOpen}
        onClose={() => setFeatureSheetOpen(false)}
        featureGroups={[{ title: '节点特性', features: selectedFeatures }]}
      />
    </>
  );
};

export default MobileNodeCard;
