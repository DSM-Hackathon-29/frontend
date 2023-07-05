import { styled } from "styled-components";
import LoginImg from "../assets/LoginImg.png";
import Input from "./Input";
import { useLogin } from "../apis/login";
import { useState } from "react";

export default function Login() {
  const { onLogin } = useLogin();
  const [data, setData] = useState({
    id: "",
    password: "",
  });
  return (
    <Wrapper>
      <Background />
      <LoginBox>
        <img src={LoginImg} alt="" />
        <InputForm>
          <h1>로그인</h1>
          <div>
            <Input
              name={"이름"}
              onChange={(e) => {
                setData({ ...data, id: e.target.value });
              }}
            />
            <Input
              name={"비밀번호"}
              password
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
          <Button
            type="button"
            onClick={() => {
              onLogin(data.id, data.password);
            }}
          >
            로그인
          </Button>
        </InputForm>
      </LoginBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 76px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  background-color: #b6ccb9;
  position: absolute;
  z-index: -1;
  top: 0px;
  height: 45%;
  width: 100%;
`;

const LoginBox = styled.div`
  width: 970px;
  height: 600px;
  border: 2px solid #b5b5b5;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background: white;
  padding: 12px 10px;
  display: flex;
`;

const InputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 68px 60px;
  > h1 {
    margin-bottom: 48px;
  }
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

const Button = styled.button`
  background: #5c6e56;
  border: none;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  margin-top: 120px;
`;
