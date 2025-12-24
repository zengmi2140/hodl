import React, { useState } from 'react';
import { CustodyData } from '../../types';
import FeatureTooltip from './FeatureTooltip';

interface NodeColumnProps {
  selectedNode: string | null;
  custodyData: CustodyData;
  compatibleNodes: string[];
  onNodeSelect: (nodeId: string | null) => void;
}

const NodeColumn: React.FC<NodeColumnProps> = ({
  selectedNode,
  custodyData,
  compatibleNodes,
  onNodeSelect,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    if (selectedNode === nodeId) {
      onNodeSelect(null);
    } else if (compatibleNodes.includes(nodeId)) {
      onNodeSelect(nodeId);
    }
  };

  return (
    <div className="multisig-column">
      <div className="multisig-column-title">区块链节点</div>
      {custodyData.nodes.map(node => {
        const isCompatible = compatibleNodes.includes(node.id);
        const isSelected = selectedNode === node.id;
        
        return (
          <div
            key={node.id}
            className={`multisig-item ${isCompatible ? 'compatible' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => handleNodeClick(node.id)}
            style={{ position: 'relative' }}
          >
            <img
              src={node.logo}
              alt={node.name}
              className="multisig-item-logo"
            />
            <span className="multisig-item-name">{node.name}</span>
            <div
              className="multisig-item-info"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              i
            </div>
            {hoveredNode === node.id && (
              <FeatureTooltip features={node.features} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NodeColumn;
