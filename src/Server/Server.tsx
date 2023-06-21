// server.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Create a new cart item
app.post('/api/cart', async (req, res) => {
  const { category, description, image, price, title, amount } = req.body;

  try {
    const cartItem = await prisma.cart.create({
      data: {
        category,
        description,
        image,
        price,
        title,
        amount,
        cartItems: {
          create: [],
        },
      },
      include: {
        cartItems: true,
      },
    });

    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a cart item by ID
app.delete('/api/cart/:id', async (req, res) => {
  const cartItemId = parseInt(req.params.id);

  try {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all cart items
app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await prisma.cart.findMany({
      include: {
        cartItems: true,
      },
    });

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


// export default Server;
