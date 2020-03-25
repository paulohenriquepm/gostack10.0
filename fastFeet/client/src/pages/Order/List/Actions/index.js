import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import api from '~/services/api';

import { TableAction } from '~/components/Table';

import { Container } from './styles';

export default function Actions({
  page,
  handleDetails,
  order,
  id,
  confirmDelete,
}) {
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
          <button type="button" onClick={() => handleDetails(order)}>
            <MdVisibility size={18} color="#8E5BE8" />
            Visualizar
          </button>
        </div>

        <div>
          <Link to={`/${page}`}>
            <MdCreate size={18} color="#4D85EE" />
            Editar
          </Link>
        </div>

        <div>
          <button type="button" onClick={() => confirmDelete(id)}>
            <MdDeleteForever size={18} color="#DE3B3B" />
            Excluir
          </button>
        </div>
      </TableAction>
    </Container>
  );
}

Actions.propTypes = {
  page: PropTypes.string.isRequired,
  handleDetails: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  order: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  id: PropTypes.number.isRequired,
};
