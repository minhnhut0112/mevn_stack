import createApiClient from "./api_service";

class ProductService {
  constructor(baseUrl = "/api/product") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/getAll")).data;
  }
  async searchProduct(search) {
    return (await this.api.get(`/getAll?filter=name&filter=${search}`)).data;
  }
  async create(data) {
    return (await this.api.post("/create", data)).data;
  }
  async getdetail(id) {
    return (await this.api.get(`/get-details/${id}`)).data;
  }
  async editProduct(id, data) {
    return (await this.api.put(`/update/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/delete-product/${id}`)).data;
  }
}
export default new ProductService();
