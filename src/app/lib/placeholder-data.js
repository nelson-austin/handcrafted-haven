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
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        user_id: users[1].id,
        name: "Hand-painted Canvas",
        description: "Original abstract artwork on canvas",
        price: 149.99, "quantity_available": 5
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        user_id: users[1].id,
        name: "Ceramic Vase",
        description: "Handcrafted ceramic vase with intricate patterns",
        price: 79.99, "quantity_available": 10
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        user_id: users[1].id,
        name: "Silver Necklace",
        description: "Elegant silver necklace with a unique pendant",
        price: 199.99, "quantity_available": 8
    },
    {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        user_id: users[1].id,
        name: "Gemstone Bracelet",
        description: "Bracelet adorned with colorful gemstones",
        price: 129.99, "quantity_available": 12
    },
    {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        user_id: users[0].id,
        name: "Wood Carving Sculpture",
        description: "Hand-carved wooden sculpture of an animal",
        price: 249.99, "quantity_available": 3
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        user_id: users[1].id,
        name: "Gold Earrings",
        description: "Stylish gold earrings with intricate detailing",
        price: 299.99, "quantity_available": 6
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        user_id: users[0].id,
        name: "Fiber Wall Hanging",
        description: "Bohemian-style fiber wall hanging for home decor",
        price: 89.99, "quantity_available": 7
    },
    {
        id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
        user_id: users[1].id,
        name: "Pearl Ring",
        description: "Classic pearl ring set in sterling silver",
        price: 179.99, "quantity_available": 9
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        user_id: users[0].id,
        name: "Handwoven Basket",
        description: "Natural fiber basket woven by hand",
        price: 59.99, "quantity_available": 15
    },
    {
        id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        user_id: users[1].id,
        name: "Crystal Pendant",
        description: "Crystal pendant necklace on a delicate chain",
        price: 159.99, "quantity_available": 10
    }
];

const orders = [
    {
        id: 'c46d6a6e-80a9-43f5-9fc1-dcaa7a4b188d',
        user_id: users[2].id,
        product_id: products[0].id,
        quantity: 1,
        total_price: 149.99
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
        id: '417b6f2b-7020-4d29-9bc9-6b7dab0b3c2f',
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
    orders,
}

  