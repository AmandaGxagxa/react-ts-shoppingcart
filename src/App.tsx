import { LinearProgress } from "@material-ui/core";
import { log } from "console";
import { useState } from "react";
import { useQuery } from "react-query";

import Grid from "@material-ui/core/Grid/Grid";
//Components
import Item from "./Item/Item";
import { Wrapper } from "./Item/Item.styles";

export type CartItermType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItermType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const { data, isLoading, error } = useQuery<CartItermType[]>(
    "products",
    getProducts
  );
console.log(data)

const getTotalItems = () => null;
const handleAddToCart = (clickedItem: CartItermType) => null;

if (isLoading) return <LinearProgress />;
if  (error) return <div>Something went wrong</div>

  return (
<Wrapper>
<Grid container spacing={3}>
{data?.map(item => (
  <Grid item key={item.id} xs={12} sm={4}>
    <Item item={item} handleAddToCart={handleAddToCart} />
    </Grid>
))}
</Grid>
  </Wrapper>

  )
}

export default App;
