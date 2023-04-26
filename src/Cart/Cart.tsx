import CartItem from "../CartItem/CartItem";

import { Wrapper } from "./Cart.styles";

import { CartItermType } from "../App";

type Props = {
  cartItems: CartItermType[];
  addToCart: (clickedItem: CartItermType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No Items in cart.</p> : null}
      {cartItems.map(item =>(
        <CartItem />
      ))}
    </Wrapper>
  );
};

export default Cart;