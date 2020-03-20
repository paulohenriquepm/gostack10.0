import React from 'react';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer } from '~/components/Table';
import Actions from './Actions';
// import { Container } from './styles';

export default function ProblemList() {
  return (
    <>
      <HeaderList page="problems/new" title="problemas na entrega" />
      <TableContainer>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Carga roubada</td>
            <Actions page="orders/edit/:id" />
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
