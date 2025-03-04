import styled from "styled-components";
import { mixins } from "../../styles/mixins";

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; /* Garante adaptação para telas menores */
  margin: 0 auto;
  padding: 2rem 1rem;
  background: linear-gradient(to right, #fafafa, #f5f5f5);
  max-width: 1120px;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const TextContainer = styled.div`
  max-width: 600px;
  flex: 1;

  h1 {
    ${mixins.fonts.titleXL}
    color: ${(props) => props.theme["black-900"]};
    margin-bottom: 1rem;
  }

  p {
    ${mixins.fonts.textL}
    color: ${(props) => props.theme["gray-700"]};
    margin-bottom: 2rem;
  }

  h2 {
    ${mixins.fonts.titleL}
    color: ${(props) => props.theme["gray-700"]};
  }

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

export const BenefitsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #444;
`;

export const ImageContainer = styled.div`
  position: relative;
  max-width: 400px;
  flex: 1;
  
  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 1024px) {
    max-width: 80%;
    margin-top: 2rem;
  }
`;
