import { HeaderContainer, HeaderContent } from "./styles";
import logoImg from '../../assets/logo.svg';
import { Button } from "../Button";
import { MapPin, ShoppingCart } from "phosphor-react";
import { ButtonsWrapper } from "../Button/styles";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="Logo da empresa" />
        <ButtonsWrapper>
          <Button height="2.38rem" className="purple_button no-focus" aria-label="Localização">
            <MapPin size={22} weight="fill" />
            <span>Porto Alegre, RS</span>
          </Button>
          <Button height="2.38rem" className="yellow_ligth_button" aria-label="Carrinho de compras">
            <ShoppingCart size={22} weight="fill" />
          </Button>
        </ButtonsWrapper>
      </HeaderContent>
    </HeaderContainer>
  );
}
