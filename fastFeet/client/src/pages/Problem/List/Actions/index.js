import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md';

import { TableAction } from '~/components/Table';

import { Container } from './styles';

export default function Actions({ handleDetails, problem, id, confirmDelete }) {
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
          <button type="button" onClick={() => handleDetails(problem)}>
            <MdVisibility size={18} color="#8E5BE8" />
            Visualizar
          </button>
        </div>

        <div>
          <button type="button" onClick={() => confirmDelete(id)}>
            <MdDeleteForever size={18} color="#DE3B3B" />
            Cancelar
          </button>
        </div>
      </TableAction>
    </Container>
  );
}

Actions.propTypes = {
  handleDetails: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  problem: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  id: PropTypes.number.isRequired,
};
