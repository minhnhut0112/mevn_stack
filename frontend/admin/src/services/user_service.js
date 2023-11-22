import createApiClient from "./api_service";

class ProductService {
  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/getAll")).data;
  }
  async login(data) {
    return (await this.api.post("/sign-in", data)).data;
  }
  async create(data) {
    return (await this.api.post("/create", data)).data;
  }
  async getdetail(id) {
    return (await this.api.get(`/get-details/${id}`)).data;
  }
  async editUser(id, data) {
    return (await this.api.put(`/update-user/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/delete-user/${id}`)).data;
  }
}
export default new ProductService();
