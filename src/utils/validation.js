
export function validateProductBodyAndAuthenticate(req, res, next) {
    const body = req.body;
    req.invalidBody = body.nombre == null || body.descripcion == null || body.codigo == null ||
        body.url == null || body.precio == null || body.stock == null;

    if (body.admin != null && body.admin != undefined)
        req.isAdmin = body.admin;

    next();
}