import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin:0px;
        padding:0px;
        box-sizing:border-box;
        font-family: "Noto Sans KR",sans-serif;
    }
    button{
        cursor: pointer;
    }
    ::-webkit-scrollbar {
        width: 5px;
    }
`;
