export const endpoints = {
  products: {
    getAll: "/products",
    add: "/products",
    getCategories: "/products/categories",
    getSingle: (id: number | string) => `/products/${id}`,
    update: (id: number | string) => `/products/${id}`,
    delete: (id: number | string) => `/products/${id}`,
    searchProduct: (q: string) => `/products/search?q=${q}`,
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    currentAuthUser: "/auth/me",
  },
  cart: {
    getUserCart: (id: number | string) => `/carts/user/${id}`,
    updateCart: (id: number | string) => `/carts/${id}`,
    addCart: () => `/carts/add`,
  },
};
