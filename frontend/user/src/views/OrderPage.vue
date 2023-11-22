<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4 mt-3">
      <h3>My Order</h3>
      <hr />
      <div :key="index" v-for="(order, index) in orders">
        <h6>Order Info:</h6>
        <div class="mx-2">
          <p class="mb-1">Name: {{ order.shippingAddress.fullName }}</p>
          <p class="mb-1">Email: {{ order.shippingAddress.email }}</p>
          <p class="mb-1">Phone: {{ order.shippingAddress.phone }}</p>
          <p class="mb-1">Address: {{ order.shippingAddress.address }}</p>
          <p>Payment Method: {{ order.paymentMethod }}</p>
        </div>
        <h6>Order Items:</h6>
        <div
          class="row mb-2"
          :key="indexorder"
          v-for="(item, indexorder) in order.orderItems"
        >
          <div class="col-3 mt-2">
            <img :src="item.image" width="100" height="100" alt="" />
          </div>
          <div class="col-9">
            <h6>{{ item.name }}</h6>
            <p>x{{ item.amount }}</p>
            <p>$ {{ item.amount * item.price }}</p>
          </div>
        </div>
        <div class="text-end">
          <h6>Total Price: $ {{ order.totalPrice }}</h6>
          <button
            v-if="!order.isDelivered"
            @click="cancelOrder(order._id, order.orderItems)"
            type="button"
            class="btn btn-outline-danger"
          >
            Cancel Order
          </button>
        </div>
        <hr />
      </div>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import OrderService from "@/services/order_service";
export default {
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.getAllById();
  },
  methods: {
    async getAllById() {
      const userId = localStorage.getItem("userId");
      const res = await OrderService.getAllById(userId);
      this.orders = res.data;
    },
    async cancelOrder(id, item) {
      const res = await OrderService.cancelOrder(id, item);
      if (res.status === "OK") {
        alert("Cancel Successfully!");
        this.getAllById();
      }
    },
  },
};
</script>

<style></style>
