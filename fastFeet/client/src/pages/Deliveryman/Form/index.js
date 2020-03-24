import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { FormContainer, FormLoading, Input } from '~/components/Form';
import { HeaderForm } from '~/components/ActionHeader';
import AvatarInput from './AvatarInput';

export default function DeliverymanForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [deliveryman, setDeliveryman] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadOrderDetails() {
        try {
          setLoading(true);

          const response = await api.get(`deliverymans/${id}`);

          const { avatar, name } = response.data;

          response.data.avatar_url = avatar
            ? avatar.url
            : `https://avatar.oxro.io/avatar?name=${name}`;

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

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do entregador é obrigatório'),
        email: Yup.string()
          .email()
          .required('O e-mail do entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/deliverymans/${id}`, data);
      }

      if (!id) {
        await api.post('/deliverymans', data);
      }

      toast.success('Entregador salvo com sucesso');
      history.push('/deliverymans');
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Algo deu errado ao salvar o entregador');
      }
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          ref={formRef}
          initialData={deliveryman}
          onSubmit={handleSubmit}
        >
          <HeaderForm id={id} prevPage="/deliverymans" title="entregadores" />
          <section>
            <AvatarInput name="avatar_id" />

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
