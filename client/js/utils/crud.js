class CRUD {
  baseUrl = "https://localhost:44351/";
  endpoint = "";
  options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "",
  }
  constructor(endpoint, options) {
    this.endpoint = endpoint;
    this.options = Object.assign(this.options, options);
  }
  async get() {
    const response = await fetch(this.baseUrl + this.endpoint);
    const data = await response.json();
    return data;
  }
  async post() {
    const response = await fetch(this.baseUrl + this.endpoint, this.options);
    const data = await response.json();
    return data;
  }
  async put() {
    const response = await fetch(this.baseUrl + this.endpoint, this.options);
    const data = await response.json();
    return data;
  }
  async delete() {
    const response = await fetch(this.baseUrl + this.endpoint, this.options);
    const data = await response.json();
    return data;
  }
}
export const crud = new CRUD();
