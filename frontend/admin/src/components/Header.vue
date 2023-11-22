<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <p style="font-weight: bold">SPACE TIME</p>
        <div>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link text-body" to="/"
                >Product Manager</router-link
              >
            </li>

            <li class="nav-item">
              <router-link class="nav-link text-body" to="/orders"
                >Order Manager</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-body" to="/users"
                >User Manager</router-link
              >
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-center">
          <i
            style="cursor: pointer"
            @click="logOut()"
            class="fa-solid fa-right-from-bracket fa-2xl"
          ></i>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      localStorage.removeItem("userId");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
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
</style>
