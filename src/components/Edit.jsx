import { styled } from "styled-components";
import Input from "./Input";
import Tag from "./Tag";
import Location from "./Location";
import { useState } from "react";
import { types } from "util";
import { patchInstitution } from "../apis/institution";

export default function Edit() {
  const [type, setType] = useState([]);
  const [value, setValue] = useState("");
  const [pos, setPos] = useState([]);

  const onChangeType = (e) => {
    setType([...type, e.target.id]);
    console.log(type);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <h1>기관 정보 수정</h1>
        <InputForm>
          <div>
            <div>
              <Input
                name={"기관명"}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
            <div>
              <p>건의 종류</p>
              <label>
                <input type="radio" id="FACILITIES" onChange={onChangeType} />
                <Tag name="FACILITIES" />
              </label>
              <label>
                <input type="radio" id="TRAFFIC" onChange={onChangeType} />
                <Tag name="TRAFFIC" />
              </label>
              <label>
                <input type="radio" id="OLD" onChange={onChangeType} />
                <Tag name="OLD" />
              </label>
              <label>
                <input type="radio" id="LIVING" onChange={onChangeType} />
                <Tag name="LIVING" />
              </label>
              <label>
                <input type="radio" id="ECT" onChange={onChangeType} />
                <Tag name="기타" />
              </label>
            </div>
          </div>
          <p>건의 범위</p>
          <MapWrapper>
            <Location
              width={1040}
              height={440}
              onChange={(value) => {
                setPos(value);
              }}
            />
          </MapWrapper>
          <Button
            type="button"
            onClick={() => {
              console.log({
                name: value,
                suggestion_type: type,
                range_points: pos,
              });
              patchInstitution(value, type, pos).then((res) => {
                window.location.href = "/suggestion/CREATED";
              });
            }}
          >
            수정 완료
          </Button>
        </InputForm>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 1030px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 102px;
  > h1 {
    font-size: 30px;
  }
`;

const InputForm = styled.form`
  margin-top: 68px;
  > p {
    margin-left: 10px;
    color: #555;
    font-size: 14px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    > div {
      width: 400px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      > p {
        font-size: 14px;
        color: #555;
        margin-bottom: 4px;
      }
      > label {
        display: flex;
        gap: 16px;
        align-items: center;
        > input {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 440px;
`;

const Button = styled.button`
  background: #33897a;
  border: none;
  width: 91px;
  height: 50px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  margin-top: 30px;
  margin-left: 936px;
  margin-bottom: 100px;
`;
