<template>
  <div class="container">
    <h3 class="mt-2 mb-2">Product Manager</h3>
    <div v-if="showMess" class="alert alert-success mess" role="alert">
      Product deleted successfully!
    </div>
    <router-link to="/product/create">
      <button type="button" class="btn btn-outline-primary">Add Product</button>
    </router-link>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Price</th>
          <th scope="col">Intock</th>
          <th scope="col">Image</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(product, index) in products">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.countInStock }}</td>
          <td><img :src="product.image" width="100" height="100" alt="" /></td>
          <td>
            <router-link
              :to="{ name: 'product.edit', params: { id: product._id } }"
            >
              <i class="fa-regular fa-pen-to-square fa-2xl mx-2 text-primary">
              </i>
            </router-link>
            <i
              class="fa-regular fa-trash-can fa-2xl text-danger"
              @click="confirmDelete(product._id)"
              style="cursor: pointer"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductService from "@/services/product_service";
export default {
  data() {
    return {
      products: [],
      showMess: false,
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      const res = await ProductService.getAll();
      this.products = res.data;
    },
    async confirmDelete(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        await ProductService.delete(productId);
        this.getAll();
        this.showMess = true;
        setTimeout(() => {
          this.showMess = false;
        }, 2000);
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
