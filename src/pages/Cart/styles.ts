import styled from 'styled-components'

import { mixins } from '../../styles/mixins'

export const Container = styled.main`
  display: flex;
  max-width: 1160px;
  padding: 40px 20px;
  margin: 0 auto;
  gap: 32px;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    ${mixins.fonts.titleXS};
    color: ${(props) => props.theme["black-900"]};
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`

export const FormsContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  background-color:${(props) => props.theme["gray-100"]};
  width: 100%;
  min-width: 640px;

  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const AddressContainer = styled(FormsContainer)``

export const Heading = styled.div`
  display: flex;
  gap: 8px;

  div {
    span {
      color: ${(props) => props.theme["black-900"]};
    }

    p {
      ${mixins.fonts.textS};
    }
  }
`

export const AddressHeading = styled(Heading)`
  svg {
    color: ${(props) => props.theme["yellow-700"]};
  }
`

export const AddressForm = styled.div`
  display: grid;
  grid-template-areas:
    'cep . .'
    'street street street'
    'number fullAddress fullAddress'
    'neighborhood city state';
  grid-template-columns: 200px 1fr 60px;
  grid-gap: 16px 12px;
`

export const PaymentContainer = styled(FormsContainer)``

export const PaymentHeading = styled(Heading)`
  svg {
    color: ${(props) => props.theme["purple-500"]};
  }
`

export const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > div {
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  svg {
    color: ${(props) => props.theme["purple-500"]};
  }
`

export const Coffee = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    > img {
      width: 64px;
      height: 64px;
    }

    display: flex;
    align-items: stretch;
    gap: 20px;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  > aside {
    font-weight: bold;
  }
`

export const CoffeeInfo = styled.div`
  display: flex;
  gap: 8px;

  > button {
    padding: 6px 8px;
    background-color: ${(props) => props.theme["gray-150"]};
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    border:none;

    transition: all 0.2s;

    &:hover {
      background-color: ${(props) => props.theme["gray-200"]};
    }

    > svg {
      color: ${(props) => props.theme["purple-500"]};
    }

    > span {
      ${mixins.fonts.buttonM};
      text-transform: uppercase;
      color: ${(props) => props.theme["gray-600"]};
    }
  }
`

export const CartTotal = styled.div`
  padding: 40px;
  border-radius: 6px 36px;
  background-color:${(props) => props.theme["gray-100"]};
  width: 100%;
  min-width: 448px;

  > span {
    display: block;
    height: 1px;
    background-color: ${(props) => props.theme["gray-150"]};
    margin: 24px 0;
  }
`

export const CartTotalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span:first-child {
      ${mixins.fonts.textS};
    }

    span:last-child {
      ${mixins.fonts.textM};
    }
  }

  div:last-child {
    span {
      ${mixins.fonts.textL};
      font-weight: bold;
    }
  }
`

export const CheckoutButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 12px;
  text-transform: uppercase;
  border: none;

  ${mixins.fonts.buttonG};
  color: ${(props) => props.theme["white"]};
  background-color: ${(props) => props.theme["yellow-500"]};

  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme["yellow-700"]};
  }

  border-radius: 6px;
`

export const PaymentErrorMessage = styled.p`
  ${mixins.fonts.textXS};
  font-weight: 400;
  color: red;
`