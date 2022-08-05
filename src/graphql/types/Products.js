import {
    GraphQLID,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat
} from "graphql";


const ProductType = new GraphQLObjectType({
    name: "Product",
    description: "Product type",
    fields: () => ({
        _id: { type: GraphQLID },
        codigo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        nombre: { type: GraphQLString },
        precio: { type: GraphQLInt },
        stock: { type: GraphQLInt },
        timestamp: { type: GraphQLFloat },
        url: { type: GraphQLString },
    }),
});

export { ProductType };