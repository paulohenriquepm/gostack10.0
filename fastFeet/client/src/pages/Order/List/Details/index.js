import React from 'react';

import { MdClose } from 'react-icons/md';

import { TableDetails } from '~/components/Table';
import ClearBackground from '~/components/ClearBackground';

export default function Details({ visible, order, handleDetails }) {
  return (
    <>
      <TableDetails visible={visible}>
        <button type="button" onClick={() => handleDetails(order)}>
          <MdClose size={18} color="#DE3B3B" />
        </button>
        <div>
          <strong>Informações da encomenda</strong>
          <span>Rua Teste, 1234</span>
          <span>Rua Teste, 1234</span>
          <span>Rua Teste, 1234</span>
        </div>
        <div>
          <strong>Datas</strong>
          <span>Retirada: 25/01/2020</span>
          <span>Entrega: 25/01/2020</span>
        </div>
        <div>
          <strong>Assinatura do destinatário</strong>
        </div>
      </TableDetails>
      <ClearBackground visible={visible} />
    </>
  );
}
