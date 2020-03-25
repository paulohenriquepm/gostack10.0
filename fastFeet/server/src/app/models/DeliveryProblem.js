import Sequelize, { Model } from 'sequelize';
const sequelizePaginate = require('sequelize-paginate');

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    sequelizePaginate.paginate(DeliveryProblem);
    return DeliveryProblem;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'delivery_id', as: 'order' });
  }
}

export default DeliveryProblem;
