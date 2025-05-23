import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme['yellow-700']};
}

body {
    background: ${props => props.theme['gray-50']};
    color: ${props => props.theme['gray-700']};
    -webkit-font-smoothing: antialiased;
}

body, input, button, textarea {
    font: 400 1rem 'Roboto', sans-serif;
}

` 