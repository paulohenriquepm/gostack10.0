import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #7d40e7;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;
  padding: 60px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 250px;
    height: 44px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 40px;

    label {
      align-self: flex-start;
      margin-bottom: 10px;
      font-weight: bold;
      color: #444;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      margin: 0 0 15px;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      font-weight: bold;
      margin: 0 0 10px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7D40E7')};
      }
    }
  }
`;
