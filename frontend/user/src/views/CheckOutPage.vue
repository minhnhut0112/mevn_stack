<template>
  <div class="row mt-3">
    <div class="col-3"></div>
    <div class="col-4">
      <h3>Enter your info and address</h3>
      <hr />
      <form>
        <div class="mb-3">
          <label class="form-label">Email </label>
          <input
            v-model="user.email"
            style="width: 85%"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            v-model="user.name"
            style="width: 85%"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Phone</label>
          <input
            v-model="user.phone"
            style="width: 85%"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Address</label>
          <input
            v-model="user.address"
            style="width: 85%"
            type="text"
            class="form-control"
          />
        </div>

        <button
          :disabled="!user.name || !user.phone || !user.email || !user.address"
          type="button"
          @click="updateInfoUser(user._id)"
          class="btn btn-outline-primary"
        >
          Save
        </button>
      </form>
    </div>
    <div class="col-3">
      <h3>Total Sumary</h3>
      <hr />
      <p class="d-flex justify-content-between">
        <span>Sub Total: </span> <span>{{ totalPrice }} $</span>
      </p>
      <p class="d-flex justify-content-between">
        <span>Estimated Delivery: </span> <span>Free</span>
      </p>
      <hr />
      <h5 class="d-flex justify-content-between">
        <span>Total: </span> <span>{{ totalPrice }} $</span>
      </h5>
      <hr />
      <div class="mb-3">
        <h5 class="form-label">Payment Method</h5>

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            v-model="paymentMethod"
            value="cash"
            id="flexRadioDefault2"
          />
          <label class="form-check-label" for="flexRadioDefault2"> Cash </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            v-model="paymentMethod"
            value="paypal"
            id="flexRadioDefault1"
            @click="initPayPalButton()"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            PayPal
          </label>
        </div>
      </div>
      <button
        v-if="paymentMethod === 'cash'"
        class="addcart"
        @click="handleOrder()"
      >
        Order Now
      </button>
      <div v-if="paymentMethod === 'paypal'">
        <div id="paypal-button-container"></div>
      </div>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
import UserService from "@/services/user_service";
import OrderService from "@/services/order_service";

export default {
  data() {
    return {
      user: {
        email: "",
        name: "",
        phone: "",
        address: "",
        _id: "",
      },
      cartItems: [],
      totalPrice: 0,
      paymentMethod: "cash",
    };
  },
  created() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.getInfoUser(userId);
    } else {
      this.$router.push({ name: "homepage" });
    }
    const Orders = localStorage.getItem("orders");
    if (Orders) {
      this.cartItems = JSON.parse(Orders);
      this.totalPrice = this.calculateTotalPrice();
      if (this.cartItems.length == 0) {
        this.$router.push({ name: "homepage" });
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
    async getInfoUser(userId) {
      const res = await UserService.getdetail(userId);
      this.user = res.data;
    },
    async updateInfoUser(id) {
      const res = await UserService.editUser(id, this.user);
      if (res.status === "OK") {
        alert("Update successfully");
      }
    },
    async initPayPalButton() {
      const paypalScript = document.createElement("script");
      paypalScript.src =
        "https://www.paypal.com/sdk/js?client-id=AenCz6GbM1EDk97hxeMdQakLOqlxNUXrA51E0sxGpbrbLB4o_JM20vyKKEL4E8hPUGglQG1edcVmeYVR&locale=en_US";
      paypalScript.async = true;
      paypalScript.onload = () => {
        this.renderPayPalButton();
      };

      document.body.appendChild(paypalScript);
    },
    renderPayPalButton() {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.totalPrice.toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.handleOrder(order);
          },
          onError: (err) => {
            console.error(err);
          },
        })
        .render("#paypal-button-container");
    },
    async handleOrder() {
      if (
        this.user.email &&
        this.user.phone &&
        this.user.address &&
        this.cartItems.length
      ) {
        const allOrderItems = this.cartItems.flatMap(
          (cartItem) => cartItem.orderItems
        );
        const data = {
          orderItems: allOrderItems,
          totalPrice: this.totalPrice,
          user: this.user?._id,
          email: this.user?.email,
          fullName: this.user?.name,
          address: this.user?.address,
          phone: this.user?.phone,
          paymentMethod: this.paymentMethod,
        };
        const res = await OrderService.createOrder(data);
        if (res.status === "OK") {
          this.$router.push({ name: "ordersuccess" });
          localStorage.removeItem("orders");
        } else {
          alert("An error has occurred!");
        }
      } else {
        alert("Please complete all your info!");
      }
    },
  },
};
</script>

<style>
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
</style>
