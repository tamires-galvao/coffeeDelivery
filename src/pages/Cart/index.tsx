import { Fragment, useMemo, useState, useCallback } from 'react';
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

import { coffees as coffeeList } from '../../../data_coffee_list.json';
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
import { Order } from '../../reduces/cart/reducer';

interface CoffeeItem {
  id: string;
  name: string;
  description: string; 
  tags: string[];    
  price: number;
  image: string;
  quantity?: number;   // Opcional pois é adicionado dinamicamente
}

// Schema de validação
const newOrderSchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido (ex.: 12345-678)'),
  street: z.string().min(1, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  fullAddress: z.string().optional(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade'),
  state: z.string().length(2, 'Informe a UF com 2 caracteres'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    required_error: 'Selecione uma forma de pagamento',
  }),
});

export type FormInputs = z.infer<typeof newOrderSchema>;
export type OrderInfo = FormInputs;

const SHIPPING_PRICE = 3.5;
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const AddressFormComponent = ({
  register,
  errors,
}: {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}) => (
  <AddressContainer>
    <AddressHeading>
      <MapPin size={22} />
      <div>
        <span>Endereço de Entrega</span>
        <p>Informe o endereço onde deseja receber o seu pedido</p>
      </div>
    </AddressHeading>
    <AddressForm>
      {[
        { placeholder: 'CEP', name: 'cep', style: { gridArea: 'cep' } },
        { placeholder: 'Rua', name: 'street', style: { gridArea: 'street' } },
        { placeholder: 'Número', name: 'number', style: { gridArea: 'number' } },
        { placeholder: 'Complemento', name: 'fullAddress', style: { gridArea: 'fullAddress' }, optional: true },
        { placeholder: 'Bairro', name: 'neighborhood', style: { gridArea: 'neighborhood' } },
        { placeholder: 'Cidade', name: 'city', style: { gridArea: 'city' } },
        { placeholder: 'UF', name: 'state', style: { gridArea: 'state' }, maxLength: 2 },
      ].map(({ placeholder, name, style, optional, maxLength }) => (
        <TextInput
          key={name}
          placeholder={placeholder}
          containerProps={{ style }}
          error={errors[name as keyof FormInputs]}
          optional={optional}
          maxLength={maxLength}
          {...register(name as keyof FormInputs)}
        />
      ))}
    </AddressForm>
  </AddressContainer>
);

// Componente para item individual do café
const CoffeeItemComponent = ({
  coffee,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  coffee: CoffeeItem & { quantity: number };
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}) => (
  <Fragment key={coffee.id}>
    <Coffee>
      <div>
        <img src={coffee.image} alt={coffee.name} />
        <div>
          <span>{coffee.name}</span>
          <CoffeeInfo>
            <QuantityInput
              quantity={coffee.quantity}
              incrementQuantity={onIncrement}
              decrementQuantity={onDecrement}
            />
            <button onClick={onRemove} aria-label={`Remover ${coffee.name}`}>
              <Trash size={16} />
              <span>Remover</span>
            </button>
          </CoffeeInfo>
        </div>
      </div>
      <aside>{currencyFormatter.format(coffee.price)}</aside>
    </Coffee>
    <span />
  </Fragment>
);

export function Cart() {
  const { cart, checkout, incrementItemQuantity, decrementItemQuantity, removeItem } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: { paymentMethod: undefined },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const coffeesInCart = useMemo(() => {
    return cart
      .map((item) => {
        const coffeeInfo = coffeeList.find((coffee) => coffee.id === item.id);
        if (!coffeeInfo) {
          console.warn(`Coffee with id ${item.id} not found in coffeeList`);
          return null;
        }
        return { ...coffeeInfo, quantity: item.quantity };
      })
      .filter((item): item is CoffeeItem & { quantity: number } => item !== null);
  }, [cart]);

  const totalItemsPrice = useMemo(() => {
    return coffeesInCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [coffeesInCart]);

  const totalWithShipping = totalItemsPrice + SHIPPING_PRICE;

  // Callbacks para manipulação do carrinho
  const handleItemIncrement = useCallback((itemId: string) => incrementItemQuantity(itemId), [incrementItemQuantity]);
  const handleItemDecrement = useCallback((itemId: string) => decrementItemQuantity(itemId), [decrementItemQuantity]);
  const handleItemRemove = useCallback((itemId: string) => removeItem(itemId), [removeItem]);

  const handleOrderCheckout: SubmitHandler<FormInputs> = useCallback(
    async (data) => {
      if (cart.length === 0) {
        alert('É preciso ter pelo menos um item no carrinho');
        return;
      }
  
      const newOrder: Order = {
        ...data,
        id: new Date().getTime(), // ou qualquer lógica de ID
        createdAt: new Date(),
        items: [...cart],
      };
  
      setIsSubmitting(true);
      try {
        await checkout(newOrder); // ✅ agora espera um Order, e não mais OrderInfo
      } catch (error) {
        console.error('Erro no checkout:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [cart, checkout]
  );  

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
                <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
              </div>
            </PaymentHeading>
            <PaymentOptions>
              <div>
                {[
                  { value: 'credit', icon: CreditCard, label: 'Cartão de crédito' },
                  { value: 'debit', icon: Bank, label: 'Cartão de débito' },
                  { value: 'cash', icon: Money, label: 'Dinheiro' },
                ].map(({ value, icon: Icon, label }) => (
                  <Radio
                    key={value}
                    isSelected={selectedPaymentMethod === value}
                    {...register('paymentMethod')}
                    value={value}
                    aria-label={label}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Radio>
                ))}
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
            <CoffeeItemComponent
              key={coffee.id}
              coffee={coffee}
              onIncrement={() => handleItemIncrement(coffee.id)}
              onDecrement={() => handleItemDecrement(coffee.id)}
              onRemove={() => handleItemRemove(coffee.id)}
            />
          ))}
          <CartTotalInfo>
            {[
              { label: 'Total de itens', value: totalItemsPrice },
              { label: 'Entrega', value: SHIPPING_PRICE },
              { label: 'Total', value: totalWithShipping },
            ].map(({ label, value }) => (
              <div key={label}>
                <span>{label}</span>
                <span>{currencyFormatter.format(value)}</span>
              </div>
            ))}
          </CartTotalInfo>
          <CheckoutButton type="submit" form="order" disabled={isSubmitting}>
            {isSubmitting ? 'Processando...' : 'Confirmar pedido'}
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
    </Container>
  );
}