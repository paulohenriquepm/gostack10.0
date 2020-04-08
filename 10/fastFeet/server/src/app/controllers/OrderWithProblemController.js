import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class OrderWithProblemController {
  async index(req, res) {
    const ids = await DeliveryProblem.findAll({
      attributes: ['id'],
      raw: true,
    });

    const ordersId = [];

    ids.map(id => {
      return ordersId.push(id.id);
    });

    const { page = 1 } = req.query;

    const orders = await Order.paginate({
      page,
      paginate: 10,
      where: {
        id: {
          [Op.in]: ordersId,
        },
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          where: {
            status: true,
          },
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new OrderWithProblemController();
