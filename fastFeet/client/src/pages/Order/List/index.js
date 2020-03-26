import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useWindowSize } from '@react-hook/window-size';
import { format, parseISO } from 'date-fns';
import { confirmAlert } from 'react-confirm-alert';

import { HeaderList } from '~/components/ActionHeader';
import Pagination from '~/components/Pagination';
import Details from './Details';
import { TableLoading } from '~/components/Table';
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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const getFormattedStatus = item => {
    let status = {};
    if (item.canceled_at) {
      status = { text: 'CANCELADA', background: '#FAB0B0', color: '#DE3B3B' };
      return status;
    }
    if (item.end_date) {
      status = { text: 'ENTREGUE', background: '#DFF0DF', color: '#2CA42B' };
      return status;
    }
    if (item.start_date) {
      status = { text: 'RETIRADA', background: '#BAD2FF', color: '#4D85EE' };
      return status;
    }
    status = { text: 'PENDENTE', background: '#F0F0DF', color: '#C1BC35' };
    return status;
  };

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

  async function handleDelete(id) {
    try {
      await api.delete(`orders/${id}`);

      toast.success('Encomenda deletada com sucesso!');
    } catch (err) {
      toast.error('Erro ao deletar encomenda');
    }
  }

  function confirmDelete(id) {
    confirmAlert({
      title: 'Alerta',
      message: `Tem certeza que deseja deletar a encomenda ${id}?`,
      closeOnEscape: false,
      closeOnClickOutside: false,
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Não',
        },
      ],
    });
  }

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get('/orders', {
          params: {
            page: currentPage,
            product: search,
          },
        });

        if (!response.data.docs) {
          toast.warn('Nenhum dado foi encontrado');
        }

        const data = response.data.docs.map(item => ({
          ...item,
          street_number: `${item.recipient.street}, ${item.recipient.number}`,
          city_state: `${item.recipient.city} - ${item.recipient.state}`,
          status: getFormattedStatus(item),
          start_date_formatted: item.start_date
            ? format(parseISO(item.start_date), 'dd/MM/yyyy')
            : null,
          end_date_formatted: item.end_date
            ? format(parseISO(item.end_date), 'dd/MM/yyyy')
            : null,
        }));

        setOrders(data);
        setPages(response.data.pages);
        setTotalDocs(response.data.total);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('Falha ao buscar dados');
      }
    }

    loadOrders();
  }, [currentPage, search]);

  return (
    <>
      <HeaderList
        page="orders/new"
        title="encomendas"
        search={search}
        setSearch={setSearch}
        visible
      />
      {loading ? (
        <TableLoading />
      ) : (
        <>
          <Table
            height={height}
            orders={orders}
            handleDetails={handleDetails}
            confirmDelete={confirmDelete}
            setOrders={setOrders}
          />
          <Details
            visible={visible}
            order={order}
            handleVisible={handleVisible}
          />
          <Pagination
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalDocs}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
