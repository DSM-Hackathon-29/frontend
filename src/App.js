import { styled } from "styled-components";
import { GlobalStyles } from "./GlobalStyle";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Suggestion from "./components/Suggestion";
import Edit from "./components/Edit";
import Suggest from "./components/Suggest";
import MobileSuggest from "./components/Mobile";

export default function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <GlobalStyles />
        {window.location.pathname !== "/suggest/mobile" && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/suggestion/:mode" element={<Suggestion />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/suggest/mobile" element={<MobileSuggest />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 76px;
  width: 100%;
  min-height: calc(100% - 76px);
`;
