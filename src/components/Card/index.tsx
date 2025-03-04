import { Check, ShoppingCart } from "phosphor-react";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/UseCart";
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
  const { addItem } = useCart();

  function incrementQuantity() {
    setQuantity((state) => state + 1);
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1);
    }
  }

  function handleAddItem() {
    addItem({ id: coffee.id, quantity });
    setIsItemAdded(true);
    setQuantity(1);
  }

  useEffect(() => {
    let timeout: number;

    if (isItemAdded) {
      timeout = setTimeout(() => {
        setIsItemAdded(false);
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
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
      <Price>R$ {coffee.price.toFixed(2)} </Price>
      <Controls>
        <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
        <Quantity>{quantity}</Quantity>
        <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
        <CartButton disabled={isItemAdded} onClick={handleAddItem}>
          {isItemAdded ? (
            <Check weight="fill" size={18}  />
          ) : (
            <ShoppingCart size={18} weight="fill"  />
          )}
        </CartButton>
      </Controls>
    </CardContainer>
  );
}
