import axios from "axios";

export const ProductsService = {
  GET: () => {
    return axios.get(process.env.REACT_APP_API_URL + "products");
  },
  GET_CATEGORIES: () => {
    return axios.get(process.env.REACT_APP_API_URL + "products/categories");
  },
  GET_IN_CATEGORIES: (category, skip, limit, term, direction) => {
    return axios.get(
      process.env.REACT_APP_API_URL +
        "products/category/" +
        category +
        "?skip=" +
        skip +
        "&limit=" +
        limit +
        "&sortBy=" +
        term +
        "&sort=" +
        direction
    );
  },
  GET_BY_ID: (productId) => {
    return axios.get(process.env.REACT_APP_API_URL + "products/" + productId);
  },
  GET_LIMIT: (limit) => {
    return axios.get(process.env.REACT_APP_API_URL + "products?limit=" + limit);
  },
  GET_PAGINATION: (skip, limit, term, direction) => {
    return axios.get(
      process.env.REACT_APP_API_URL +
        "products?skip=" +
        skip +
        "&limit=" +
        limit +
        "&sortBy=" +
        term +
        "&sort=" +
        direction
    );
  },
  GET_QUERY: (searchTerm) => {
    return axios.get(
      process.env.REACT_APP_API_URL + "products?searchTerm=" + searchTerm
    );
  },
  GET_SORT_TERM: (sortTerm, skip, limit) => {
    return axios.get(
      process.env.REACT_APP_API_URL +
        "products?sortBy=" +
        sortTerm +
        "&sort=desc" +
        "&skip=" +
        skip +
        "&limit=" +
        limit
    );
  },

  POST: (data) => {
    return axios.post(process.env.REACT_APP_API_URL + "products", data);
  },
  PUT: () => {
    return axios.put("");
  },
  DELETE: () => {
    return axios.delete("");
  },
};
