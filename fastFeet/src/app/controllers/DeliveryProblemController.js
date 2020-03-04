import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      include: {
        model: Order,
        as: 'order',
        attributes: ['id', 'product'],
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

    return res.json(problems);
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
}

export default new DeliveryProblemController();
