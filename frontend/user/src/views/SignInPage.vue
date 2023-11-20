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
            <h2 class="text-center mt-2">Sign In</h2>
            <p class="text-center mt-2 mb-1 text-danger" v-if="messErr">
              {{ messErr }}
            </p>
            <div>
              <form @submit.prevent="signIn()">
                <div class="mb-3 mx-5">
                  <label for="exampleInputEmail1" class="form-label"
                    >Email address</label
                  >
                  <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': errormess.email }"
                  />
                  <span class="invalid-feedback" v-if="errormess.email">{{
                    errormess.email
                  }}</span>
                </div>
                <div class="mb-3 mx-5">
                  <label for="exampleInputPassword1" class="form-label"
                    >Password</label
                  >
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': errormess.password }"
                  />
                  <span class="invalid-feedback" v-if="errormess.password">{{
                    errormess.password
                  }}</span>
                </div>

                <button
                  type="submit"
                  class="btn btn-outline-primary mx-5 button"
                >
                  Sign In
                </button>
                <div>
                  <router-link to="/sign-up" class="nav-link">
                    <p class="text-end mx-5 mt-2">Don't have an account?</p>
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
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errormess: {
        email: "",
        password: "",
      },
      messErr: "",
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errormess = {
        email: "",
        password: "",
      };
      if (!this.user.email) {
        this.errormess.email = "email user is required";
        isValid = false;
      }
      if (!this.user.password) {
        this.errormess.password = "password user is required";
        isValid = false;
      }
      return isValid;
    },
    async signIn() {
      if (this.validate()) {
        const res = await UserService.login(this.user);
        if (res.status === "OK") {
          const token = res.access_token;
          let decoded = VueJwtDecode.decode(token);
          localStorage.setItem("userId", decoded.id);
          window.location.href = "/";
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
