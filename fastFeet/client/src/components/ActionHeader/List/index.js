import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MdSearch, MdAdd } from 'react-icons/md';
import { Container, Search } from './styles';

export default function ActionHeader({
  page,
  title,
  visible,
  filter,
  search,
  setSearch,
  handleFilter,
}) {
  return (
    <Container visible={visible} filter={filter}>
      <h1>Gerenciando {title}</h1>
      <div>
        <main>
          <Search>
            <MdSearch size={16} color="#999999" />
            <input
              type="text"
              placeholder={`Buscar por ${title}`}
              value={search}
              onChange={e => [setSearch(e.target.value)]}
            />
          </Search>

          <button type="button" onClick={() => handleFilter()}>
            Listar somente entregas com problemas
          </button>
        </main>

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
  visible: PropTypes.bool.isRequired,
  filter: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
