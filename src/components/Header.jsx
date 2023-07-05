import { styled } from "styled-components";
import Logo from "../assets/logo.png";

export default function Header() {
  return (
    <Wrapper>
      <img
        src={Logo}
        alt=""
        onClick={() => (window.location.href = "/suggestion/CREATED")}
      />
      <div id="links">
        <span
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          대시보드
        </span>
        <span
          onClick={() => {
            window.location.href = "/edit";
          }}
        >
          기관 설정
        </span>
        <span
          onClick={() => {
            window.location.href = "/suggest";
          }}
        >
          건의하기
        </span>
      </div>
      <Border />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 76px;
  top: 0px;
  left: 0px;
  background: white;
  z-index: 2;
  padding: 0 135px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > img {
    cursor: pointer;
  }
  span {
    cursor: pointer;
    text-align: center;
  }
  > #links {
    width: 270px;
    display: flex;
    justify-content: space-between;
  }
`;

const Border = styled.div`
  border-bottom: 1px solid #dddddd;
  width: calc(100% - 70px);
  position: absolute;
  height: 100%;
  bottom: 0px;
  left: 35px;
  z-index: -1;
`;
