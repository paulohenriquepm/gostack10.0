import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      where: {
        status: true,
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryman);
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      where: {
        status: true,
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found!' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { id, avatar_id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      avatar_id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      where: {
        status: true,
      },
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not found!' });
    }

    const { email } = req.body;

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res
          .status(401)
          .json({ error: 'This e-mail is already in use!' });
      }
    }

    const { id, avatar_id, name } = await deliveryman.update(req.body);

    return res.json({
      id,
      avatar_id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      where: {
        status: true,
      },
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not found!' });
    }

    const updatedDeliverman = await deliveryman.update({
      status: false,
    });

    if (updatedDeliverman) {
      return res.json({ message: 'Deliveryman deleted with success!' });
    }

    return res.status(500).json({ error: 'Error while deleting deliveryman!' });
  }
}

export default new DeliverymanController();
