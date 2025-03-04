import { BrowserRouter, Outlet } from "react-router-dom"; // Importar o BrowserRouter
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Home } from "./pages/Home";
import { CartContextProvider } from "./context/CartProvider";

export function App() {
  return (
    <BrowserRouter> 
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <CartContextProvider>
          <Home />
          <Outlet/>
        </CartContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
