import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import { MdMoreHoriz, MdCreate, MdDeleteForever } from 'react-icons/md';

import api from '~/services/api';

import { TableAction } from '~/components/Table';

import { Container } from './styles';

export default function Actions({ page, id, deliverymans, setDeliverymans }) {
  const [visible, setVisible] = useState(false);

  function handleTogglePopUp() {
    setVisible(!visible);
  }

  async function handleDelete() {
    try {
      await api.delete(`deliverymans/${id}`);

      const listFilter = deliverymans.filter(l => l.id !== id);

      setDeliverymans(listFilter);

      toast.success('Entregador deletado com sucesso!');
    } catch (err) {
      toast.error('Erro ao deletar entregador');
    }
  }

  function confirmDelete() {
    confirmAlert({
      title: 'Alerta',
      message: `Tem certeza que deseja deletar o entregador ${id}?`,
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
  deliveryman: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  id: PropTypes.number.isRequired,
  deliverymans: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  setDeliverymans: PropTypes.func.isRequired,
};
