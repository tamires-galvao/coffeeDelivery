import styled from 'styled-components';

export const CardContainer = styled.div`
  background: ${props => props.theme['gray-150']};;
  border-radius: 6px 36px;
  padding: 16px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

export const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: -32px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  align-self: center;
`;

export const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 10px 0;
`;

export const Tag = styled.span`
  background: ${props => props.theme['yellow-300']};
  color: ${props => props.theme['yellow-700']};
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  margin: 5px 0;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 10px;
`;

export const Price = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const QuantityButton = styled.button`
  background: #e0e0e0;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;

export const Quantity = styled.span`
  margin: 0 10px;
  font-size: 16px;
`;

export const CartButton = styled.button`
  background: ${props => props.theme['purple-700']};
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

export const StyledTag = styled.span`
  background: ${props => props.theme['yellow-300']};
  color: ${props => props.theme['yellow-700']};
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;