import { ShoppingCart } from "phosphor-react";
import {
  CardContainer,
  CartButton,
  Controls,
  ImageContainer,
  Price,
  ProductDescription,
  ProductImage,
  ProductName,
  Quantity,
  QuantityButton,
  TagsContainer,
  StyledTag, // Adicione um estilo específico para as tags
} from "./styles";

interface ProductCardProps {
    image: string;
    name: string;
    description: string;
    price: string;
    tags: string[];
  }

export function ProductCard({ image, name, description, price, tags } : ProductCardProps) {
  return (
    <CardContainer>
      <ImageContainer>
        <ProductImage src={image} alt={name} />
      </ImageContainer>
      <TagsContainer>
        {tags.map((tag, index) => (
          <StyledTag key={index}>{tag}</StyledTag>
        ))}
      </TagsContainer>
      <ProductName>{name}</ProductName>
      <ProductDescription>{description}</ProductDescription>
      <Price>R$ {price}</Price>
      <Controls>
        <QuantityButton>-</QuantityButton>
        <Quantity>1</Quantity>
        <QuantityButton>+</QuantityButton>
        <CartButton>
          <ShoppingCart size={18} />
        </CartButton>
      </Controls>
    </CardContainer>
  );
}
