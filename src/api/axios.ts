import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Accept-Language": "ru",
  },
});

export default axios;
