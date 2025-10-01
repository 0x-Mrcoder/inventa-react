import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const Container = styled.div<{ sidebarCollapsed: boolean }>`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const MainContent = styled.main<{ sidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: ${props => props.sidebarCollapsed ? '80px' : '250px'};
  transition: margin-left 0.3s ease;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px 0 0 20px;
  overflow: hidden;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    margin-left: 0;
    border-radius: 0;
  }
`;

interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const { state } = useApp();
  
  return (
    <Container sidebarCollapsed={state.sidebarCollapsed}>
      <MainContent sidebarCollapsed={state.sidebarCollapsed}>
        {children}
      </MainContent>
    </Container>
  );
};
