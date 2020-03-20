import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import { TableAction } from '~/components/Table';

import { Container } from './styles';

export default function Actions({ page }) {
  const [visible, setVisible] = useState(false);

  function handleTogglePopUp() {
    setVisible(!visible);
  }

  return (
    <Container>
      <button type="button" onClick={() => handleTogglePopUp()}>
        <MdMoreHoriz size={22} color="#c6c6c6" />
      </button>
      <TableAction visible={visible}>
        <div>
          <Link to={`/${page}`}>
            <MdCreate size={18} color="#4D85EE" />
            Editar
          </Link>
        </div>

        <div>
          <button type="button">
            <MdDeleteForever size={18} color="#DE3B3B" />
            Excluir
          </button>
        </div>
      </TableAction>
    </Container>
  );
}

TableAction.propTypes = {
  page: PropTypes.string.isRequired,
};
