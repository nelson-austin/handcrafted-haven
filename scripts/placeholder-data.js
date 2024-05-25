const users = [
    {
        id: '87fe51e3-2b78-44b4-aaf2-02a432b7cb7c',
        name: "Elena Martinez",
        email: "elena@example.com",
        password: "Password",
        is_seller: true,
        business_name: "Elena's Artistry"
    },
    {
        id: 'd6d2d3c4-7233-45e1-9d45-d1ffdbbdd313',
        name: "Sophia Nguyen",
        email: "sophia@example.com",
        password: "Password",
        is_seller: true,
        business_name: "Sophia's Jewelry"
    },
    {
        id: 'a88f6aa9-b2f4-42e3-8f79-72b31f60e58b',
        name: "Michael Johnson",
        email: "michael@example.com",
        password: "Password",
        is_seller: false
    },
    {
        id: '643e4fc1-9b6e-4327-aa4b-60b20915e828',
        name: "Olivia Smith",
        email: "olivia@example.com",
        password: "Password",
        is_seller: false
    },
    {
        id: '5bc91d8c-0d41-47c4-80a3-87a3b1e1bfc2',
        name: "William Brown",
        email: "william@example.com",
        password: "Password",
        is_seller: false
    }
];

const products = [
    {
        id: 'e5f1f7a1-8dc8-42f5-84a2-50c0a1f6e5bc',
        user_id: users[1].id,
        name: "Hand-painted Canvas",
        image: "/products/painted-canvas.jpg",
        description: "Original abstract artwork on canvas",
        price: 149.99, "quantity_available": 5
    },
    {
        id: 'ac0f8dd6-8944-4b9c-80f3-19cf1d5ad9a0',
        user_id: users[1].id,
        name: "Ceramic Vase",
        image: "/products/ceramic-vase.jpg",
        description: "Handcrafted ceramic vase with intricate patterns",
        price: 79.99, "quantity_available": 10
    },
    {
        id: '7a1dc67e-01da-4d0d-a58b-d99b59a0e33e',
        user_id: users[1].id,
        name: "Silver Necklace",
        image: "/products/silver-necklace.jpg",
        description: "Elegant silver necklace with a unique pendant",
        price: 199.99, "quantity_available": 8
    },
    {
        id: '0f15de8b-5ab3-4fe4-9ba1-3cd9f6cbbd0e',
        user_id: users[1].id,
        name: "Gemstone Bracelet",
        image: "/products/gem-bracelet.jpg",
        description: "Bracelet adorned with colorful gemstones",
        price: 129.99, "quantity_available": 12
    },
    {
        id: 'a242c6a4-b4e0-4b9d-8e82-1a03680ef9e3',
        user_id: users[0].id,
        name: "Wood Carving Sculpture",
        image: "/products/wood-carving.jpg",
        description: "Hand-carved wooden sculpture of an animal",
        price: 249.99, "quantity_available": 3
    },
    {
        id: 'eb3f77e5-85e7-42a5-a1fc-86c541e396f8',
        user_id: users[1].id,
        name: "Gold Earrings",
        image: "/products/gold-earrings.jpg",
        description: "Stylish gold earrings with intricate detailing",
        price: 299.99, "quantity_available": 6
    },
    {
        id: '26f26e6c-07c4-4bbf-a81d-6a15f1f444ab',
        user_id: users[0].id,
        name: "Fiber Wall Hanging",
        image: "/products/macrame-hanging.jpg",
        description: "Bohemian-style fiber wall hanging for home decor",
        price: 89.99, "quantity_available": 7
    },
    {
        id: '7aa44721-fd96-4551-9b90-d2a0ab332026',
        user_id: users[1].id,
        name: "Pearl Ring",
        image: "/products/pearl-ring.jpg",
        description: "Classic pearl ring set in sterling silver",
        price: 179.99, "quantity_available": 9
    },
    {
        id: '4f876b60-c97a-4908-96d7-35cf4f5f2823',
        user_id: users[0].id,
        name: "Handwoven Basket",
        image: "/products/woven-basket.jpg",
        description: "Natural fiber basket woven by hand",
        price: 59.99, "quantity_available": 15
    },
    {
        id: '36a42922-f903-45e1-bd97-10f5d3e0a2fd',
        user_id: users[1].id,
        name: "Crystal Pendant",
        image: "/products/crystal-pendant.jpg",
        description: "Crystal pendant necklace on a delicate chain",
        price: 159.99, "quantity_available": 10
    }
];

const reviews = [
    {
      id: '5bc91d8c-0d41-47c4-80a3-87a3b1e1bfc2',
      product_id: products[0].id,
      user_id: users[2].id,
      rating: 4,
      comment: "Great product, does exactly what it promises."
    },
    {
      id: '9d0d276f-f0d2-4f29-bae6-e9b21c3ef34b',
      product_id: products[0].id,
      user_id: users[3].id,
      rating: 5,
      comment: "Excellent quality, exceeded my expectations."
    },
    {
      id: '6b6344f9-6d68-4da7-a632-c021cfb2b04a',
      product_id: products[1].id,
      user_id: users[4].id,
      rating: 3,
      comment: "Decent product, but could be improved."
    },
    {
      id: 'a2f61875-8407-4d26-a4d4-6757ac3baf0a',
      product_id: products[1].id,
      user_id: users[2].id,
      rating: 2,
      comment: "Not worth the price, disappointed."
    },
    {
      id: '1b1a674c-0a29-4e5d-8799-eb7a791f75d8',
      product_id: products[2].id,
      user_id: users[3].id,
      rating: 5,
      comment: "Absolutely love it, would recommend to everyone."
    },
    {
      id: '5c0a831b-80b2-4647-978b-cb99633fd3a3',
      product_id: products[2].id,
      user_id: users[4].id,
      rating: 4,
      comment: "Very satisfied with the purchase."
    },
    {
      id: '4bc4f72e-0f6f-458a-97f0-30ab1d39c7e1',
      product_id: products[3].id,
      user_id: users[2].id,
      rating: 2,
      comment: "Disappointing, didn't meet my expectations."
    },
    {
      id: '763b97d2-ba6f-4cb1-835e-ee28cbe688e7',
      product_id: products[3].id,
      user_id: users[3].id,
      rating: 3,
      comment: "Average product, nothing special."
    },
    {
      id: 'c319fa67-8a4b-46dc-9c8c-79b3b1c29a3a',
      product_id: products[4].id,
      user_id: users[4].id,
      rating: 4,
      comment: "Good value for money, happy with the purchase."
    },
    {
      id: '3af15707-67b5-4db9-93ed-78e15438e7f5',
      product_id: products[4].id,
      user_id: users[2].id,
      rating: 5,
      comment: "Impressive quality, exceeded my expectations."
    }
  ]



const cart = [
    {   id: 1,
        buyer_id: users[2].id,
        product_id: products[0].id,
        quantity: 1,
    },
    {
        id: 2,
        buyer_id: users[2].id,
        product_id: products[6].id,
        quantity: 2,
    },
    {
        id: 3,
        buyer_id: users[2].id,
        product_id: products[1].id,
        quantity: 2,
    },
    {
        id: 4,
        buyer_id: users[2].id,
        product_id: products[7].id,
        quantity: 1,
    },
    {
        id: 5,
        buyer_id: users[2].id,
        product_id: products[2].id,
        quantity: 1,
    },
    {
        id: 6,
        buyer_id: users[2].id,
        product_id: products[8].id,
        quantity: 1,
    },
    {   id: 7,
        buyer_id: users[3].id,
        product_id: products[0].id,
        quantity: 1,
    },
    {
        id: 8,
        buyer_id: users[3].id,
        product_id: products[6].id,
        quantity: 2,
    }
]


const orders = [
    {
        id: 'c46d6a6e-80a9-43f5-9fc1-dcaa7a4b188d',
        user_id: users[2].id,
        product_id: products[0].id,
        quantity: 1,
        total_price: products[0].price * this.quantity
    },
    {
        id: '988cd4b3-c5d6-4684-b43d-ee6b257a9c02',
        user_id: users[3].id,
        product_id: products[2].id,
        quantity: 1,
        total_price: 199.99
    },
    {
        id: 'e1c48fa1-8d82-48cb-aa3c-9d303b9fd942',
        user_id: users[4].id,
        product_id: products[4].id,
        quantity: 1,
        total_price: 249.99
    },
    {
        id: '35d999f8-7e60-4e3c-a99c-9b80abf11e97',
        user_id: users[2].id,
        product_id: products[6].id,
        quantity: 2,
        total_price: 179.98
    },
    {
        id: 'f833d2d6-2280-4a61-b325-2db5c40d22c4',
        user_id: users[3].id,
        product_id: products[8].id,
        quantity: 3,
        total_price: 179.97
    },
    {
        id: users[3].id,
        user_id: users[2].id,
        product_id: products[1].id,
        quantity: 2,
        total_price: 159.98
    },
    {
        id: '2d3bcade-bd4e-4742-9a6d-5d9b3568882e',
        user_id: users[4].id,
        product_id: products[3].id,
        quantity: 1,
        total_price: 129.99
    },
    {
        id: 'a1a0a44f-689c-4b8a-8d94-09e9bf1a41f7',
        user_id: users[3].id,
        product_id: products[5].id,
        quantity: 1,
        total_price: 299.99
    },
    {
        id: 'f6fe28fc-f8a2-4945-8a7d-0b84fd51f285',
        user_id: users[2].id,
        product_id: products[7].id,
        quantity: 1,
        total_price: 299.99
    },
    {
        id: '09d0fabe-04de-4d6d-b6f1-92a5005f9208',
        user_id: users[4].id,
        product_id: products[9].id,
        quantity: 1,
        total_price: 159.99
    },
    {
        id: 'c4b3c7fe-fd23-4d7b-9e89-1554d23a2e8d',
        user_id: users[3].id,
        product_id: products[0].id,
        quantity: 2,
        total_price: 299.98
    },
    {
        id: '888ecddd-6706-4c43-a43e-525af8a775f5',
        user_id: users[2].id,
        product_id: products[2].id,
        quantity: 1,
        total_price: 199.99
    },
    {
        id: '6d1d9b12-795e-4b12-8a2b-67c95fd1e732',
        user_id: users[4].id,
        product_id: products[4].id,
        quantity: 2,
        total_price: 499.98
    },
    {
        id: 'cbe8cf6d-3b3f-448c-bc41-c5db7efc9dcf',
        user_id: users[3].id,
        product_id: products[6].id,
        quantity: 1,
        total_price: 89.99
    },
    {
        id: '19f9862f-4f80-40b7-bb9a-24a863a15913',
        user_id: users[2].id,
        product_id: products[8].id,
        quantity: 1,
        total_price: 59.99
    }
];

module.exports = {
    users,
    products,
    reviews,
    cart,
    orders,
}