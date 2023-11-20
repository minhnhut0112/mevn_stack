<template>
  <div>
    <div class="row background">
      <div class="col-2"></div>
      <div class="col-8 background-center mt-5 mb-5">
        <div class="row">
          <div class="col-6">
            <img src="../assets/images/log-login.jpg" class="image" />
          </div>
          <div class="col">
            <h2 class="text-center mt-2">Sign Up</h2>
            <p class="text-center mt-2 mb-1 text-danger" v-if="messErr">
              {{ messErr }}
            </p>
            <div>
              <form @submit.prevent="signUp()">
                <div class="mb-3 mx-5">
                  <label for="email" class="form-label">Email </label>
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': errormess.email }"
                    v-model="user.email"
                  />
                  <span class="invalid-feedback" v-if="errormess.email">{{
                    errormess.email
                  }}</span>
                </div>
                <div class="mb-3 mx-5">
                  <label for="name" class="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': errormess.name }"
                    v-model="user.name"
                  />
                  <span class="invalid-feedback" v-if="errormess.name">{{
                    errormess.name
                  }}</span>
                </div>
                <div class="mb-3 mx-5">
                  <label for="name" class="form-label">Phone</label>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': errormess.phone }"
                    v-model="user.phone"
                  />
                  <span class="invalid-feedback" v-if="errormess.phone">{{
                    errormess.phone
                  }}</span>
                </div>
                <div class="mb-3 mx-5">
                  <label for="name" class="form-label">Password</label>
                  <input
                    type="password"
                    id="name"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': errormess.password }"
                    v-model="user.password"
                  />
                  <span class="invalid-feedback" v-if="errormess.password">{{
                    errormess.password
                  }}</span>
                </div>

                <button class="btn btn-outline-primary mx-5 button">
                  Sign Up
                </button>
                <div>
                  <router-link to="/sign-in" class="nav-link">
                    <p class="text-end mx-5 mt-2">Have an account? Sign-In</p>
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user_service";

export default {
  data() {
    return {
      user: {
        email: "",
        name: "",
        password: "",
        phone: "",
      },
      errormess: {
        email: "",
        name: "",
        password: "",
        phone: "",
      },
      messErr: "",
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errormess = {
        email: "",
        name: "",
        password: "",
        phone: "",
      };
      if (!this.user.email) {
        this.errormess.email = "email user is required";
        isValid = false;
      }
      if (!this.user.password) {
        this.errormess.password = "password user is required";
        isValid = false;
      }
      if (!this.user.name) {
        this.errormess.name = "name user is required";
        isValid = false;
      }
      if (!this.user.phone) {
        this.errormess.phone = "phone user is required";
        isValid = false;
      }
      return isValid;
    },
    async signUp() {
      if (this.validate()) {
        const res = await UserService.signUp(this.user);
        if (res.status === "True") {
          this.$router.push({ name: "signin" });
        } else {
          this.messErr = res.message;
        }
      }
    },
  },
};
</script>

<style>
.background {
  background-color: #f5f5f5;
}
.background-center {
  background-color: #ffffff;
}
.button {
  width: 80%;
}

.image {
  width: 100%;
}
</style>
