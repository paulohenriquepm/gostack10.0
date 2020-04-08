import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Container } from './styles';

export default function ActionForm({ id, prevPage, title }) {
  return (
    <Container>
      {id ? <h1>Edição de {title}</h1> : <h1>Cadastro de {title}</h1>}
      <div>
        <Link to={`${prevPage}`}>
          <MdChevronLeft size={20} color="#FFF" />
          VOLTAR
        </Link>
        <button type="submit">
          <MdCheck size={20} color="#FFF" />
          SALVAR
        </button>
      </div>
    </Container>
  );
}

ActionForm.propTypes = {
  id: PropTypes.string.isRequired,
  prevPage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
