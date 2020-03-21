import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { FormContainer, FormLoading, Input, Select } from '~/components/Form';
import { HeaderForm } from '~/components/ActionHeader';

import { SelectContainer } from './styles';

export default function OrderForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState([]);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadOrderDetails() {
        try {
          setLoading(true);

          const response = await api.get(`orders/${id}`);

          setOrder(response.data);
          setSelectedRecipient(response.data.recipient);
          setSelectedDeliveryman(response.data.deliveryman);
          setLoading(false);
        } catch (err) {
          toast.error('Falha ao carregar dados');
        }
      }
      loadOrderDetails();
    }
  }, [id]);

  useEffect(() => {
    async function loadSelectOptions() {
      try {
        const [recipientResponse, deliverymanResponse] = await Promise.all([
          api.get('recipients'),
          api.get('deliverymans'),
        ]);

        setRecipients(recipientResponse.data);
        setDeliverymans(deliverymanResponse.data);
      } catch (err) {
        toast.error('Falha ao carregar dados');
      }
    }

    loadSelectOptions();
  }, []);

  const recipientsOptions = recipients.map(recipient => {
    const data = {
      value: recipient.id,
      label: recipient.name,
    };

    return data;
  });

  const handleChangeRecipient = selectedOption => {
    const { value } = selectedOption;

    setSelectedRecipient(value);
  };

  const handleChangeDeliveryman = selectedOption => {
    const { value } = selectedOption;

    setSelectedDeliveryman(value);
  };

  const deliverymansOptions = deliverymans.map(deliveryman => {
    const data = {
      value: deliveryman.id,
      label: deliveryman.name,
    };

    return data;
  });

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer initialData={order}>
          <HeaderForm id={id} prevPage="orders" title="encomendas" />
          <section>
            <SelectContainer>
              <Select
                name="recipient.name"
                label="Destinatário"
                options={recipientsOptions}
                defaultValue={{
                  value: selectedRecipient.id,
                  label: selectedRecipient.name,
                }}
                onChange={handleChangeRecipient}
                placeholder="Selecione um destinatário"
              />
              <Select
                name="deliveryman.name"
                label="Entregador"
                options={deliverymansOptions}
                defaultValue={{
                  value: selectedDeliveryman.id,
                  label: selectedDeliveryman.name,
                }}
                onChange={handleChangeDeliveryman}
                placeholder="Selecione um entregador"
              />
            </SelectContainer>

            <Input name="product" label="Produto" />
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
