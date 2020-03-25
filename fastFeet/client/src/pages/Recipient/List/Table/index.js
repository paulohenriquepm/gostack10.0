import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../Actions';

import { Scroll } from './styles';
import { TableContainer } from '~/components/Table';

export default function Table({ height, recipients, setRecipients }) {
  return (
    <>
      <Scroll height={height} options={{ suppressScrollX: true }}>
        <TableContainer>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map(recipientItem => (
              <tr key={String(recipientItem.id)}>
                <td>{recipientItem.id}</td>
                <td>{recipientItem.name}</td>
                <td>
                  {recipientItem.street}, {recipientItem.number},{' '}
                  {recipientItem.city} - {recipientItem.state}
                </td>
                <Actions
                  page={`recipients/edit/${recipientItem.id}`}
                  id={recipientItem.id}
                  recipients={recipients}
                  setRecipients={setRecipients}
                />
              </tr>
            ))}
          </tbody>
        </TableContainer>
      </Scroll>
    </>
  );
}

Table.propTypes = {
  height: PropTypes.number.isRequired,
  recipients: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setRecipients: PropTypes.func.isRequired,
};
