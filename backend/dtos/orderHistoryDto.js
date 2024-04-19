module.exports = class OrderHistory {
  id;
  orderStatus;
  nickname;
  price;
  paymentMethod;
  productName;
  date;
  constructor(model) {
    this.id = model.id;
    this.nickname = model.nickname;
    this.orderStatus = model.orderStatus;
    this.price = model.price;
    this.paymentMethod = model.paymentMethod;
    this.productName = model.productName;
    this.date = model.date;
  }
};
