import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Cart } from "../pages/Cart";
import { Success } from "../pages/Success";
import { DefaultLayout } from "../layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />  {/* Página inicial */}
        <Route path="cart" element={<Cart />} />  {/* Página de Checkout */}
        <Route path="success" element={<Success />} />  {/* Página de Sucesso */}
      </Route>
    </Routes>
  );
}