import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '~/pages/SingIn';
import { OrderList, OrderForm } from '~pages/Order';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />

      <Route path="/orders" exact component={OrderList} isPrivate />
      <Route path="/orders/new" component={OrderForm} isPrivate />
      <Route path="/orders/edit/:id" component={OrderForm} isPrivate />
    </Switch>
  );
}
