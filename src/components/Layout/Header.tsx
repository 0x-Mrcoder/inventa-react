import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import { Bell, Search, User, Settings } from 'lucide-react';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 20px 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px 16px 10px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  font-size: 14px;
  width: 300px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #9ca3af;
  display: flex;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  border-radius: 10px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(16, 185, 129, 0.2);
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
`;

const UserRole = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { state } = useApp();

  return (
    <HeaderContainer>
      <HeaderLeft>
        <PageTitle>{title}</PageTitle>
        <PageSubtitle>{subtitle}</PageSubtitle>
      </HeaderLeft>
      
      <HeaderRight>
        <SearchContainer>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput placeholder="Search..." />
        </SearchContainer>
        
        <ActionButtons>
          <IconButton>
            <Bell size={20} />
            <NotificationBadge />
          </IconButton>
          
          <IconButton>
            <Settings size={20} />
          </IconButton>
          
          <UserProfile>
            <UserAvatar>
              {state.user?.name?.charAt(0) || 'U'}
            </UserAvatar>
            <UserInfo>
              <UserName>{state.user?.name || 'User'}</UserName>
              <UserRole>{state.user?.role || 'Owner'}</UserRole>
            </UserInfo>
          </UserProfile>
        </ActionButtons>
      </HeaderRight>
    </HeaderContainer>
  );
};
