const { db } = require('@vercel/postgres');

const {
  users,
  products,
  reviews,
  orders,
} = require('./placeholder-data.js')
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email text UNIQUE NOT NULL,
        password text NOT NULL,
        is_seller BOOLEAN NOT NULL DEFAULT FALSE,
        business_name VARCHAR(255)
      );
    `;

    console.log(`Created "users" table`);

    //Seed the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(await user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, is_seller, business_name)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.is_seller}, ${user.business_name})
        ON CONFLICT (ID) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };

  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        image VARCHAR(100),
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        quantity_available INTEGER NOT NULL CHECK (quantity_available >= 0)
      );
    `;

    console.log(`Created "products" table`);

    //Seed the "products" table
    const insertedProducts = await Promise.all(
      products.map(async (product) => {
        return client.sql`
        INSERT INTO products (id, user_id, name, image, description, price, quantity_available)
        VALUES (${product.id}, ${product.user_id}, ${product.name}, ${product.image}, ${product.description}, ${product.price}, ${product.quantity_available})
        ON CONFLICT (ID) DO NOTHING;
      `
      
      }),
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };

  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};


async function seedReviews(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "Reviews" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_id UUID REFERENCES products(id),
        user_id UUID REFERENCES users(id),
        rating DECIMAL(3, 1) CHECK (Rating >= 0 AND Rating <= 5) NOT NULL,
        comment TEXT NOT NULL,
        date Date DEFAULT CURRENT_DATE
      );
    `;
    console.log(`Created "reviews" table`);

    //Seed the "reviews" table
    const insertedReviews = await Promise.all(
      reviews.map(async (review) => {
        console.log(review.id)
        return client.sql`
        INSERT INTO reviews (id, product_id, user_id, rating, comment, date)
        VALUES (${review.id}, ${review.product_id}, ${review.user_id}, ${review.rating}, ${review.comment}, ${review.date})
        ON CONFLICT (ID) DO NOTHING;
      `
      
      }),
    );

    console.log(`Seeded ${insertedReviews.length} reviews`);

    return {
      createTable,
      products: insertedReviews,
    };

    } catch (error) {
    console.error('Error seeding reviews:', error);
    throw error;
  }
};

async function seedOrders(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "orders" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        product_id UUID REFERENCES products(id),
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        total_price NUMERIC(10, 2) NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "orders" table`);
    //Seed the "orders" table
    const insertedOrders = await Promise.all(
      orders.map(async (order) => {
        return client.sql`
        INSERT INTO orders (id, user_id, product_id, quantity, total_price, order_date)
        VALUES (${order.id}, ${order.user_id}, ${order.product_id}, ${order.quantity}, ${order.total_price}, ${order.order_date})
        ON CONFLICT (ID) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedOrders.length} orders`);

    return {
      createTable,
      orders: insertedOrders,
    };

  } catch (error) {
    console.error('Error seeding orders:', error);
    throw error;
  }
};

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedProducts(client);
  await seedReviews(client);
  await seedOrders(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});