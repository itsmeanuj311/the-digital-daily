import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaPg } from '@prisma/adapter-pg'

const app = new Hono()

app.get('/', (c) => {
  const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
}).$extends(withAccelerate())
  return c.text('Hello Hono!')
})

app.post('/api/v1/register', async (c) => {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const registeredUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  })
  return c.json(registeredUser);
})

app.post('/api/v1/login', async (c) => {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const loginUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!loginUser) {
    return c.json({ error: 'User not found' }, 404);
  }

  if (loginUser.password !== body.password) {
    return c.json({ error: 'Invalid password' }, 401);
  }

  return c.json(loginUser);
})

export default app
