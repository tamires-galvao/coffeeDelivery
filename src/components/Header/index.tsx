import { HeaderContainer, HeaderContent } from "./styles";
import logoImg from "../../assets/logo.svg";
import { Button } from "../Button";
import { MapPin, ShoppingCart } from "phosphor-react";
import { ButtonsWrapper } from "../Button/styles";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export function Header() {
  const { cart } = useCart();

  // Soma todas as quantidades dos itens no carrinho
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/">
          <img src={logoImg} alt="Logo da empresa" />
        </Link>
        <ButtonsWrapper>
          <Button height="2.38rem" className="purple_button no-focus" aria-label="Localização">
            <MapPin size={22} weight="fill" />
            <span>Cianorte, PR</span>
          </Button>
          <Link
            to="/cart"
            aria-disabled={cart.length === 0}
            style={cart.length === 0 ? { pointerEvents: "none", opacity: 0.5 } : {}}
          >
            <Button
              height="2.38rem"
              className="yellow_ligth_button"
              badge={totalItems} // Passa a quantidade total
              aria-label="Carrinho de compras"
            >
              <ShoppingCart size={22} weight="fill" />
            </Button>
          </Link>
        </ButtonsWrapper>
      </HeaderContent>
    </HeaderContainer>
  );
}
