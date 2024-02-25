import pkg from 'node-gzip';
const { gzip, ungzip } = pkg;

export const gzipMiddleware = (req, res, next) => {
    // Sobrescribe el método send para comprimir automáticamente
    const originalSend = res.send;
    res.send = function (body) {
        gzip(body)
            .then((compressedBody) => {
                res.setHeader('Content-Encoding', 'gzip');
                originalSend.call(this, compressedBody);
            }).catch((error) => {
                console.error('Error al comprimir:', error);
                originalSend.call(this, body); // Enviar sin comprimir en caso de error
            });
    };

    // Descomprime la solicitud antes de pasar al siguiente middleware
    if (req.headers['content-encoding'] === 'gzip') {
        ungzip(req.body)
        .then((uncompressedBody) => {
            req.body = uncompressedBody;
            next();
        }).catch((error) => {
            console.error('Error al descomprimir la solicitud:', error);
            next();
        });
    } else {
        next();
    }
};
