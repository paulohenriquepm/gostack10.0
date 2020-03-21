import React from 'react';
import PropTypes from 'prop-types';

import {
  MdFirstPage,
  MdChevronLeft,
  MdLastPage,
  MdChevronRight,
} from 'react-icons/md';

import { Container } from './styles';

export default function Pagination({
  currentPage,
  pages,
  totalDocs,
  handlePage,
}) {
  return (
    <Container>
      <div>{totalDocs} registros</div>
      <aside>
        <button type="button" onClick={() => handlePage(1)}>
          <MdFirstPage />
        </button>
        <button type="button" onClick={() => handlePage(currentPage - 1)}>
          <MdChevronLeft />
        </button>
        <span>
          {currentPage} / {pages}
        </span>
        <button type="button" onClick={() => handlePage(currentPage + 1)}>
          <MdChevronRight />
        </button>
        <button type="button" onClick={() => handlePage(pages)}>
          <MdLastPage />
        </button>
      </aside>
    </Container>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  totalDocs: PropTypes.number.isRequired,
  handlePage: PropTypes.func.isRequired,
};
