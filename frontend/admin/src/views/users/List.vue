<template>
  <div class="container">
    <h3 class="mt-2 mb-2">User Manager</h3>
    <div v-if="showMess" class="alert alert-success mess" role="alert">
      User deleted successfully!
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Full Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>

          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(user, index) in users">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>

          <td>
            <router-link :to="{ name: 'user.edit', params: { id: user._id } }">
              <i class="fa-regular fa-pen-to-square fa-2xl mx-2 text-primary">
              </i>
            </router-link>
            <i
              class="fa-regular fa-trash-can fa-2xl text-danger"
              @click="confirmDelete(user._id)"
              style="cursor: pointer"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from "@/services/user_service";
export default {
  data() {
    return {
      users: [],
      showMess: false,
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      const res = await UserService.getAll();
      this.users = res.data;
    },
    async confirmDelete(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        await UserService.delete(userId);
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
