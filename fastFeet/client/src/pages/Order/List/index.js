import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useWindowSize } from '@react-hook/window-size';

import { HeaderList } from '~/components/ActionHeader';
import Pagination from '~/components/Pagination';
import Details from './Details';
import Table from './Table';

import api from '~/services/api';

export default function OrderList() {
  const [, height] = useWindowSize();

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [totalDocs, setTotalDocs] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get('/orders', {
          params: {
            page: currentPage,
          },
        });

        if (!response.data.docs) {
          toast.warn('Nenhum dado foi encontrado');
        }

        const data = response.data.docs.map(order => ({
          ...order,
          street_number: `${order.recipient.street}, ${order.recipient.number}`,
          city_state: `${order.recipient.city} - ${order.recipient.state}`,
        }));

        setOrders(data);
        setPages(response.data.pages);
        setTotalDocs(response.data.total);
      } catch (err) {
        toast.error('Falha ao buscar dados');
      }
    }

    loadOrders();
  }, [currentPage]);

  function handleVisible() {
    setVisible(!visible);
  }

  function handleDetails(item) {
    setOrder(item);
    handleVisible();
  }

  function handlePage(page) {
    if (page === 0) {
      setCurrentPage(1);
    } else if (page > pages) {
      setCurrentPage(pages);
    } else {
      setCurrentPage(page);
    }
  }

  return (
    <>
      <HeaderList page="orders/new" title="encomendas" visible />
      <Table height={height} orders={orders} handleDetails={handleDetails} />
      <Details visible={visible} order={order} handleVisible={handleVisible} />
      <Pagination
        currentPage={currentPage}
        pages={pages}
        totalDocs={totalDocs}
        handlePage={handlePage}
      />
    </>
  );
}
