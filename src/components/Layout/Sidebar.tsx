import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { themes } from '../../styles/theme';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings,
  History,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SidebarContainer = styled.aside<{ collapsed: boolean; theme: string }>`
  position: fixed;
  left: 0;
  top: 0;
  width: ${props => props.collapsed ? '80px' : '250px'};
  height: 100vh;
  background: linear-gradient(135deg, ${props => themes[props.theme as keyof typeof themes].primary} 0%, ${props => themes[props.theme as keyof typeof themes].secondary} 100%);
  transition: width 0.3s ease;
  z-index: 1000;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: ${props => props.collapsed ? '0' : '250px'};
    transform: ${props => props.collapsed ? 'translateX(-100%)' : 'translateX(0)'};
  }
`;

const SidebarHeader = styled.div<{ collapsed: boolean }>`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'space-between'};
`;

const Logo = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-weight: 700;
  font-size: 20px;
  
  ${props => props.collapsed && `
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
  `}
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Nav = styled.nav`
  padding: 16px 0;
`;

const NavItem = styled(Link)<{ active?: boolean; collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  
  ${props => props.active && `
    background: rgba(255, 255, 255, 0.1);
    box-shadow: -4px 0 0 white;
  `}
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  ${props => props.collapsed && `
    justify-content: center;
    padding: 12px;
    
    span {
      display: none;
    }
  `}
`;

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const NavText = styled.span<{ collapsed: boolean }>`
  font-weight: 500;
  transition: opacity 0.2s ease;
  
  ${props => props.collapsed && `
    opacity: 0;
    width: 0;
    overflow: hidden;
  `}
`;

const Tooltip = styled.div<{ collapsed: boolean; show: boolean }>`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  opacity: ${props => props.collapsed && props.show ? 1 : 0};
  pointer-events: none;
  transition: opacity 0.2s ease;
  margin-left: 8px;
  
  &::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    border: 4px solid transparent;
    border-right-color: rgba(0, 0, 0, 0.8);
  }
`;

interface SidebarProps {
  currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const { state, actions } = useApp();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/sales', icon: ShoppingCart, label: 'Sell Items' },
    { path: '/inventory', icon: Package, label: 'Stock Items' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/credit', icon: CreditCard, label: 'Sale History' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <SidebarContainer collapsed={state.sidebarCollapsed} theme={state.theme}>
      <SidebarHeader collapsed={state.sidebarCollapsed}>
        <Logo collapsed={state.sidebarCollapsed}>
          <div>I</div>
          {!state.sidebarCollapsed && <span>Inventa</span>}
        </Logo>
        <ToggleButton onClick={actions.toggleSidebar}>
          {state.sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </ToggleButton>
      </SidebarHeader>
      
      <Nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <NavItem
              key={item.path}
              to={item.path}
              active={isActive}
              collapsed={state.sidebarCollapsed}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <NavIcon>
                <Icon size={20} />
              </NavIcon>
              <NavText collapsed={state.sidebarCollapsed}>{item.label}</NavText>
              <Tooltip collapsed={state.sidebarCollapsed} show={hoveredItem === item.path}>
                {item.label}
              </Tooltip>
            </NavItem>
          );
        })}
      </Nav>
    </SidebarContainer>
  );
};
