<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4 mt-3">
      <h3>My Order</h3>
      <hr />
      <div :key="index" v-for="(order, index) in orders">
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
    this.getAllOrder();
  },
  methods: {
    async getAllOrder() {
      const res = await OrderService.getAll();
      this.orders = res.data;
    },
  },
};
</script>

<style></style>
