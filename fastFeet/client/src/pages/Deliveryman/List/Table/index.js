import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../Actions';

import { Scroll } from './styles';
import { TableContainer } from '~/components/Table';

export default function Table({ height, deliverymans, setDeliverymans }) {
  return (
    <>
      <Scroll height={height} options={{ suppressScrollX: true }}>
        <TableContainer>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliverymans.map(deliverymanItem => (
              <tr key={String(deliverymanItem.id)}>
                <td>{deliverymanItem.id}</td>
                <td>
                  {deliverymanItem.avatar ? (
                    <img src={deliverymanItem.avatar.url} alt="avatar" />
                  ) : (
                    'AVATAR'
                  )}
                </td>
                <td>{deliverymanItem.name}</td>
                <td>{deliverymanItem.email}</td>
                <Actions
                  page={`deliverymans/edit/${deliverymanItem.id}`}
                  order={deliverymanItem}
                  id={deliverymanItem.id}
                  deliverymans={deliverymanItem}
                  setDeliverymans={setDeliverymans}
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
  deliverymans: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setDeliverymans: PropTypes.func.isRequired,
};
