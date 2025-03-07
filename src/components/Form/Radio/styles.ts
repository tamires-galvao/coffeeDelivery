import styled from 'styled-components'

import { mixins } from "../../../styles/mixins";

export const Container = styled.label`
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  background-color: ${(props) => props.theme["gray-300"]};
  color: ${(props) => props.theme["gray-700"]};
  text-transform: uppercase;
  ${mixins.fonts.buttonM};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme["gray-500"]};;
  }

  &[data-state='true'] {
    background-color: ${(props) => props.theme["purple-300"]};
    border-color: ${(props) => props.theme["purple-500"]};
  }

  input {
    display: none;
  }

  svg {
    color: ${(props) => props.theme["purple-300"]};
  }
`