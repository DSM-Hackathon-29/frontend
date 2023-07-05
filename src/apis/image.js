import { instance } from "./instance";

export const uploadImg = (formdata) => {
  const res = instance.post("/image", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
