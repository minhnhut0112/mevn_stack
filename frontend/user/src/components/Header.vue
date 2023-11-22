<template>
  <div>
    <div class="header-top">
      <div v-if="user?._id" class="">
        <router-link to="sign-in" class="nav-header">
          <div data-bs-toggle="dropdown" aria-expanded="false">
            {{ user?.name }}<i class="fa-regular fa-user mt-1 mx-2"></i>
          </div>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/profile" class="nav-link menu-item"
                >My profile</router-link
              >
              <hr class="menu" />
            </li>
            <li>
              <router-link to="/orderpage" class="nav-link menu-item"
                >My Order</router-link
              >
              <hr class="menu" />
            </li>
            <li>
              <div class="menu-item" @click="logOut()">Log Out</div>
            </li>
          </ul>
        </router-link>
      </div>
      <div v-if="!user?._id">
        <router-link to="/sign-in" class="nav-link">
          <div>LogIn<i class="fa-regular fa-user mt-1 mx-2"></i></div>
        </router-link>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/" class="nav-header"
          ><p class="title">Space Time</p></router-link
        >
        <div>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-header"
                ><p class="nav-link text-body">Home</p></router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/type/G-SHOCK" class="nav-header"
                ><p class="nav-link text-body">G-SHOCK</p></router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/type/BABY-G" class="nav-header"
                ><p class="nav-link text-body">BABY-G</p></router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/type/EDIFICE" class="nav-header"
                ><p class="nav-link text-body">EDIFICE</p></router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/type/PRO-TREK" class="nav-header"
                ><p class="nav-link text-body">PRO-TREK</p></router-link
              >
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-center">
          <div @click="openSearchModal" class="search">
            <i class="fa-solid fa-magnifying-glass icon-search"></i>
            <input placeholder="Search..." type="search" />
          </div>

          <div
            class="modal fade modal-search"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            ref="myModal"
          >
            <div class="modal-dialog">
              <div class="modal-content modal-search">
                <div class="modal-header">
                  <i class="fa-solid fa-magnifying-glass icon-search"></i>
                  <input
                    placeholder="Search..."
                    type="search"
                    style="width: 100%"
                    v-model="searchQuery"
                    @input="searchProduct"
                  />
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  class="modal-body"
                  :key="index"
                  v-for="(product, index) in products"
                >
                  <router-link
                    :to="{
                      name: 'productdetails',
                      params: { id: product._id },
                    }"
                    class="nav-link"
                    @click="closeSearchModal"
                  >
                    <div class="row">
                      <div class="col-3">
                        <img
                          :src="product.image"
                          width="100"
                          height="100"
                          alt=""
                        />
                      </div>
                      <div class="col-7">
                        <h6>{{ product.name }}</h6>
                        <p>{{ product.type }}</p>
                        <p class="text-danger">$ {{ product.price }}</p>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <i
        @click="goToCartPage"
        class="fa-solid fa-cart-shopping fa-xl mt-1 mx-2 cart"
      ></i>
    </nav>
  </div>
</template>

<script>
import UserService from "@/services/user_service";
import ProductService from "@/services/product_service";
export default {
  data() {
    return {
      user: {},
      products: [],
      searchQuery: "",
    };
  },
  created() {
    let userId = localStorage.getItem("userId");
    if (userId) {
      this.getdetail(userId);
    }
  },
  watch: {
    "$route.query.userId": function (newUserId, oldUserId) {
      console.log("Watcher triggered!", newUserId, oldUserId);
      if (newUserId === null) {
        this.user = "";
      } else {
        this.getdetail(newUserId);
        this.$forceUpdate();
      }
    },
  },
  methods: {
    async getdetail(userId) {
      const res = await UserService.getdetail(userId);
      if (res.status === "OK") {
        this.user = res.data;
      } else {
        this.user = "";
      }
    },
    logOut() {
      localStorage.removeItem("userId");
      localStorage.removeItem("orders");
      this.$router.push({ query: { userId: null } });
      this.$forceUpdate();
    },
    goToCartPage() {
      this.$router.push({ name: "cartpage" });
    },
    async searchProduct() {
      if (this.searchQuery) {
        const res = await ProductService.searchProduct(this.searchQuery);
        this.products = res.data;
      } else {
        this.products = [];
      }
    },
    openSearchModal() {
      if (!this.$refs.myModal.classList.contains("show")) {
        $("#exampleModal").modal("show");
      }
    },
    closeSearchModal() {
      this.searchQuery = "";
      this.products = this.searchQuery;
      $("#exampleModal").modal("hide");
      $(".modal-backdrop").remove();
    },
  },
};
</script>

<style scoped>
.modal-search {
  min-height: 500px;
  max-height: 800px;
}
.cart {
  cursor: pointer;
}
.title {
  margin: 0px;
  font-weight: bold;
  font-size: 20px;
}
.menu {
  margin: 10px 0px;
}

.menu-item {
  margin: 0px 20px;
}
.search {
  width: 180px;
  height: 2.5rem;
  border-radius: 20px;
  padding: 0 15px;
  border: 1px solid;
  display: flex;
  align-items: center;
  cursor: pointer;
}

input {
  background-color: transparent;
  border: none;
  height: 50px;
  width: 100px;
  font-size: 1.25rem;
  margin-left: 5px;
}

input:focus {
  outline: none;
}

.icon-search {
  font-size: 25px;
}

.header-top {
  height: 30px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: end;
  padding: 5px;
  padding-right: 10px;
}
.nav-header {
  color: black;
  text-decoration: none;
}
</style>
