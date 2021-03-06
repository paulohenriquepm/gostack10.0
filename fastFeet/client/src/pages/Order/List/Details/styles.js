import styled from 'styled-components';

export const Container = styled.div`
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

  svg {
    align-self: flex-end;

    &:hover {
      cursor: pointer;
    }
  }

  form {
    padding: 15px;

    div {
      display: flex;
      flex-direction: column;

      & + div {
        margin-top: 15px;
        border-top: 1px solid #eee;
        padding-top: 15px;
      }
    }

    strong {
      margin-bottom: 15px;
      color: #444;
    }

    span {
      color: #666;
    }

    img {
      height: 100px;
      max-width: 400px;
    }
  }

  input {
    border: none;
    background: none;
  }
`;

export const Date = styled.div`
  flex-direction: row !important;
  margin-top: 0 !important;
  border-top: 0 !important;
  padding-top: 0 !important;

  input {
    margin-left: 5px;
  }
`;
