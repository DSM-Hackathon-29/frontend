import axios from "axios";

export const instance = axios.create({
  baseURL: "https://test.aliens-dms.com",
  timeout: 10000,
});

async function getToken() {
  return JSON.parse(localStorage.getItem("access_token"));
}

instance.interceptors.request.use(
  async function (config) {
    const accessToken = await getToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    console.log(error);
    if (error.response) {
      const {
        response: { status },
      } = error;
      console.log(status);
      if (status === 401) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
