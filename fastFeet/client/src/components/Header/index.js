import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import logo from '~/assets/logo.png';

import { Container, Content } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/orders">
            <img src={logo} alt="fastfeet" />
          </Link>

          <NavLink to="/orders" activeClassName="selected">
            ENCOMENDAS
          </NavLink>

          <NavLink to="/deliverymans" activeClassName="selected">
            ENTREGADORES
          </NavLink>

          <NavLink to="/recipients" activeClassName="selected">
            DESTINATÁRIOS
          </NavLink>

          <NavLink to="/problems" activeClassName="selected">
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <strong>{profile.name}</strong>
          <button type="button">Sair</button>
        </aside>
      </Content>
    </Container>
  );
}
