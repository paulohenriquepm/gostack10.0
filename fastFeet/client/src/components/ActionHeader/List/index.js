import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MdSearch, MdAdd } from 'react-icons/md';
import { Container, Search } from './styles';

export default function ActionHeader({ page, title }) {
  return (
    <Container>
      <h1>Gerenciando {title}</h1>
      <div>
        <Search>
          <MdSearch size={16} color="#999999" />
          <input type="text" placeholder={`Buscar por ${title}`} />
        </Search>

        <Link to={`/${page}`}>
          <MdAdd size={20} color="#FFF" />
          CADASTRAR
        </Link>
      </div>
    </Container>
  );
}

ActionHeader.propTypes = {
  page: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
