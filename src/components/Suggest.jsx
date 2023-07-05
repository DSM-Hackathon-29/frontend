import { styled } from "styled-components";
import Input from "./Input";
import Tag from "./Tag";
import Location from "./Location";
import LocationWithClick from "./LocationWIthClick";
import { useEffect, useState } from "react";
import { suggest, useSuggestion } from "../apis/suggestion";
import { uploadImg } from "../apis/image";

export default function Suggest() {
  const [address, setAddress] = useState("");
  const [pos, setPos] = useState();
  const [value, setValue] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("ECT");
  const [description, setDesc] = useState("");

  const onChangeType = (e) => {
    setType(e.target.id);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <h1>건의하기</h1>
        <InputForm>
          <div>
            <div>
              <Input
                name={"제목"}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <Input name={"전화번호 (전체)"} />
              <Input name={"건의 장소"} value={address} readonly />
            </div>
            <div id="radio">
              <p>건의 종류</p>
              <div>
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="FACILITIES"
                    onChange={onChangeType}
                  />
                  <Tag name="FACILITIES" />
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="TRAFFIC"
                    onChange={onChangeType}
                  />
                  <Tag name="TRAFFIC" />
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="OLD"
                    onChange={onChangeType}
                  />
                  <Tag name="OLD" />
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="LIVING"
                    onChange={onChangeType}
                  />
                  <Tag name="LIVING" />
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="ECT"
                    onChange={onChangeType}
                  />
                  <Tag name="기타" />
                </label>
              </div>
            </div>
          </div>
          <MapWrapper>
            <LocationWithClick
              width={1040}
              height={440}
              onChange={(value, pos) => {
                setAddress(value);
                setPos(pos);
              }}
            />
          </MapWrapper>
          <p>사진</p>
          <InputLabel>
            <ImgInput>
              {img && <img src={img} alt="" />}
              <span>{"+"}</span>
            </ImgInput>
            <input
              type="file"
              onChange={(e) => {
                const formData = new FormData();
                Array.from(e.target.files).forEach((el) => {
                  formData.append("file", el);
                });
                console.log(formData);
                uploadImg(formData).then((res) => setImg(res.data.file_url));
              }}
            />
          </InputLabel>
          <p>건의 내용</p>
          <TextArea onChange={(e) => setDesc(e.target.value)} />
          <Button
            type="button"
            onClick={() => {
              suggest(
                value,
                type,
                `${pos.Ma}`,
                `${pos.La}`,
                img,
                description
              ).then((res) => {
                window.location.href = "/suggestion/CREATED";
              });
            }}
          >
            제출
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
    margin-top: 24px;
    margin-bottom: 16px;
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
    }
  }
  #radio {
    > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
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
  margin-top: 24px;
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

const ImgInput = styled.div`
  width: 200px;
  height: 200px;
  background: #f9f9f9;
  border-radius: 10px;
  font-size: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  cursor: pointer;
  > span {
    width: 100%;
  }
  > img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const InputLabel = styled.label`
  width: 200px;
  position: relative;
  display: block;
  > input {
    opacity: 0;
    position: absolute;
    z-index: -99;
  }
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 260px;
  border: 1px solid #999;
  border-radius: 10px;
  padding: 10px;
`;
