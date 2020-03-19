import React from 'react';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer, TableAction } from '~/components/Table';
// import { Container } from './styles';

export default function OrderList() {
  return (
    <>
      <HeaderList page="orders/new" title="encomendas" />
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
          <tr>
            <td>#01</td>
            <td>Paulo Henrique</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/285/abott@adorable.png"
                  alt="avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Divinópolis</td>
            <td>Estado</td>
            <td>Status</td>
            <TableAction page="orders/edit/:id" />
          </tr>
          <tr>
            <td>#01</td>
            <td>Paulo Henrique</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/285/abott@adorable.png"
                  alt="avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Divinópolis</td>
            <td>Estado</td>
            <td>Status</td>
            <td>...</td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Paulo Henrique</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/285/abott@adorable.png"
                  alt="avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Divinópolis</td>
            <td>Estado</td>
            <td>Status</td>
            <td>...</td>
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
