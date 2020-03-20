import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { FormContainer, FormLoading, Input } from '~/components/Form';
// import { Container } from './styles';

export default function OrderForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadOrderDetails() {
        try {
          setLoading(true);

          const response = await api.get(`orders/${id}`);

          setOrder(response.data);

          setLoading(false);
        } catch (err) {
          toast.error('Falha ao carregar dados');
        }
      }
      loadOrderDetails();
    }
  }, [id]);

  console.tron.log(order);

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer initialData={order}>
          <header>
            <div>
              <strong>Edição de Encomendas</strong>
            </div>

            <div>
              <button type="button">
                <MdChevronLeft />
                Voltar
              </button>

              <button type="submit">
                <MdCheck />
                Salvar
              </button>
            </div>
          </header>

          <section>
            <div>
              <Input name="recipient.name" label="Destinatário" />
              <Input name="deliveryman.name" label="Entregador" />
            </div>
            <div>
              <Input name="product" label="Produto" />
            </div>
          </section>
        </FormContainer>
      )}
    </>
  );
}

OrderForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
