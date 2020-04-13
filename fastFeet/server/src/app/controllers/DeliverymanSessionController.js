import jwt from 'jsonwebtoken';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import authConfig from '../../config/auth';

class DeliverymanSessionController {
  async store(req, res) {
    const { id } = req.body;

    const deliveryman = await Deliveryman.findByPk(id, {
      where: {
        status: true,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(401).json({ message: 'Deliveryman not found!' });
    }

    return res.json({
      deliveryman,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new DeliverymanSessionController();
