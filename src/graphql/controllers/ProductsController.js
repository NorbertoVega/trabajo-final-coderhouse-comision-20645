import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
} from "graphql";
import { ProductType } from "../types/Products.js";
import ProductosRepo from "../../repository/productos.repository.js";

const productRepo = new ProductosRepo();

const getProducts = {
    type: new GraphQLList(ProductType),
    resolve: async () => {
        const productos = await productRepo.getAll();
        return productos;
    },
};

const getProduct = {
    type: ProductType,
    args: { _id: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: async (_, { _id }) => {
        const producto = await productRepo.getById(_id);
        return producto;
    },
};

const saveProduct = {
    type: ProductType,
    args: {
        codigo: { type: new GraphQLNonNull(GraphQLString) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        precio: { type: new GraphQLNonNull(GraphQLInt) },
        stock: { type: new GraphQLNonNull(GraphQLInt) },
        url: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { codigo, descripcion, nombre, precio, stock, timestamp, url }) => {
        const _id = await productRepo.save({
            codigo,
            descripcion,
            nombre,
            precio,
            stock,
            timestamp: Date.now(),
            url
        });
        const producto = await productRepo.getById(_id);
        return producto;
    },
};

const updateProduct = {
    type: ProductType,
    args: {
        idToUpdate: { type: new GraphQLNonNull(GraphQLString) },
        codigo: { type: new GraphQLNonNull(GraphQLString) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        precio: { type: new GraphQLNonNull(GraphQLInt) },
        stock: { type: new GraphQLNonNull(GraphQLInt) },
        url: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { idToUpdate, codigo, descripcion, nombre, precio, stock, url }) => {
        const _idUpdated = await productRepo.updateById(idToUpdate, {
            codigo,
            descripcion,
            nombre,
            precio,
            stock,
            timestamp: Date.now(),
            url
        });
        const producto = await productRepo.getById(_idUpdated);
        return producto;
    },
};

const deleteProduct = {
    type: ProductType,
    args: { _id: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: async (_, { _id }) => {
        const id = await productRepo.deleteById(_id);
        return { _id: id };
    },
};

const ProductController = {
    mutations: {
        saveProduct,
        updateProduct,
        deleteProduct
    },
    queries: {
        getProducts,
        getProduct,
    },
};

export { ProductController };
