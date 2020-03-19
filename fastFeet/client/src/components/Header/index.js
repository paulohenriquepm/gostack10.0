import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

          <Link to="/orders">ENCOMENDAS</Link>

          <Link to="/deliverymans">ENTREGADORES</Link>

          <Link to="/recipients">DESTINATÁRIOS</Link>

          <Link to="/problems">PROBLEMAS</Link>
        </nav>

        <aside>
          <strong>{profile.name}</strong>
          <button type="button">Sair</button>
        </aside>
      </Content>
    </Container>
  );
}
