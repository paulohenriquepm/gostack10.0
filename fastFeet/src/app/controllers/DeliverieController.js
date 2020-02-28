import Order from '../models/Order';
import Recipient from '../models/Recipient';

class DeliverieController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deliveryman_id', 'recipient_id'],
      },
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        signature_id: null,
      },
      order: [['createdAt', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });

    res.json(orders);
  }

  async update(req, res) {
    return res.json();
  }
}

export default new DeliverieController();
