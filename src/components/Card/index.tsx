import { Check, ShoppingCart } from "phosphor-react";
import { useEffect, useState, useCallback } from "react";
import { useCart } from "../../hooks/useCart";
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
  StyledTag,
} from "./styles";

type ProductCardProps = {
  coffee: {
    image: string;
    name: string;
    description: string;
    price: number;
    tags: string[];
    id: string;
  };
};

export function ProductCard({ coffee }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const { addItem, getItemQuantity } = useCart();

  const currentQuantity = getItemQuantity(coffee.id);

  const incrementQuantity = useCallback(() => {
    setQuantity((state) => state + 1);
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((state) => (state > 1 ? state - 1 : state));
  }, []);

  const handleAddItem = useCallback(() => {
    addItem({ id: coffee.id, quantity });
    setIsItemAdded(true);
  }, [coffee.id, quantity, addItem]);

  useEffect(() => {
    if (isItemAdded) {
      const timeout = setTimeout(() => {
        setIsItemAdded(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isItemAdded]);

  return (
    <CardContainer>
      <ImageContainer>
        <ProductImage src={coffee.image} alt={coffee.name} />
      </ImageContainer>
      <TagsContainer>
        {coffee.tags.map((tag, index) => (
          <StyledTag key={index}>{tag}</StyledTag>
        ))}
      </TagsContainer>
      <ProductName>{coffee.name}</ProductName>
      <ProductDescription>{coffee.description}</ProductDescription>
      <Price>R$ {coffee.price.toFixed(2)}</Price>
      <Controls>
        <QuantityButton aria-label="Diminuir quantidade" onClick={decrementQuantity} >
          -
        </QuantityButton>
        <Quantity>{quantity}</Quantity>
        <QuantityButton aria-label="Aumentar quantidade" onClick={incrementQuantity}>
          +
        </QuantityButton>
        <CartButton 
          disabled={isItemAdded} 
          onClick={handleAddItem} 
          aria-label="Adicionar ao carrinho"
        >
          {isItemAdded ? <Check weight="fill" size={18} /> : <ShoppingCart size={18} weight="fill" />}
        </CartButton>
      </Controls>
      {currentQuantity > 0 && <p>Já no carrinho: {currentQuantity}</p>}
    </CardContainer>
  );
}
