import React from 'react';
import { ComponentState } from '../types';
import '../components/singlesig/SinglesigStyles.css';

interface Component {
  id: string;
  name: string;
  logo: string;
}

interface ComponentColumnProps {
  components: Component[];
  selectedComponents: string[];
  getComponentState: (componentId: string) => ComponentState;
  onComponentClick: (componentId: string) => void;
  type: 'signer' | 'wallet' | 'node';
}

// 判断是否为emoji的函数
const isEmoji = (str: string): boolean => {
  // 简单的emoji检测：检查是否以/开头（图片路径）或包含常见emoji
  if (str.startsWith('/') || str.startsWith('http')) {
    return false; // 图片路径
  }
  
  // 检查是否包含常见emoji字符
  const commonEmojis = ['🔒', '❄️', '📱', '💳', '📦', '🚫', '🐦', '⚡', '💙', '🥋', '🟢', '🌿', '₿', '🔌', '🔗', '🌐', '💎', '🌱'];
  return commonEmojis.includes(str) || str.length <= 4;
};

// 渲染logo的函数
const renderLogo = (logo: string, componentId: string) => {
  // 特殊处理：不使用签名器始终使用emoji
  if (componentId === 'none') {
    return <span className="singlesig-item-logo-emoji">{logo}</span>;
  }
  
  // 判断是否为emoji
  if (isEmoji(logo)) {
    return <span className="singlesig-item-logo-emoji">{logo}</span>;
  }
  
  // 否则显示图片
  return (
    <img 
      src={logo} 
      alt="logo" 
      onError={(e) => {
        // 图片加载失败时显示默认emoji
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          const fallback = document.createElement('span');
          fallback.className = 'singlesig-item-logo-emoji';
          fallback.textContent = '🔧';
          parent.appendChild(fallback);
        }
      }}
    />
  );
};

const ComponentColumn = React.forwardRef<HTMLDivElement, ComponentColumnProps>(({ 
  components,
  selectedComponents,
  getComponentState,
  onComponentClick,
  type
}, ref) => {
  return (
    <div className="singlesig-column" ref={ref}>
      {components.map((component) => {
        const state = getComponentState(component.id);
        const isSelected = selectedComponents.includes(component.id);

        return (
          <div
            key={component.id}
            className={`singlesig-item ${state} ${isSelected ? 'active' : ''}`}
            onClick={() => onComponentClick(component.id)}
          >
            <div className="singlesig-item-logo">
              {renderLogo(component.logo, component.id)}
            </div>
            <div className="singlesig-item-name">
              {component.name}
            </div>
          </div>
        );
      })}
    </div>
  );
});

ComponentColumn.displayName = 'ComponentColumn';

export default ComponentColumn;
