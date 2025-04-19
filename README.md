# ☕ Coffee Delivery

Aplicação completa de e-commerce de cafés construída com React + TypeScript. O projeto permite selecionar produtos, gerenciar um carrinho de compras, preencher um formulário de entrega com validação e visualizar a confirmação do pedido.

---

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/en/main)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Styled Components](https://styled-components.com/)
- [Phosphor Icons](https://phosphoricons.com/)

---

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo:

```bash
$ git clone git@github.com:tamires-galvao/coffee-delivery.git
$ cd coffee-delivery
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Instalar as dependências
$ npm i

# Iniciar o projeto em ambiente de desenvolvimento
$ npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 💻 Projeto

Este é um projeto de e-commerce fictício com foco na venda de cafés. Ele simula todo o fluxo de compra, desde a seleção dos produtos até a tela final de confirmação, oferecendo uma experiência fluida ao usuário.

---

## 🔨 Funcionalidades Principais

- Visualizar uma lista de cafés disponíveis.
- Adicionar/remover itens do carrinho.
- Controlar a quantidade de cada item.
- Preencher o formulário de entrega com validação.
- Selecionar o método de pagamento.
- Visualizar o resumo do pedido na tela de sucesso.
- Estado persistente usando `localStorage`.

---

## 📦 Estrutura de pastas

```
src/
├── components/       # Componentes reutilizáveis (Card, Header, Form etc.)
├── context/          # CartContext (carrinho de compras)
├── hooks/            # Hooks customizados (useCart)
├── layouts/          # Layout padrão da aplicação
├── pages/            # Home, Cart, Success
├── reduces/          # Reducer e actions do carrinho
├── styles/           # Temas, estilos globais e componentes visuais
```

---

## ✨ Aprendizados

Com esse projeto, aprofundei meus conhecimentos em:

- Componentização no React com TypeScript.
- Context API + useReducer para controle de estado.
- Validação robusta de formulários com React Hook Form + Zod.
- Estilização com Styled Components e temas personalizados.
- Organização de código em um projeto realista.

---

Feito com 💜 por [Tamires Galvão](https://github.com/tamires-galvao) 👩🏻‍💻
