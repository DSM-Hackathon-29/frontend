import { 교통, 기타, 노후시설, 생활불편, 시설물 } from "../assets/index";

export default function Tag({ name, color }) {
  const cases = () => {
    switch (name) {
      case "FACILITIES": {
        return <img src={시설물} alt="" />;
      }
      case "TRAFFIC": {
        return <img src={교통} alt="" />;
      }
      case "OLD": {
        return <img src={노후시설} alt="" />;
      }
      case "LIVING": {
        return <img src={생활불편} alt="" />;
      }
      default:
        return <img src={기타} alt="" />;
    }
  };
  return <div>{cases()}</div>;
}
