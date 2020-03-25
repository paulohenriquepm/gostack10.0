import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Scroll = styled(PerfectScrollbar)`
  max-height: ${props => `${props.height - 300}px`};
  padding: 8px 15px;
  display: block;
`;
