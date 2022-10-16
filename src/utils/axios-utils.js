import axios from "axios";

const client = axios.create({
  baseURL: "https://www.rawaa.somee.com",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export const request = ({ ...options }) => {
  return client(options);
};
