import { styled } from "styled-components";
import Input from "./Input";
import Tag from "./Tag";
import Location from "./Location";
import LocationWithClick from "./LocationWIthClick";
import { useEffect, useState } from "react";
import { suggest, useSuggestion } from "../apis/suggestion";
import { uploadImg } from "../apis/image";

export default function MobileSuggest() {
  const [address, setAddress] = useState("");
  const [pos, setPos] = useState();
  const [value, setValue] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
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
            <Input
              name={"전화번호 (선택)"}
            />

            <Input
              name={"제목"}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />

            <Input name={"건의 장소 (지도 클릭)"} value={address} readonly />
          </div>
          <MapWrapper>
            <LocationWithClick
              width={1040}
              height={300}
              onChange={(value, pos) => {
                setAddress(value);
                setPos(pos);
              }}
            />
          </MapWrapper>
          <div>
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
          <p style={{ margin: "14px 10px 10px" }}>사진</p>
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
          <p style={{ margin: "14px 10px 10px" }}>건의 내용</p>
          <TextArea onChange={(e) => setDesc(e.target.value)} />
          <Button
            type="button"
            onClick={() => {
              if (
                value &&
                type &&
                `${pos.Ma}` &&
                `${pos.La}` &&
                description
              ) {
                suggest(
                  value,
                  type,
                  `${pos.Ma}`,
                  `${pos.La}`,
                  img,
                  description
                ).then((res) => {
                  alert("건의가 제출되었습니다");
                  window.location.href += "";
                });
              } else {
                alert("데이터를 모두 입력해주세요.");
              }
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
  position: relative;
  top: -50px;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  padding-bottom: -50px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  > h1 {
    font-size: 30px;
    margin-left: 14px;
  }
`;

const InputForm = styled.form`
  margin-top: 30px;
  p {
    margin-left: 10px;
    color: #555;
    font-size: 14px;
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    > p {
      font-size: 14px;
      color: #555;
      margin-bottom: 4px;
    }
  }
  #radio {
    > p {
      margin-left: 10px;
      margin-top: 12px;
    }
    > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
    }
    label {
      display: flex;
      gap: 16px;
      align-items: center;
      > input {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 340px;
  margin-top: 10px;
`;

const Button = styled.button`
  background: #33897a;
  border: none;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  margin-top: 30px;
`;

const ImgInput = styled.div`
  height: 150px;
  aspect-ratio: 1/1;
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
  width: 100%;
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
