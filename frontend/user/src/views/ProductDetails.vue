<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-4">
        <img :src="product.image" class="card-img-top color" />
      </div>
      <div class="col-3">
        <h3 class="mb-4">{{ product.name }}</h3>
        <h5 class="mb-4">{{ product.type }}</h5>
        <p class="text-danger fs-5 mb-4">$ {{ product.price }}</p>
        <div class="d-flex align-items-center mb-4">
          <div class="click">
            <i
              @click="handleChangeCount('decrease')"
              class="fa-solid fa-minus fa-xl"
            ></i>
          </div>
          <input
            disabled
            min="1"
            :max="product.countInStock"
            class="input text-center"
            type="number"
            v-model="count"
          />
          <div class="click">
            <i
              @click="handleChangeCount('increase')"
              class="fa-solid fa-plus fa-xl"
            ></i>
          </div>
        </div>
        <div>
          <button
            @click="handleAddcart()"
            type="button"
            class="btn btn-outline-dark button"
          >
            add to cart
          </button>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/product_service";

export default {
  data() {
    return {
      product: {},
      count: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const idProduct = this.$route.params.id;
        if (idProduct) {
          const res = await ProductService.getdetail(idProduct);
          this.product = res.data;
          console.log(this.product);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    handleChangeCount(type) {
      if (type === "increase") {
        if (this.count < this.product.countInStock) {
          this.count += 1;
        }
      } else {
        if (this.count > 1) {
          this.count -= 1;
        }
      }
    },
    handleAddcart() {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        this.$router.push({ name: "signin" });
      } else {
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        let productExists = false;
        existingOrders.forEach((existingOrder) => {
          if (
            existingOrder.orderItems.some(
              (item) => item.product === this.product._id
            )
          ) {
            existingOrder.orderItems.forEach((item) => {
              if (item.product === this.product._id) {
                item.amount += this.count;
              }
            });
            productExists = true;
          }
        });
        if (!productExists) {
          existingOrders.push({
            orderItems: [
              {
                name: this.product.name,
                amount: this.count,
                image: this.product.image,
                type: this.product.type,
                price: this.product.price,
                product: this.product._id,
                countInStock: this.product.countInStock,
              },
            ],
          });
        }
        localStorage.setItem("orders", JSON.stringify(existingOrders));
        this.$router.push({ name: "cartpage" });
      }
    },
  },
};
</script>

<style scoped>
.input {
  background-color: #fff;
  font-size: 20px;
  border: none;
}
.click {
  cursor: pointer;
}

.button {
  width: 50%;
}
</style>
