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
  orders,
  setOrders,
}) {
  const [visible, setVisible] = useState(false);

  function handleTogglePopUp() {
    setVisible(!visible);
  }

  async function handleDelete() {
    try {
      await api.delete(`orders/${id}`);

      const listFilter = orders.filter(l => l.id !== id);

      setOrders(listFilter);

      toast.success('Encomenda deletada com sucesso!');
    } catch (err) {
      toast.error('Erro ao deletar encomenda');
    }
  }

  function confirmDelete() {
    confirmAlert({
      title: 'Alerta',
      message: `Tem certeza que deseja deletar a encomenda ${id}?`,
      closeOnEscape: false,
      closeOnClickOutside: false,
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(),
        },
        {
          label: 'Não',
        },
      ],
    });
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
          <button type="button" onClick={() => confirmDelete()}>
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
  order: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  id: PropTypes.number.isRequired,
  orders: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  setOrders: PropTypes.func.isRequired,
};
