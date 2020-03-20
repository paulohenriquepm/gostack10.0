import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => `${props.visible ? 'block' : 'none'}`};
  position: absolute;
  height: 100%;
  top: 65px;
  left: 0;
  width: 100%;
  background: #444;
  z-index: 2;
  opacity: 0.7;
`;
