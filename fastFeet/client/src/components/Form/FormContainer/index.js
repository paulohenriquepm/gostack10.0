import styled from 'styled-components';
import { Form } from '@unform/web';

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 900;
  margin: auto 270px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  section {
    background: #fff;
    border-radius: 4px;
    width: 100%;
    padding: 30px;
  }
`;

export default FormContainer;
