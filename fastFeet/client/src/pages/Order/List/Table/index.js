import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../Actions';

import { Scroll } from './styles';
import { TableContainer } from '~/components/Table';

export default function Table({ height, orders, handleDetails, setOrders }) {
  return (
    <>
      <Scroll height={height} options={{ suppressScrollX: true }}>
        <TableContainer>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(orderItem => (
              <tr key={String(orderItem.id)}>
                <td>{orderItem.id}</td>
                <td>{orderItem.recipient.name}</td>
                <td>{orderItem.deliveryman.name}</td>
                <td>{orderItem.recipient.city}</td>
                <td>{orderItem.recipient.state}</td>
                <td>{orderItem.status.text}</td>
                <Actions
                  page={`orders/edit/${orderItem.id}`}
                  handleDetails={handleDetails}
                  order={orderItem}
                  id={orderItem.id}
                  orders={orders}
                  setOrders={setOrders}
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
  orders: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleDetails: PropTypes.func.isRequired,
  setOrders: PropTypes.func.isRequired,
};
