import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const ComingSoon = styled.div`
  text-align: center;
  color: #6b7280;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 0;
`;

export const Login: React.FC = () => {
  return (
    <PageContainer>
      <ComingSoon>
        <Title>Login</Title>
        <Description>Login page coming soon...</Description>
      </ComingSoon>
    </PageContainer>
  );
};
