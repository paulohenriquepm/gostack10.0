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

  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [totalDocs, setTotalDocs] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleVisible() {
    setVisible(!visible);
  }

  function handleDetails(item) {
    setProblem(item);
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
      await api.delete(`/problem/${id}/cancel-delivery`);

      toast.success('Encomenda cancelada com sucesso!');
    } catch (err) {
      toast.error('Erro ao cancelar encomenda');
    }
  }

  function confirmDelete(id) {
    confirmAlert({
      title: 'Alerta',
      message: `Tem certeza que deseja cancelar a encomenda ${id}?`,
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
    async function loadProblems() {
      try {
        const response = await api.get('/delivery/problems', {
          params: {
            page: currentPage,
          },
        });

        if (!response.data.docs) {
          toast.warn('Nenhum dado foi encontrado');
        }

        setProblems(response.data.docs);
        setPages(response.data.pages);
        setTotalDocs(response.data.total);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('Falha ao buscar dados');
      }
    }

    loadProblems();
  }, [currentPage]);

  return (
    <>
      <HeaderList title="problemas na entrega" visible={false} />
      {loading ? (
        <TableLoading />
      ) : (
        <>
          <Table
            height={height}
            problems={problems}
            handleDetails={handleDetails}
            confirmDelete={confirmDelete}
            setProblems={setProblems}
          />
          <Details
            visible={visible}
            problem={problem}
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
