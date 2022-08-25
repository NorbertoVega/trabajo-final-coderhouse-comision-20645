import { isAdmin } from "../services/user.service.js";

export async function validFieldsAndAdmin(req, res, next) {
    const body = req.body;
    req.invalidBody = body.code == null || body.name == null || body.description == null ||
        body.category == null || body.unitPrice == null || body.stock == null || body.imageUrl == null;

    if (body.email != undefined){
        const admin = await isAdmin(body.email)
        req.isAdmin = admin === null ? false: admin;
    }
        
    next();
}