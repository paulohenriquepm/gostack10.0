import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0px 30px;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      width: 135px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #ddd;
    }

    a {
      color: #999;
      transition: color 0.2s;

      & + a {
        margin-left: 15px;
      }

      &:hover {
        color: #444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    strong {
      color: #444;
      font-weight: bold;
      margin-bottom: 5px;
    }

    button {
      background: none;
      border: 0;
      color: #de3b3b;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
