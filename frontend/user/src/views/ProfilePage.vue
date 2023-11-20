<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4">
      <h3 class="mt-4">My Profile</h3>
      <div class="mt-2">
        <form>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" v-model="user.email" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" v-model="user.name" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Phone</label>
            <input type="text" v-model="user.phone" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Address</label>
            <input type="text" v-model="user.address" class="form-control" />
          </div>
          <button
            @click="updateInfoUser(user._id)"
            type="button"
            class="btn btn-outline-primary"
          >
            Save
          </button>
        </form>
      </div>
    </div>
    <div class="col-4"></div>
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
    async updateInfoUser(id) {
      const res = await UserService.editUser(id, this.user);
      if (res.status === "OK") {
        alert("Update successfully");
      }
    },
  },
};
</script>

<style></style>
