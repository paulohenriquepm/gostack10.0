import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Scroll = styled(PerfectScrollbar)`
  max-height: ${props => `${props.height - 300}px`};
  padding: 8px 15px;
  display: block;

  .problemId,
  .orderId,
  .product {
    width: 10%;
  }

  .description {
    width: 70%;
  }
`;

export const Tr = styled.tr`
  &,
  td {
    opacity: ${props => (props.canceled ? '0.7' : '1')};
  }
`;
