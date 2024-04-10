const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async GetCart({ _id }) {
    const cartItems = await this.repository.Cart(_id);
    return FormateData(cartItems);
  }

  async PlaceOrder(_id, carts) {
    const orderResult = await this.repository.CreateNewOrder(_id, carts);

    return FormateData(orderResult);
  }

  async GetOrders(customerId) {
    const orders = await this.repository.Orders(customerId);
    return FormateData(orders);
  }

  async GetOrderDetails({ _id, orderId }) {
    const orders = await this.repository.Orders(orderId);
    return FormateData(orders);
  }

  async ManageCart(customerId, item, qty, isRemove) {
    const cartResult = await this.repository.AddCartItem(
      customerId,
      item,
      qty,
      isRemove
    );
    return FormateData(cartResult);
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);
    const { event, data } = payload;
    const { userId, product, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      default:
        break;
    }
  }

  async GetOrderPayload(userId, order, event) {
    if (order) {
      const payload = {
        event: event,
        data: { userId, order },
      };

      return payload;
    } else {
      return FormateData({ error: "No Order Available" });
    }
  }

  async getAllOrders() {
    const orders = await this.repository.getAllOrders();
    return orders;
  }

  async getOrderById(id) {
    const orders = await this.repository.getOrderById(id);
    return orders;
  }

  async getOrdersCustomerId(customerId) {
    const orders = await this.repository.getOrdersCustomer(customerId);
    return orders;
  }
}

module.exports = ShoppingService;
