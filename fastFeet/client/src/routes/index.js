import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '~/pages/SingIn';
import { OrderList, OrderForm } from '~pages/Order';
import { DeliverymanList, DeliverymanForm } from '~pages/Deliveryman';
import { RecipientList, RecipientForm } from '~pages/Recipient';
import { ProblemList } from '~pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />

      <Route path="/orders" exact component={OrderList} isPrivate />
      <Route path="/orders/new" component={OrderForm} isPrivate />
      <Route path="/orders/edit/:id" component={OrderForm} isPrivate />

      <Route path="/deliverymans" exact component={DeliverymanList} isPrivate />
      <Route path="/deliverymans/new" component={DeliverymanForm} isPrivate />
      <Route
        path="/deliverymans/edit/:id"
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/recipients" exact component={RecipientList} isPrivate />
      <Route path="/recipients/new" component={RecipientForm} isPrivate />
      <Route path="/recipients/edit/:id" component={RecipientForm} isPrivate />

      <Route path="/problems" exact component={ProblemList} isPrivate />
    </Switch>
  );
}
