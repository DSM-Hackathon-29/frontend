import { instance } from "./instance";

export const getSuggestion = (type) => {
  return instance.get(`/suggestion?status=${type}`);
};

export const suggest = (title, type, lat, lon, img, description) => {
  return instance
    .post("/suggestion", {
      title,
      type,
      latitude: lat, //위도
      longitude: lon, //경도
      image_url: img,
      description,
    })
    .then((res) => {
      console.log(res);
      /*     window.location.href = "/suggestion"
       */
    });
};

export const getSuggestionDetail = (id) => {
  const res = instance.get(`/suggestion/${id}`);
  return res;
};

export const registSuggestion = (id) => {
  const res = instance.post(`/suggestion/register/${id}`);
  return res;
};

export const solveSuggestion = (id) => {
  const res = instance.post(`/suggestion/solve/${id}`);
  return res;
};

export const deleteSuggestion = (id) => {
  const res = instance.delete(`/suggestion/${id}`);
  return res;
};
