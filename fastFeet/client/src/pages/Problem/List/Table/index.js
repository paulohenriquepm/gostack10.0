import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../Actions';

import { Scroll, Tr } from './styles';
import { TableContainer } from '~/components/Table';

export default function Table({
  height,
  problems,
  handleDetails,
  confirmDelete,
}) {
  return (
    <>
      <Scroll height={height} options={{ suppressScrollX: true }}>
        <TableContainer>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problema</th>
              <th>ID Produto</th>
              <th>Produto</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {problems.map(problemItem => (
              <Tr
                key={String(problemItem.id)}
                canceled={problemItem.order.canceled_at}
              >
                <td className="problemId">{problemItem.id}</td>
                <td className="description">{problemItem.description}</td>
                <td className="orderId">{problemItem.order.id}</td>
                <td className="product">{problemItem.order.product}</td>
                <Actions
                  handleDetails={handleDetails}
                  problem={problemItem}
                  id={problemItem.id}
                  confirmDelete={confirmDelete}
                />
              </Tr>
            ))}
          </tbody>
        </TableContainer>
      </Scroll>
    </>
  );
}

Table.propTypes = {
  height: PropTypes.number.isRequired,
  problems: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleDetails: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};
