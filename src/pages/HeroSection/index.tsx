import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import { BenefitItem, BenefitsList, Container, ImageContainer, TextContainer } from "./styled";
import heroImg from "../../assets/img/copo_de_cafe.png";
import { CicleButton } from "../../components/Button/styles";

export function HeroSection () {  
    return (
        <Container>
            <TextContainer>
                <h1>Encontre o café perfeito para qualquer hora do dia</h1>
                <p>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</p>
                <BenefitsList>
                    <BenefitItem>
                        <CicleButton color="yellow-700">
                            <ShoppingCart size={24} weight="fill" />
                        </CicleButton>
                        <span>Compra Simples e segura</span>
                    </BenefitItem>
                    <BenefitItem>
                        <CicleButton color="black-900">
                            <Package size={24}  weight="fill"/>
                        </CicleButton>
                        <span>Embalagem mantém o café intacto</span>
                    </BenefitItem>
                    <BenefitItem>
                        <CicleButton color="yellow-500">
                            <Timer size={24}  weight="fill"/>
                        </CicleButton>
                        <span>Entrega rápida e rastreada</span>
                    </BenefitItem>
                    <BenefitItem>
                        <CicleButton color="purple-500" >
                             <Coffee size={24}  weight="fill"/>
                        </CicleButton>
                        <span>O café chega fresquinho até você</span>
                    </BenefitItem>
                </BenefitsList>
            </TextContainer>
            <ImageContainer>
                <img src={heroImg} alt="Copo de Café" />
            </ImageContainer>
        </Container>    )
 }
    