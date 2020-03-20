import styled from 'styled-components';

const Details = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  padding: 15px;
  background: #fff;
  box-shadow: 10px 10px 10px 10000px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 3;

  button {
    border: none;
    background: none;
    display: flex;
    justify-content: flex-end;
  }

  div {
    display: flex;
    flex-direction: column;

    & + div {
      margin-top: 15px;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }

    strong {
      margin-bottom: 10px;
      color: #444;
    }

    span {
      color: #666;
    }
  }
`;

export default Details;
