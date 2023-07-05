import { instance } from "./instance";

export const patchInstitution = (name, suggestion_type, range_points) => {
  const res = instance.patch("/institution", {
    name,
    suggestion_type,
    range_points,
  });
  return res;
};
