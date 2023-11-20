<template>
  <div>
    <router-link
      :to="{ name: 'productdetails', params: { id: product._id } }"
      class="nav-link"
    >
      <div class="card">
        <img :src="product.image" class="card-img-top color" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <div class="card-text">
            <p class="item">{{ product.type }}</p>
            <p class="item price">$ {{ product.price }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.title-advice {
  text-align: center;
  margin: 10px 0px;
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
.item {
  margin: 0px;
}
.price {
  color: red;
}
</style>
