import logger from "../util/logger.js";

export const logApiRequest = (req, res, next) => {
    const authHeader = req.headers?.authorization;
    let maskedAuth = null;

    if (authHeader) {
        const [type, token] = authHeader.split(" ");
        if (token) {
            maskedAuth = `${type} *****${token.slice(-6)}`;
        } else {
            maskedAuth = type;
        }
    }

    logger.debug(
        `[API] ${req.method} ${req.originalUrl} ` +
        `Authorization=${maskedAuth} ` +
        `Params=${JSON.stringify(req.params)} ` +
        `Query=${JSON.stringify(req.query)} ` +
        `Body=${JSON.stringify(req.body)} ` +
        `- Request received`
    );

    next();
}