import Sequelize from 'sequelize';

import DatabaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Order from '../app/models/Order';
import Deliveryman from '../app/models/Deliveryman';
import Withdraw from '../app/models/Withdraw';
import DeliveryProblem from '../app/models/DeliveryProblem';

const models = [
  User,
  Recipient,
  File,
  Order,
  Deliveryman,
  Withdraw,
  DeliveryProblem,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(DatabaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
