import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.deliverymanName} <${data.email}>`,
      subject: 'Uma nova encomenda te espera!',
      template: 'order',
      context: {
        deliveryman: data.deliverymanName,
        product: data.product,
        recipient: data.recipientName,
        street: data.street,
        number: data.number,
        city: data.city,
        state: data.state,
        cep: data.cep,
      },
    });
  }
}

export default new NewOrderMail();
