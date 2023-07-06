import { styled } from "styled-components";

export default function Input({
  name,
  onChange,
  value,
  readonly,
  password,
  id,
}) {
  return (
    <Wrapper>
      <p>{name}</p>
      {!readonly ? (
        <input
          type={password ? "password" : "text"}
          placeholder={name}
          onChange={onChange}
          value={value}
          id={id}
        />
      ) : (
        <input
          type={password ? "password" : "text"}
          placeholder={name}
          onChange={onChange}
          value={value}
          id={id}
          readOnly
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  > p {
    height: 22px;
    font-size: 14px;
    color: #555555;
    font-family: "Noto Sans KR", sans-serif;
    margin-left: 10px;
  }
  > input {
    width: 100%;
    height: 46px;
    border: 2px solid #999999;
    border-radius: 5px;
    font-size: 16px;
    padding: 0 18px;
  }
`;
