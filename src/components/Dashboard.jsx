import { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getStatus } from "../apis/dashboard";
import { styled } from "styled-components";
import SuggestBlock from "./SuggestBlock";

// Chart.js 스케일 초기화

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement
);
const jsonData = {
  current_situation: [],
  this_week_keyword: [],
  keyword: [],
  related_suggestions: [],
};
export default function DashBoard() {
  const [data, setData] = useState(jsonData);
  useEffect(() => {
    getStatus().then((res) => {
      setData(res.data);
    });
  }, []);
  const complaintsData = data.current_situation.map((item) => item.count);
  const complaintsLabels = data.current_situation.map((item) => item.date);

  const chart1 = {
    labels: complaintsLabels,
    datasets: [
      {
        label: "민원 수", // 순서 변경
        data: complaintsData,
        type: "bar",
        backgroundColor: "#9cb396b1",
        borderColor: "#9CB396",
        borderWidth: 1,
      },
    ],
  };

  const chart1options = {
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        offset: 0,
        color: "black",
        font: {
          weight: "bold",
        },
      },
    },
  };
  // 차트 1: 민원 현황

  // 차트 2: 이번 주 키워드
  const keywordData = data.this_week_keyword.map((item) => item.count);
  const keywordLabels = data.this_week_keyword.map((item) => item.name);

  const chart2 = {
    labels: keywordLabels,
    datasets: [
      {
        data: keywordData,
        backgroundColor: [
          "#CAD7B9",
          "#9CB396",
          "#5D9071",
          "#40827E",
          "#4F749F",
          "#6F6E94",
        ],
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };
  const chart2options = {
    plugins: {
      datalabels: {
        formatter: function (value, context) {
          return `${context.chart.data.labels[context.dataIndex]}\n ${value}건`;
        },
        color: "#FFFFFF",
        font: {
          weight: "bold",
        },
      },
    },
  };

  const MOST_KEYWORD = data.keyword.length ? data.keyword[0].name : "";

  return (
    <Wrapper>
      <ContentWrapper>
        <h1 id="dashTitel">대시보드</h1>
        <Graphs class="charts">
          <Graph1 class="complaints-chart">
            <h2 id="chartCanvas1">민원 현황</h2>
            <Bar
              plugins={[ChartDataLabels]}
              style={{ height: "330px", width: "430px" }}
              id="chartCanvas-1"
              data={chart1}
              options={chart1options}
            />
          </Graph1>
          <KeysWrapper>
            <Graph2 class="keyword-chart">
              <h2 id="chartCanvas1">이번 주 키워드</h2>
              <Doughnut
                plugins={[ChartDataLabels]}
                data={chart2}
                options={chart2options}
                id="chartCanvas-2"
                style={{ height: "400px", width: "330px" }}
              />
            </Graph2>
            <Weekkeys>
              {data.this_week_keyword.map((value) => (
                <p
                  style={{
                    fontSize: `${
                      30 - (value.rank - 1) * 3 > 20
                        ? 30 - (value.rank - 1) * 3
                        : 20
                    }px`,
                  }}
                >
                  {value.rank}위 {value.name} ({value.count}건)
                </p>
              ))}
            </Weekkeys>
          </KeysWrapper>
        </Graphs>
        <BottomContents>
          <TotalKeysWrapper>
            <h2>전체 키워드</h2>
            <div>
              {data.keyword.map((value) => (
                <p
                  style={{
                    fontSize: `${
                      30 - (value.rank - 1) * 3 > 20
                        ? 30 - (value.rank - 1) * 3
                        : 20
                    }px`,
                  }}
                >
                  {value.rank}위 {value.name} ({value.count}건)
                </p>
              ))}
            </div>
          </TotalKeysWrapper>
          <RelationWrapper>
            <h2>{MOST_KEYWORD} 관련 건의</h2>
            <div>
              {data.related_suggestions.map((value) => {
                const props = {
                  title: value.title,
                  id: value.id,
                  type: value.type,
                  date: value.created_at,
                };
                return <SuggestBlock {...props} />;
              })}
            </div>
          </RelationWrapper>
        </BottomContents>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  h2 {
    font-weight: normal;
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const Graph1 = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Graph2 = styled.div`
  width: 400px;
`;
const ContentWrapper = styled.div`
  width: 1300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 36px;
  > h1 {
    font-size: 30px;
    margin-bottom: 30px;
    color: #555;
  }
`;

const Graphs = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Weekkeys = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 40px;
`;

const KeysWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

const BottomContents = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const TotalKeysWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 4px;
    margin-left: 4px;
  }
`;

const RelationWrapper = styled.div`
  width: 70%;
  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 249px;
    overflow-y: auto;
    padding: 10px;
  }
`;
