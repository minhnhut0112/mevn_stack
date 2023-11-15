<template>
  <div class="row">
    <div class="col-4 text-end mt-3">
      <router-link to="/users">
        <i class="fa-solid fa-arrow-left fa-2xl text-dark"></i
      ></router-link>
    </div>
    <div class="col-4">
      <h3 class="mt-2 mb-2">Edit User</h3>
      <div v-if="showAlertEdit" class="alert alert-success" role="alert">
        User Edited successfully!
      </div>
      <div v-if="messRes" class="alert alert-danger" role="alert">
        {{ messRes }}
      </div>
      <form @submit.prevent="save()">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            id="email"
            class="form-control"
            v-model="user.email"
            v-bind:class="{ 'is-invalid': errormess.type }"
          />
          <span class="invalid-feedback" v-if="errormess.type">{{
            errormess.type
          }}</span>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
            v-bind:class="{ 'is-invalid': errormess.name }"
          />
          <span class="invalid-feedback" v-if="errormess.name">{{
            errormess.name
          }}</span>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Phone</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.phone"
            v-bind:class="{ 'is-invalid': errormess.name }"
          />
          <span class="invalid-feedback" v-if="errormess.name">{{
            errormess.name
          }}</span>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Address</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.address"
            v-bind:class="{ 'is-invalid': errormess.name }"
          />
          <span class="invalid-feedback" v-if="errormess.name">{{
            errormess.name
          }}</span>
        </div>

        <button type="submit" class="btn btn-outline-info button">
          Update
        </button>
      </form>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import UserService from "@/services/user_service";
export default {
  data() {
    return {
      user: {
        _id: "",
        email: "",
        name: "",
        phone: "",
        address: "",
      },
      errormess: {
        email: "",
        name: "",
        phone: "",
        address: "",
      },
      showAlertEdit: false,
      messRes: "",
    };
  },
  created() {
    let userId = this.$route.params.id;
    if (userId) {
      this.getdetail(userId);
    }
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];

      if (file) {
        this.convertImageToBase64(file);
      }
    },
    convertImageToBase64(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.product.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    validate() {
      let isValid = true;
      this.errormess = {
        email: "",
        name: "",
        phone: "",
        address: "",
      };
      if (!this.user.email) {
        this.errormess.email = "email user is required";
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
      if (!this.user.address) {
        this.errormess.address = "address user is required";
        isValid = false;
      }
      return isValid;
    },
    async save() {
      if (this.validate()) {
        if (this.user._id) {
          await UserService.editUser(this.user._id, this.user);
          this.showAlertEdit = true;
          return;
        }
      }
    },
    async getdetail(userId) {
      const res = await UserService.getdetail(userId);
      this.user = res.data;
    },
  },
};
</script>

<style>
.button {
  width: 100px;
}
</style>
