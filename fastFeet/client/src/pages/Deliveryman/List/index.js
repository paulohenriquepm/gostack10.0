import React from 'react';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer } from '~/components/Table';
import Actions from './Actions';
// import { Container } from './styles';

export default function DeliverymanList() {
  return (
    <>
      <HeaderList page="deliverymans/new" title="entregadores" visible />
      <TableContainer>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/285/abott@adorable.png"
                  alt="avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Paulo Henrique</td>
            <td>paulo.henriquepm@outlook.com</td>
            <Actions page="deliverymans/edit/:id" />
          </tr>
          <tr>
            <td>#01</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/285/abott@adorable.png"
                  alt="avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Paulo Henrique</td>
            <td>paulo.henriquepm@outlook.com</td>
            <Actions page="deliverymans/edit/:id" />
          </tr>
          <tr>
            <td>#01</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/285/abott@adorable.png"
                  alt="avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Paulo Henrique</td>
            <td>paulo.henriquepm@outlook.com</td>
            <Actions page="deliverymans/edit/:id" />
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
