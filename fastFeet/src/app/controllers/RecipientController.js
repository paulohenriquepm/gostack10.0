import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipentController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async show(req, res) {
    const recipient = await Recipient.findAll({ where: { id: req.body.id } });

    if (!recipient) {
      return res.status(401).json({ message: 'Recipient not fould!' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails!' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails!' });
    }

    const { id } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ message: 'Recipient not found!' });
    }

    const {
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    });
  }
}

export default new RecipentController();
