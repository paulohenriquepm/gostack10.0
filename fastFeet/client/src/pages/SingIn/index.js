import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { singInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(singInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="fastfeet" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">SEU EMAIL</label>
        <Input name="email" type="text" placeholder="exemplo@email.com" />

        <label htmlFor="password">SUA SENHA</label>
        <Input name="password" type="password" placeholder="***********" />

        <button type="submit">{loading ? 'Carregando...' : 'ENTRAR'}</button>
      </Form>
    </>
  );
}
