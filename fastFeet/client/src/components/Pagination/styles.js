import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 15px;

  div {
    color: #444;
  }

  aside {
    display: flex;
    align-items: center;

    button {
      background: #7d40e7;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;

      & + button {
        margin-left: 5px;
      }

      &:hover {
        opacity: 0.7;
      }
    }

    span {
      color: #444;
      font-size: 16px;
      margin: 0 10px;
      font-weight: bold;
    }
  }
`;
