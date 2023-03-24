const { gql } = require("apollo-server");
//scaler type --> string, int, vloat, boolean
// Query
exports.typeDefs = gql`
    type Query {
        hello: String
        products(filter: ProductsFilterInput): [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
        reviews: [Review!]!

    }
    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        image: String!
        category: Category
        categoryId: String!
        reviews: [Review!]!
    }

    type Category {
        id: ID!
        name: String!
        products(filter: ProductsFilterInput): [Product!]!
    }

    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }

    input ProductsFilterInput{
        onSale: Boolean
        avgRating: Int
    }
`   

