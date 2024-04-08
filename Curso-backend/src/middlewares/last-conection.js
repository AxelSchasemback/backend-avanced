// lastConnectionMiddleware.js
export default function lastConnectionMiddleware(schema) {
    schema.pre('save', function(next) {
      // @ts-ignore
      if (this.isModified('last_connection')) {
        return next(); // Si ya se modificó la última conexión, no hacer nada
      }
  
      this.last_connection = new Date(); // Establecer la fecha actual como la última conexión
      next();
    });
  }
  