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
          <div className="search">
            <i class="fa-solid fa-magnifying-glass icon-search"></i>
            <input placeholder="Search..." type="search" />
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
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    let userId = localStorage.getItem("userId");
    if (userId) {
      this.getdetail(userId);
    }
  },
  methods: {
    async getdetail(userId) {
      const res = await UserService.getdetail(userId);
      this.user = res.data;
    },
    logOut() {
      localStorage.removeItem("userId");
      localStorage.removeItem("orders");
      window.location.href = "/";
    },
    goToCartPage() {
      this.$router.push({ name: "cartpage" });
    },
  },
};
</script>

<style scoped>
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
