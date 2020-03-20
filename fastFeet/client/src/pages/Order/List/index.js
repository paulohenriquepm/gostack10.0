import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer } from '~/components/Table';
import Actions from './Actions';
import Details from './Details';

import api from '~/services/api';

import { Scroll } from './styles';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get('/orders');

        if (!response.data) {
          toast.warn('Nenhum dado foi encontrado');
        }

        setOrders(response.data);
      } catch (err) {
        toast.error('Falha ao buscar dados');
      }
    }

    loadOrders();
  }, []);

  function handleDetails(order) {
    setVisible(!visible);
    setOrder(order);
  }

  return (
    <>
      <HeaderList page="orders/new" title="encomendas" visible />
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
          {orders.map(order => (
            <tr key={String(order.id)}>
              <td>{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>{order.deliveryman.name}</td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>Entregue</td>
              <Actions
                page={`orders/edit/${order.id}`}
                handleDetails={handleDetails}
                order={order}
              />
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <Details visible={visible} order={order} handleDetails={handleDetails} />
    </>
  );
}
