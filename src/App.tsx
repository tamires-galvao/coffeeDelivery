import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { CartContextProvider } from "./context/CartProvider";
import { Router } from "./routes/Router"; 

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <CartContextProvider>
          <Router /> 
        </CartContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}