import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  h1 {
    margin-bottom: 34px;
    color: #444;
    font-size: 24px;
  }

  div {
    display: ${props => (props.visible ? 'flex' : 'none')};
    justify-content: space-between;
  }

  main {
    display: flex;

    button {
      display: ${props => (props.visible ? 'flex' : 'none')};
      margin-left: 10px;
      background: #7d40e7;
      color: #fff;
      border: 0;
      font-size: 14px;
      padding: 0 10px;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }

  a {
    background: #7d40e7;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    height: 36px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#7d40e7')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;

export const Search = styled.div`
  position: relative;

  input {
    width: 240px;
    padding: 10px 40px;
    border-radius: 4px;
    border: 1px solid #ddd;

    &::placeholder {
      color: #999;
    }
  }

  svg {
    position: absolute;
    top: 11px;
    left: 15px;
  }
`;
