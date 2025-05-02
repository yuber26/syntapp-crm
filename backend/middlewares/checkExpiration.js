/**
 * middleware/checkExpiration.js
 *
 * Verifica si el usuario con plan "pro_trial" ya expiró su periodo de prueba.
 * Incluye logs para debug y manejo de errores silenciosos.
 */

module.exports = (req, res, next) => {
    try {
      const { plan, trialEndsAt, email } = req.user;
  
      // 🧪 DEBUG: Mostrar datos del usuario
      console.log('[EXPIRATION] Usuario:', email);
      console.log('[EXPIRATION] Plan:', plan);
      console.log('[EXPIRATION] trialEndsAt:', trialEndsAt);
  
      // Validar si el plan es trial
      if (plan === 'pro_trial') {
        const now = new Date();
        const expiration = new Date(trialEndsAt);
  
        console.log('[EXPIRATION] Fecha actual:', now.toISOString());
        console.log('[EXPIRATION] Fecha de expiración:', expiration.toISOString());
  
        // Validar que trialEndsAt es una fecha válida
        if (isNaN(expiration.getTime())) {
          console.warn('[EXPIRATION] trialEndsAt no es una fecha válida');
          return res.status(500).json({ message: 'Fecha de expiración inválida.' });
        }
  
        // Verificar si ya expiró
        if (now > expiration) {
          console.log('[EXPIRATION] ACCESO BLOQUEADO: periodo expirado');
          return res.status(403).json({
            message: 'Tu periodo de prueba ha expirado. Por favor actualiza tu plan.'
          });
        }
  
        console.log('[EXPIRATION] ACCESO PERMITIDO: periodo vigente');
      }
  
      next(); // Continúa con el controlador si todo está bien
    } catch (err) {
      console.error('[EXPIRATION] Error inesperado:', err);
      return res.status(500).json({
        message: 'Error al verificar expiración del plan.',
        error: err.message
      });
    }
  };
  
  