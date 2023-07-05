import { instance } from "./instance";

export const getStatus = () => {
  const res = instance.get("/statistic");
  return res;
};
