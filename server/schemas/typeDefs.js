# Inside typeDefs.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define the User type
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  # Define the Book type
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
    publishedDate: String
    publisher: String
    pageCount: Int
    genres: [String]
  }

  # Define the Auth type which might be for authentication responses
  type Auth {
    token: String!
    user: User!
  }

  # Define the input type for adding a book.
  input BookInput {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
    publishedDate: String
    publisher: String
    pageCount: Int
    genres: [String]
  }

  # Define the root Query type
  type Query {
    me: User 
  }

  # Define the root Mutation type
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookDetails: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
