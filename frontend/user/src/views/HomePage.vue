<template>
  <div>
    <Slider />
    <h2 class="title-advice mt-3 mb-3">Advice for you</h2>
    <div class="container content">
      <hr />
      <div class="row">
        <div class="col-3" v-for="product in products" :key="product.id">
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from "../components/CardProduct.vue";
import Slider from "../components/Slider.vue";
import ProductService from "@/services/product_service";

export default {
  components: {
    Slider,
    CardProduct,
  },
  created() {
    this.getAll();
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async getAll() {
      const res = await ProductService.getAll();
      this.products = res.data;
    },
  },
};
</script>

<style></style>
