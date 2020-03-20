import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useWindowSize } from '@react-hook/window-size';

import { HeaderList } from '~/components/ActionHeader';
import Details from './Details';
import Table from './Table';

import api from '~/services/api';

export default function OrderList() {
  const [, height] = useWindowSize();

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

        const data = response.data.map(order => ({
          ...order,
          street_number: `${order.recipient.street}, ${order.recipient.number}`,
          city_state: `${order.recipient.city} - ${order.recipient.state}`,
        }));

        setOrders(data);
      } catch (err) {
        toast.error('Falha ao buscar dados');
      }
    }

    loadOrders();
  }, []);

  function handleVisible() {
    setVisible(!visible);
  }

  function handleDetails(item) {
    setOrder(item);
    handleVisible();
  }

  return (
    <>
      <HeaderList page="orders/new" title="encomendas" visible />
      <Table height={height} orders={orders} handleDetails={handleDetails} />
      <Details visible={visible} order={order} handleVisible={handleVisible} />
    </>
  );
}
