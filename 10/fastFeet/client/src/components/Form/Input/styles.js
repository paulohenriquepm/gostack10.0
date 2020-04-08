import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #444;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 12px 15px;
    color: #666;
    transition: border-color 0.2;
    margin-bottom: 10px;

    &:focus {
      border-color: #7d40e7;
    }
  }

  span {
    color: #de3b3b;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 12px;
  }
`;
