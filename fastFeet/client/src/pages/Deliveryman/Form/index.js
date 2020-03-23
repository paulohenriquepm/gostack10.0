import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { FormContainer, FormLoading, Input, Select } from '~/components/Form';
import { HeaderForm } from '~/components/ActionHeader';

import { SelectContainer } from './styles';

// const schema = Yup.object().shape({
//   product: Yup.string().required('O producto da entrega é obrigatório'),
//   deliveryman_id: Yup.number().required('Selecione um entregador'),
//   recipient_id: Yup.number().required('Selecione um entregador'),
// });

export default function DeliverymanForm({ match }) {
  return <h1>Deliveryman Form</h1>;
}
