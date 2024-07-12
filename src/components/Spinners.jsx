import React from "react";
import styled, { keyframes } from "styled-components";

const SpinnerMain = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner-inner">
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
        </div>
      </div>
    </div>
  );
};

const SpinnerButton = ({ color }) => {
  return (
    <SpinnerContainer>
      <Spinner color={color} />
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: ${(props) => (props.color ? props.color : "#66d8f5")};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 0.6s linear infinite;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export { SpinnerMain, SpinnerButton };
