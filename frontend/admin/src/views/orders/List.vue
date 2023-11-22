<template>
  <div class="container">
    <h3 class="mt-2 mb-2">Orders Manager</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Order Items</th>
          <th scope="col">User Info</th>
          <th scope="col">Total Price</th>
          <th scope="col">Payment Method</th>
          <th scope="col">isDelivered</th>
          <th scope="col">Confirm</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(order, index) in orders">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <div
              :key="indexitem"
              v-for="(orderItems, indexitem) in order.orderItems"
            >
              <div class="row">
                <div class="col-3">
                  <img
                    :src="orderItems.image"
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <div class="col-6">
                  <p>{{ orderItems.name }}</p>
                  <p>x{{ orderItems.amount }}</p>
                </div>
              </div>
            </div>
          </td>
          <td>
            <p>{{ order.shippingAddress.email }}</p>
            <p>{{ order.shippingAddress.phone }}</p>
            <p>{{ order.shippingAddress.address }}</p>
          </td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.paymentMethod }}</td>
          <td>{{ order.isDelivered }}</td>
          <td>
            <button
              :disabled="order.isDelivered"
              type="button"
              @click="confirmOrder(order._id)"
              class="btn btn-outline-primary"
            >
              Confirm
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderService from "@/services/order_service";
export default {
  data() {
    return {
      orders: [],
      showMess: false,
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      const res = await OrderService.getAll();
      this.orders = res.data;
    },
    async confirmOrder(id) {
      const res = await OrderService.updateOrder(id);
      if (res.status === "OK") {
        alert("Confirm Successfuly!");
        this.getAll();
      }
    },
  },
};
</script>

<style>
.mess {
  width: 400px;
}
</style>
