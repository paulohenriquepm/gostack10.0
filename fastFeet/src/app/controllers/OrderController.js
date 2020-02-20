import * as Yup from 'yup';
import { parseISO, isWithinInterval, setHours } from 'date-fns';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Mail from '../../lib/Mail';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        canceled_at: null,
      },
      order: [['id', 'DESC']],
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

  async show(req, res) {
    const order = await Order.findByPk(req.params.id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
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

    if (!order) {
      return res.status(401).json({ error: 'Order not found!' });
    }

    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const recipientExists = await Recipient.findByPk(req.body.recipient_id);

    if (!recipientExists) {
      return res.status(401).json({ error: 'Recipient not found!' });
    }

    const deliverymanExists = await Deliveryman.findByPk(
      req.body.deliveryman_id
    );

    if (!deliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman not found!' });
    }

    const { id, recipient_id, deliveryman_id, product } = await Order.create(
      req.body
    );

    const { name: deliverymanName, email } = deliverymanExists;
    const {
      name: recipientName,
      street,
      city,
      number,
      state,
      cep,
    } = recipientExists;

    await Mail.sendMail({
      to: `${deliverymanName} <${email}>`,
      subject: 'Uma nova encomenda te espera!',
      template: 'order',
      context: {
        deliveryman: deliverymanName,
        product,
        recipient: recipientName,
        street,
        number,
        city,
        state,
        cep,
      },
    });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const orderExists = await Order.findByPk(req.params.id);

    if (!orderExists) {
      return res.status(401).json({ error: 'Order not found!' });
    }

    const { start_date } = req.body;

    if (start_date) {
      const formattedDate = parseISO(start_date);
      const start_hour = setHours(new Date(), 8);
      const end_hour = setHours(new Date(), 18);

      if (
        !isWithinInterval(formattedDate, {
          start: start_hour,
          end: end_hour,
        })
      ) {
        return res.json({
          error: 'You can only withdraw an order between 08:00 and 18:00!',
        });
      }
    }

    const order = await orderExists.update(req.body);

    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        canceled_at: null,
      },
    });

    if (!order) {
      res
        .status(401)
        .json({ error: 'This order does not exists or is already canceled!' });
    }

    order.canceled_at = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new OrderController();
