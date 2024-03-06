const PACKAGES = {
  GET_CATEGORIES: "/package/categories",
  GET_CATEGORY_PACKAGES: (id: string | undefined) => `/package/category/${id}`,
};

const ABOUT = {
  GET: "/about",
};

const CLIENTS = {
  GET: "/our-clients",
};

const API_ROUTES = {
  PACKAGES,
  ABOUT,
  CLIENTS,
};

export default API_ROUTES;
