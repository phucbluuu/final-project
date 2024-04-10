const ShoppingService = require("../services/shopping-service");
const {
  PublishCustomerEvent,
  SubscribeMessage,
  FormateData,
} = require("../utils");
const UserAuth = require("./middlewares/auth");
const { CUSTOMER_SERVICE } = require("../config");
const { PublishMessage } = require("../utils");
const { authorize } = require("./middlewares/authorize");
module.exports = (app, channel) => {
  const service = new ShoppingService();

  SubscribeMessage(channel, service);

  app.post("/order", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      console.log(_id);
      const carts = req.body;
      const { data } = await service.PlaceOrder(_id, carts);

      // const payload = await service.GetOrderPayload(_id, data, "CREATE_ORDER");

      // // PublishCustomerEvent(payload)
      // PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(payload));
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = await service.GetOrders(_id);

    res.status(200).json(data);
  });

  app.put("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = await service.AddToCart(_id, req.body._id);

    res.status(200).json(data);
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = await service.AddToCart(_id, req.body._id);

    res.status(200).json(data);
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = await service.GetCart({ _id });

    return res.status(200).json(data);
  });

  app.get("/getAllOrders", authorize("ADMIN"), async (req, res, next) => {
    const orders = await service.getAllOrders();
    return res.status(200).json(FormateData(orders));
  });

  app.get("/getOrderById/:id", authorize("ADMIN"), async (req, res, next) => {
    const { id } = req.params;
    const order = await service.getOrderById(id);
    return res.status(200).json(order);
  });

  app.get(
    "/getOrdersCustomerId/:id",
    authorize("ADMIN"),
    async (req, res, next) => {
      const { id } = req.params;
      const orders = await service.getOrdersCustomerId(id);
      return res.status(200).json(FormateData(orders));
    }
  );

  app.get("/whoami", (req, res, next) => {
    return res.status(200).json({ msg: "/shoping : I am Shopping Service" });
  });
};
