import React from 'react';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer } from '~/components/Table';
import Actions from './Actions';
// import { Container } from './styles';

export default function RecipientList() {
  return (
    <>
      <HeaderList page="recipients/new" title="destinatários" visible />
      <TableContainer>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Paulo Henrique</td>
            <td>Rua Rosa Fonseca e Silva, 651, Divinópolis - Minas Gerais</td>
            <Actions page="recipients/edit/:id" />
          </tr>
          <tr>
            <td>#01</td>
            <td>Paulo Henrique</td>
            <td>Rua Rosa Fonseca e Silva, 651, Divinópolis - Minas Gerais</td>
            <Actions page="recipients/edit/:id" />
          </tr>
          <tr>
            <td>#01</td>
            <td>Paulo Henrique</td>
            <td>Rua Rosa Fonseca e Silva, 651, Divinópolis - Minas Gerais</td>
            <Actions page="recipients/edit/:id" />
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
