import axios from "axios";

const client = axios.create({ baseURL: "https://www.rawaa.somee.com" });

export const request = ({ ...options }) => {
  return client(options);
};
