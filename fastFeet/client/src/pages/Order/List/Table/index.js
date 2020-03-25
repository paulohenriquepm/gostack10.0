import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../Actions';

import { Scroll, Status } from './styles';
import { TableContainer } from '~/components/Table';

export default function Table({
  height,
  orders,
  handleDetails,
  confirmDelete,
  setOrders,
}) {
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
                <td>
                  <div>
                    {orderItem.deliveryman.avatar ? (
                      <img
                        src={orderItem.deliveryman.avatar.url}
                        alt="avatar"
                      />
                    ) : (
                      <img
                        src={`https://avatar.oxro.io/avatar?name=${orderItem.deliveryman.name}`}
                        alt="Avatar"
                      />
                    )}

                    {orderItem.deliveryman.name}
                  </div>
                </td>
                <td>{orderItem.recipient.city}</td>
                <td>{orderItem.recipient.state}</td>
                <Status status={orderItem.status}>
                  <span>{orderItem.status.text}</span>
                </Status>
                <Actions
                  page={`orders/edit/${orderItem.id}`}
                  handleDetails={handleDetails}
                  order={orderItem}
                  id={orderItem.id}
                  orders={orders}
                  setOrders={setOrders}
                  confirmDelete={confirmDelete}
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
