import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { FormContainer, FormLoading, Input } from '~/components/Form';
import { HeaderForm } from '~/components/ActionHeader';

// const schema = Yup.object().shape({
//   product: Yup.string().required('O producto da entrega é obrigatório'),
//   deliveryman_id: Yup.number().required('Selecione um entregador'),
//   recipient_id: Yup.number().required('Selecione um entregador'),
// });

export default function DeliverymanForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [deliveryman, setDeliveryman] = useState([]);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadOrderDetails() {
        try {
          setLoading(true);

          const response = await api.get(`deliverymans/${id}`);

          setDeliveryman(response.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error('Falha ao carregar dados');
        }
      }
      loadOrderDetails();
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          initialData={deliveryman}
          // onSubmit={handleSubmit}
          // schema={schema}
        >
          <HeaderForm id={id} prevPage="/deliveymans" title="entregadores" />
          <section>
            <Input name="name" label="Nome" />
            <Input name="email" label="Email" />
          </section>
        </FormContainer>
      )}
    </>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
