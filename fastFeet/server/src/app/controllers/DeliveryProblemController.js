import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';
import CanceledDeliveryMail from '../jobs/CanceledDeliveryMail';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { docs, pages, total } = await DeliveryProblem.paginate({
      page,
      paginate: 10,
      attributes: ['id', 'description'],
      include: {
        model: Order,
        as: 'order',
        attributes: ['id', 'product', 'canceled_at'],
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: ['id', 'name'],
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email'],
          },
        ],
      },
    });

    return res.json({
      docs,
      page,
      pages,
      total,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails!' });
    }

    const { id, delivery_id, description } = await DeliveryProblem.create({
      delivery_id: req.params.id,
      description: req.body.description,
    });

    return res.json({ id, delivery_id, description });
  }

  async delete(req, res) {
    const order_problem = await DeliveryProblem.findByPk(req.params.id);

    if (!order_problem) {
      return res.status(401).json({ error: 'Order problem not found' });
    }

    const { delivery_id } = order_problem;

    const order = await Order.findOne({
      attributes: ['id', 'product'],
      where: {
        id: delivery_id,
        canceled_at: null,
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
        },
      ],
    });

    if (!order) {
      return res
        .status(401)
        .json({ error: 'Order does not exists or is already canceled' });
    }

    order.canceled_at = new Date();

    await order.save();

    await Queue.add(CanceledDeliveryMail.key, {
      deliverymanName: order.deliveryman.name,
      deliverymanEmail: order.deliveryman.email,
      order: order.id,
      product: order.product,
      description: order_problem.description,
    });

    return res.json(order);
  }
}

export default new DeliveryProblemController();
