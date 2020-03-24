import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 2px dashed #ddd;
      border-radius: 50%;
      padding: 30px;

      strong {
        color: #ccc;
      }
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
