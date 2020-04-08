import Sequelize, { Model } from 'sequelize';

class Withdraw extends Model {
  static init(sequelize) {
    super.init(
      {
        deliveryman_id: Sequelize.INTEGER,
        date: Sequelize.DATEONLY,
        count: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
  }
}

export default Withdraw;
