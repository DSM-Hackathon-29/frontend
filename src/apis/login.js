import { instance } from "./instance";

export const useLogin = () => {
  const onLogin = (id, pass) => {
    localStorage.setItem("access_token", null);
    instance
      .post("/auth/tokens", {
        account_id: id,
        password: pass,
      })
      .then((value) => {
        console.log(1234, value);
        localStorage.setItem(
          "access_token",
          JSON.stringify(value.data.access_token)
        );
        window.location.href = "/suggestion/CREATED";
      });
  };
  return { onLogin };
};
