import { styled } from "styled-components";
import Tag from "./Tag";
import Location from "./Location";
import LocationView from "./LocationView";
import { useEffect, useState } from "react";
import {
  deleteSuggestion,
  getSuggestionDetail,
  registSuggestion,
  solveSuggestion,
} from "../apis/suggestion";

export default function SuggestBlock({ title, id, type, date, registered }) {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({
    id: 0,
    title: "",
    created_at: "",
    image_url: "",
    type: "",
    latitude: "", //위도
    longitude: "", //경도
    description: "",
  });

  const time = new Date(date).toLocaleTimeString();
  useEffect(() => {
    if (toggle) {
      getSuggestionDetail(id).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    }
  }, [toggle]);

  return (
    <>
      {toggle && (
        <Background
          onClick={() => {
            setToggle(false);
          }}
        >
          <ModalBox
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span
              onClick={() => {
                setToggle(false);
              }}
            >
              x
            </span>
            <h1>{data.title}</h1>
            <p>
              건의 시각
              <span>
                {new Date(date).toLocaleDateString()}{" "}
                {time.slice(0, time.length - 3)}
              </span>
            </p>
            <p>
              건의 유형 <Tag name={data.type} />
            </p>
            <p>장소</p>
            <div style={{ display: "flex" }}>
              <div>
                <LocationView
                  height={170}
                  width={450}
                  locx={data.latitude}
                  locy={data.longitude}
                />
                <p
                  style={{
                    margin: "14px 0 10px",
                  }}
                >
                  사유
                </p>
                <Content>{data.description}</Content>
              </div>
              {data.image_url && (
                <Img style={{ backgroundImage: `url(${data.image_url})` }} />
              )}
            </div>
            <ButtonWrapper>
              <div></div>
              <div>
                <Button2
                  onClick={() => {
                    deleteSuggestion(id).then((res) => {
                      window.location.href += "";
                    });
                  }}
                >
                  삭제
                </Button2>
                <Button
                  onClick={() => {
                    if (registered) {
                      solveSuggestion(id).then((res) => {
                        window.location.href += "";
                      });
                    } else {
                      registSuggestion(id).then((res) => {
                        window.location.href += "";
                      });
                    }
                  }}
                >
                  {registered ? "해결" : "접수"}
                </Button>
              </div>
            </ButtonWrapper>
          </ModalBox>
        </Background>
      )}
      <Wrapper
        onClick={() => {
          setToggle(true);
        }}
      >
        <div>
          <p>{title}</p>
          <Tag name={type} />
        </div>
        <span>
          {new Date(date).toLocaleDateString()} {time.slice(0, time.length - 3)}
        </span>
        <Detail>상세 내용 ></Detail>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  flex-shrink: 0;
  cursor: pointer;
  width: 100%;
  height: 100px;
  padding: 22px;
  display: flex;
  font-weight: 500;
  font-size: 18px;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  > div {
    display: flex;
    gap: 20px;
  }
  justify-content: space-between;
  position: relative;
`;

const Detail = styled.p`
  position: absolute;
  bottom: 17px;
  left: 24px;
  color: #b0b0b0;
  font-size: 16px;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;

const ModalBox = styled.div`
  position: relative;
  width: fit-content;
  height: 730px;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 20px;
  font-size: 16px;
  color: #555;
  > h1 {
    color: #121212;
    font-size: 20px;
  }
  > p {
    display: flex;
    gap: 10px;
  }
  > span {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 30px;
    text-align: center;
    cursor: pointer;
    font-size: 30px;
  }
`;

const Content = styled.div`
  border: 1px solid #eeeeee;
  width: 450px;
  height: 190px;
  padding: 10px;
  overflow-y: scroll;
`;

const Button = styled.button`
  background: #33897a;
  border: none;
  width: 91px;
  height: 50px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
`;

const Button2 = styled.button`
  background: white;
  border: none;
  width: 91px;
  height: 50px;
  border-radius: 5px;
  color: black;
  font-size: 14px;
  border: 1px solid #dddddd;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    gap: 10px;
    display: flex;
  }
`;

const Img = styled.div`
  width: 380px;
  height: 405px;
  right: 40px;
  bottom: 125px;
  display: flex;
  margin-left: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
