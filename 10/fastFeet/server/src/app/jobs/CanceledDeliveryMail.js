import Mail from '../../lib/Mail';

class CanceledDeliveryMail {
  get key() {
    return 'CanceledDeliveryMail';
  }

  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.deliverymanName} <${data.email}>`,
      subject: 'Novo cancelamento de encomenda!',
      template: 'cancel',
      context: {
        deliveryman: data.deliverymanName,
        order_id: data.order,
        product: data.product,
        description: data.description,
      },
    });
  }
}

export default new CanceledDeliveryMail();
