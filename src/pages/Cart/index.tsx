import { Fragment, useMemo, useState } from 'react';
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Money,
  Trash,
} from 'phosphor-react';

import { coffees as coffeeList } from '../../../data_coffee_list.json'; // Renomeado para evitar conflito
import { useCart } from '../../hooks/useCart';
import { QuantityInput } from '../../components/Form/QuantityInput';
import { TextInput } from '../../components/Form/TextInput';
import { Radio } from '../../components/Form/Radio';
import {
  AddressContainer,
  AddressForm,
  AddressHeading,
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
  CoffeeInfo,
  Container,
  InfoContainer,
  PaymentContainer,
  PaymentErrorMessage,
  PaymentHeading,
  PaymentOptions,
} from './styles';

// Tipagem explícita para os cafés
interface CoffeeItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Schema de validação ajustado
const newOrder = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido (ex.: 12345-678)'),
  street: z.string().min(1, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  fullAddress: z.string().optional(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade'),
  state: z.string().length(2, 'Informe a UF com 2 caracteres'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Selecione uma forma de pagamento',
  }),
});

type FormInputs = {
  cep: string;
  street: string;
  number: string;
  fullAddress?: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'credit' | 'debit' | 'cash';
};
export type OrderInfo = FormInputs;

const shippingPrice = 3.5;

// Utilitário para formatar moeda
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-br', {
    currency: 'BRL',
    style: 'currency',
  }).format(value);

// Componente separado para o formulário de endereço
function AddressFormComponent({
  register,
  errors,
}: {
  register:  UseFormRegister<FormInputs>; // Pode ser tipado melhor com tipos do react-hook-form
  errors: FieldErrors<FormInputs>;
}) {
  return (
    <AddressContainer>
      <AddressHeading>
        <MapPin size={22} />
        <div>
          <span>Endereço de Entrega</span>
          <p>Informe o endereço onde deseja receber o seu pedido</p>
        </div>
      </AddressHeading>
      <AddressForm>
        <TextInput
          placeholder="CEP"
          containerProps={{ style: { gridArea: 'cep' } }}
          error={errors.cep}
          {...register('cep')}
        />
        <TextInput
          placeholder="Rua"
          containerProps={{ style: { gridArea: 'street' } }}
          error={errors.street}
          {...register('street')}
        />
        <TextInput
          placeholder="Número"
          containerProps={{ style: { gridArea: 'number' } }}
          error={errors.number}
          {...register('number')}
        />
        <TextInput
          placeholder="Complemento"
          optional
          containerProps={{ style: { gridArea: 'fullAddress' } }}
          error={errors.fullAddress}
          {...register('fullAddress')}
        />
        <TextInput
          placeholder="Bairro"
          containerProps={{ style: { gridArea: 'neighborhood' } }}
          error={errors.neighborhood}
          {...register('neighborhood')}
        />
        <TextInput
          placeholder="Cidade"
          containerProps={{ style: { gridArea: 'city' } }}
          error={errors.city}
          {...register('city')}
        />
        <TextInput
          placeholder="UF"
          maxLength={2}
          containerProps={{ style: { gridArea: 'state' } }}
          error={errors.state}
          {...register('state')}
        />
      </AddressForm>
    </AddressContainer>
  );
}

export function Cart() {
  const {
    cart,
    checkout,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItem,
  } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(newOrder),
  });

  const selectedPaymentMethod = watch('paymentMethod');

  // Memoização para melhorar performance
  const coffeesInCart = useMemo(() => {
    return cart
      .map((item) => {
        const coffeeInfo = coffeeList.find((coffee) => coffee.id === item.id);
        if (!coffeeInfo) return null;
        return { ...coffeeInfo, quantity: item.quantity };
      })
      .filter(Boolean) as (CoffeeItem & { quantity: number })[];
  }, [cart]);

  const totalItemsPrice = useMemo(() => {
    return coffeesInCart.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0,
    );
  }, [coffeesInCart]);

  // Funções de manipulação do carrinho
  const handleItemIncrement = (itemId: string) => incrementItemQuantity(itemId);
  const handleItemDecrement = (itemId: string) => decrementItemQuantity(itemId);
  const handleItemRemove = (itemId: string) => removeItem(itemId);

  const handleOrderCheckout: SubmitHandler<FormInputs> = async (data) => {
    if (cart.length === 0) {
      alert('É preciso ter pelo menos um item no carrinho');
      return;
    }
    setIsSubmitting(true);
    try {
      await checkout(data); // Assumindo que checkout é assíncrono
    } finally {
      setIsSubmitting(false);
    }
  };

  // Caso o carrinho esteja vazio
  if (cart.length === 0) {
    return (
      <Container>
        <InfoContainer>
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione alguns cafés para continuar!</p>
        </InfoContainer>
      </Container>
    );
  }

  return (
    <Container>
      <InfoContainer>
        <h2>Complete seu pedido</h2>
        <form id="order" onSubmit={handleSubmit(handleOrderCheckout)}>
          <AddressFormComponent register={register} errors={errors} />
          <PaymentContainer>
            <PaymentHeading>
              <CurrencyDollar size={22} />
              <div>
                <span>Pagamento</span>
                <p>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </PaymentHeading>
            <PaymentOptions>
              <div>
                <Radio
                  isSelected={selectedPaymentMethod === 'credit'}
                  {...register('paymentMethod')}
                  value="credit"
                  aria-label="Cartão de crédito"
                >
                  <CreditCard size={16} />
                  <span>Cartão de crédito</span>
                </Radio>
                <Radio
                  isSelected={selectedPaymentMethod === 'debit'}
                  {...register('paymentMethod')}
                  value="debit"
                  aria-label="Cartão de débito"
                >
                  <Bank size={16} />
                  <span>Cartão de débito</span>
                </Radio>
                <Radio
                  isSelected={selectedPaymentMethod === 'cash'}
                  {...register('paymentMethod')}
                  value="cash"
                  aria-label="Dinheiro"
                >
                  <Money size={16} />
                  <span>Dinheiro</span>
                </Radio>
              </div>
              {errors.paymentMethod && (
                <PaymentErrorMessage role="alert" aria-live="polite">
                  {errors.paymentMethod.message}
                </PaymentErrorMessage>
              )}
            </PaymentOptions>
          </PaymentContainer>
        </form>
      </InfoContainer>

      <InfoContainer>
        <h2>Cafés selecionados</h2>
        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.name} />
                  <div>
                    <span>{coffee.name}</span>
                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />
                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash size={16} />
                        <span>Remover</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>
                <aside>{formatCurrency(coffee.price)}</aside>
              </Coffee>
              <span />
            </Fragment>
          ))}
          <CartTotalInfo>
            <div>
              <span>Total de itens</span>
              <span>{formatCurrency(totalItemsPrice)}</span>
            </div>
            <div>
              <span>Entrega</span>
              <span>{formatCurrency(shippingPrice)}</span>
            </div>
            <div>
              <span>Total</span>
              <span>{formatCurrency(totalItemsPrice + shippingPrice)}</span>
            </div>
          </CartTotalInfo>
          <CheckoutButton type="submit" form="order" disabled={isSubmitting}>
            {isSubmitting ? 'Processando...' : 'Confirmar pedido'}
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
    </Container>
  );
}