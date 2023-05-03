import CartItem from "../CartItem/CartItem";

import { Wrapper } from "./Cart.styles";

import { CartItermType } from "../App";

type Props = {
  cartItems: CartItermType[];
  addToCart: (clickedItem: CartItermType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
 const calcTotal = (items: CartItermType[]) =>
 items.reduce((ack:number, item) => ack + item.amount * item.price, 0)
 
 
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No Items in cart.</p> : null}
      {cartItems.map(item =>(
        <CartItem 
        key={item.id}
        item={item}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: R{calcTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;