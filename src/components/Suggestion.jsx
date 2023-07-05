import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SuggestBlock from "./SuggestBlock";
import { getSuggestion, useSuggestion } from "../apis/suggestion";
import { useNavigate, useParams } from "react-router-dom";

export default function Suggestion() {
  const [toggle, setToggle] = useState(true);
  const [suggestData, setData] = useState([]);
  const [temp, setTemp] = useState(0);
  const navigate = useNavigate();
  const { mode } = useParams();

  useEffect(() => {
    getSuggestion(mode).then((res) => {
      const arr = res.data.suggestions.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setData(arr);
    });
    setToggle(mode === "CREATED");
  }, [mode]);

  return (
    <Wrapper>
      <ContentWrapper>
        <div id="head">
          <h1>건의사항</h1>
          <Toggle>
            <p
              style={{ color: toggle ? "#5C6E56" : "#c2c2c2" }}
              onClick={() => navigate("/suggestion/CREATED")}
            >
              신규
            </p>
            <p
              style={{ color: !toggle ? "#5C6E56" : "#c2c2c2" }}
              onClick={() => navigate("/suggestion/REGISTERD")}
            >
              접수
            </p>
          </Toggle>
        </div>
        <Suggestions>
          {suggestData.map((value) => (
            <SuggestBlock
              date={value.created_at}
              id={value.id}
              title={value.title}
              type={value.type}
              registered={!toggle}
            />
          ))}
        </Suggestions>
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
  > #head {
    display: flex;
    justify-content: space-between;
  }
  > h1 {
    font-size: 30px;
  }
`;

const Toggle = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  font-weight: bold;
  display: flex;
  gap: 18px;
  > p {
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s;
  }
`;

const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  height: 600px;
  border-radius: 30px;
  padding: 10px 10px;
  margin-top: 30px;
  overflow-y: scroll;
`;
