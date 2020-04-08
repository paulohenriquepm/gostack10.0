import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Scroll = styled(PerfectScrollbar)`
  max-height: ${props => `${props.height - 300}px`};
  padding: 8px 15px;
  display: block;
`;

export const Status = styled.td`
  span {
    background: ${props => props.status.background} !important;
    color: ${props => props.status.color} !important;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    padding: 3px 7px 3px 25px;
    border-radius: 12px;

    &:before {
      content: '';
      position: absolute;
      height: 10px;
      width: 10px;
      left: 8px;
      top: 8px;
      background: ${props => props.status.color};
      border-radius: 50%;
    }
  }
`;
