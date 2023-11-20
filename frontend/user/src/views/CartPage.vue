<template>
  <div class="cart-order mt-2">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-5">
        <h3>Bag</h3>
        <hr />
        <div v-if="!cartItems.length">
          <p>Bag is empty</p>
        </div>
        <div v-for="(order, index) in cartItems" :key="index">
          <div
            v-for="(product, productIndex) in order.orderItems"
            :key="productIndex"
            class="row mb-3"
          >
            <div class="col-3">
              <img
                :src="product.image"
                class="card-img-top color"
                alt="Product Image"
              />
            </div>
            <div class="col-8">
              <div class="d-flex justify-content-between">
                <p>{{ product.name }}</p>
                <p>$ {{ product.price * product.amount }}</p>
              </div>
              <p>{{ product.type }}</p>
              <div
                class="d-flex align-items-center mb-4 justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <div class="click">
                    <i
                      @click="
                        handleChangeCount(index, productIndex, 'decrease')
                      "
                      class="fa-solid fa-minus fa-xl"
                    ></i>
                  </div>
                  <input
                    disabled
                    min="1"
                    :max="product.countInStock"
                    class="input text-center"
                    type="number"
                    :value="product.amount"
                  />
                  <div class="click">
                    <i
                      @click="
                        handleChangeCount(index, productIndex, 'increase')
                      "
                      class="fa-solid fa-plus fa-xl"
                    ></i>
                  </div>
                </div>
                <div>
                  <i
                    @click="removeProduct(index, productIndex)"
                    class="fa-regular fa-trash-can fa-xl text-danger"
                    style="cursor: pointer"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div class="col-3">
        <h3>Total Sumary</h3>
        <hr />
        <p class="d-flex justify-content-between">
          <span>Sub Total: </span> <span>${{ totalPrice }}</span>
        </p>
        <p class="d-flex justify-content-between">
          <span>Shipping dilivery: </span> <span>Free</span>
        </p>
        <hr />
        <h5 class="d-flex justify-content-between">
          <span>Sub Total: </span> <span>${{ totalPrice }}</span>
        </h5>
        <button class="addcart" @click="handleCheckOut()">Checkout</button>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
    };
  },
  created() {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        this.cartItems = JSON.parse(storedOrders);
        this.totalPrice = this.calculateTotalPrice();
      } catch (error) {
        console.error("Error parsing orders from Local Storage:", error);
      }
    }
  },
  methods: {
    calculateTotalPrice() {
      return this.cartItems.reduce((total, order) => {
        return (
          total +
          order.orderItems.reduce(
            (orderTotal, product) =>
              orderTotal + product.amount * product.price,
            0
          )
        );
      }, 0);
    },
    handleChangeCount(orderIndex, productIndex, type) {
      const maxQuantity =
        this.cartItems[orderIndex].orderItems[productIndex].countInStock;
      const minQuantity = 1;

      if (
        type === "increase" &&
        this.cartItems[orderIndex].orderItems[productIndex].amount < maxQuantity
      ) {
        this.cartItems[orderIndex].orderItems[productIndex].amount += 1;
        this.updateLocalStorage();
      } else if (
        type === "decrease" &&
        this.cartItems[orderIndex].orderItems[productIndex].amount > minQuantity
      ) {
        this.cartItems[orderIndex].orderItems[productIndex].amount -= 1;
        this.updateLocalStorage();
      }
    },
    removeProduct(orderIndex, productIndex) {
      this.cartItems[orderIndex].orderItems.splice(productIndex, 1);
      if (this.cartItems[orderIndex].orderItems.length === 0) {
        this.cartItems.splice(orderIndex, 1);
      }
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem("orders", JSON.stringify(this.cartItems));
      this.totalPrice = this.calculateTotalPrice();
    },
    handleCheckOut() {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        this.$router.push({ name: "signin" });
      } else if (userId && this.cartItems.length) {
        this.$router.push({ name: "checkout" });
      } else {
        alert("Please select products into the shopping cart");
      }
    },
  },
};
</script>

<style scoped>
.addcart {
  margin-top: 20px;
  width: 100%;
  height: 40px;
  border-radius: 50px;
  background-color: white;
}

.addcart:hover {
  background-color: #111111;
  color: white;
}
.input {
  background-color: #fff;
  font-size: 20px;
  border: none;
}
.click {
  cursor: pointer;
}
</style>
