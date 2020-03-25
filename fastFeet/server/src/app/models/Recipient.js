import Sequelize, { Model } from 'sequelize';

const sequelizePaginate = require('sequelize-paginate');

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        cep: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    sequelizePaginate.paginate(Recipient);
    return Recipient;
  }
}

export default Recipient;
