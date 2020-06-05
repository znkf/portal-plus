import request from "./request.js";

export default class BaseApi {
  constructor(url) {
    this.url = url;
    this.fetch = request;
  }
}
