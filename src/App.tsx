import { LinearProgress } from "@material-ui/core";
import { useState } from "react";
import { useQuery } from "react-query";

import Grid from "@material-ui/core/Grid/Grid";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Badge from "@material-ui/core/Badge";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
//Components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Server from "./Server"
import { StyledButton, Wrapper } from "./App.styles";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// import { AddShoppingCart } from "@material-ui/icons";


export type CartItermType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItermType[]> =>{

 const products = await (await fetch("https://fakestoreapi.com/products")).json();
  // const products = await prisma.product.findMany();
  console.log(products)

  return products
}
 
 



function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartIterms, setCartItems] = useState([] as CartItermType[]);

  const { data, isLoading, error } = useQuery<CartItermType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItermType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItermType) => {
    setCartItems((prev) => {
      //Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //First time item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItermType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
      >
        <Cart
          cartItems={cartIterms}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartIsOpen(true)}>
        <Badge badgeContent={getTotalItems(cartIterms)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
