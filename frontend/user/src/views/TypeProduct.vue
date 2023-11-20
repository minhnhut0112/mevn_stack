<template>
  <div>
    <div class="container content">
      <h3 class="title mx-2">{{ titleType }}</h3>
      <div class="container content">
        <div class="row">
          <div class="col-3" v-for="product in products" :key="product.id">
            <CardProduct :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/product_service";
import CardProduct from "@/components/CardProduct.vue";

export default {
  components: {
    CardProduct,
  },
  data() {
    return {
      products: [],
      titleType: "",
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    "$route.params.type"(newType) {
      this.titleType = newType;
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      try {
        const typeProduct = this.$route.params.type;
        this.titleType = typeProduct;
        if (typeProduct) {
          const res = await ProductService.getProductType(typeProduct);
          this.products = res.data;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style>
.title {
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.content {
  margin-bottom: 20px;
}
.color {
  background-color: #f5f5f5;
}
.card {
  border: none;
}
</style>
