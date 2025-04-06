import styled from 'styled-components'

export const Container = styled.div`
  padding: 8px;
  background-color: ${(props) => props.theme["gray-150"]};
  border-radius: 6px;
  
  display: flex;
  gap: 4px;

  button {
    background-color: transparent;
    display: flex;
    align-items: center;
    border:none;
  }

  button svg {
    color: ${(props) => props.theme["purple-500"]};

    transition: all 0.2s;

    &:hover {
      color: ${(props) => props.theme["purple-700"]};
    }
  }

  span {
    padding-top: 2px;
    color: ${(props) => props.theme["gray-700"]};
  }
`