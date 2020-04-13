import React, { useState, useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { toast } from 'react-toastify';

import { HeaderList } from '~/components/ActionHeader';
import { TableLoading } from '~/components/Table';
import Pagination from '~/components/Pagination';

import Table from './Table';

import api from '~/services/api';

export default function DeliverymanList() {
  const [, height] = useWindowSize();

  const [deliverymans, setDeliverymans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [totalDocs, setTotalDocs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get('/deliverymans', {
          params: {
            page: currentPage,
            name: search,
          },
        });

        if (!response.data.docs) {
          toast.warn('Nenhum dado foi encontrado');
        }

        setDeliverymans(response.data.docs);
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
      <HeaderList
        page="deliverymans/new"
        title="entregadores"
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
            deliverymans={deliverymans}
            setDeliverymans={setDeliverymans}
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
