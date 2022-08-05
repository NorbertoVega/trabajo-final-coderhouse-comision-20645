import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ProductController } from "./controllers/index.js";

const ProductQueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    ...ProductController.queries,
  },
});

const ProductMutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    ...ProductController.mutations,
  },
});

const productSchema = new GraphQLSchema({
  query: ProductQueryType,
  mutation: ProductMutationType,
});

export { productSchema };