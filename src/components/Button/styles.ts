import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
import { mixins } from "../../styles/mixins";

export const StyledButton = styled.button<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  outline: none;
  box-shadow: none;
  position: relative; /* Importante para o posicionamento do badge */

  &.purple_button {
    background-color: ${(props) => props.theme["purple-300"]};

  }

  &.purple_button span{
    color: ${(props) => props.theme["purple-700"]};
  }

  &.purple_button svg{
    color: ${(props) => props.theme["purple-500"]};
    flex-shrink: 0; /* Impede que o ícone desapareça */ 
   }

   &.yellow_ligth_button {
    background-color: ${(props) => props.theme["yellow-300"]};
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme["yellow-500"]};
    }
  }

  &.yellow_ligth_button svg{
    color: ${(props) => props.theme["yellow-700"]};
   } 

  &.no-focus {
    &:focus,
    &:active {
      outline: none;
      box-shadow: none;
    }
  }

  span {
    white-space: nowrap; 
    ${mixins.fonts.textS};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CicleButton = styled.button<{ color?: keyof typeof defaultTheme }>`
  background-color: ${(props) => props.color ? props.theme[props.color] : props.theme["purple-300"]};;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  outline: none;
  color: ${(props) => props.theme["white"]};
  &:hover {
    opacity: 0.8;
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }

`;

export const CartBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  transform: translate(50%, -50%);
  background-color: ${(props) => props.theme["yellow-700"]};
  color: ${(props) => props.theme["white"]};;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  visibility: ${(props) => (props.children === "0" ? "hidden" : "visible")}; /* Oculta quando 0 */
`;