import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';

import ClearBackground from '~/components/ClearBackground';
import { Container, Date } from './styles';

export default function Details({ visible, order, handleVisible }) {
  return (
    <>
      <Container visible={visible}>
        <MdClose size={18} color="#DE3B3B" onClick={() => handleVisible()} />

        <Form initialData={order}>
          <div>
            <strong>Informações da encomenda</strong>
            <Input name="street_number" readOnly />
            <Input name="city_state" readOnly />
            <Input name="recipient.cep" readOnly />
          </div>
          <div>
            <strong>Datas</strong>
            <Date>
              <span>Retirada: </span>
              <Input name="start_date" readOnly />
            </Date>
            <Date>
              <span>Entrega: </span>
              <Input name="end_date" readOnly />
            </Date>
          </div>
          <div>
            <strong>Assinatura do destinatário</strong>
          </div>
        </Form>
      </Container>
      <ClearBackground visible={visible} />
    </>
  );
}

Details.propTypes = {
  visible: PropTypes.bool.isRequired,
  order: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
