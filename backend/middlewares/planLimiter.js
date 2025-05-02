/**
 * backend/middlewares/planLimiter.js
 *
 * Middleware para limitar acceso a rutas según el plan del usuario.
 */

const planLimiter = (requiredPlan = 'free') => {
    return (req, res, next) => {
      // ⚠️ Simulación: más adelante lo sacaremos del token o base de datos
      const userPlan = req.headers['x-user-plan'] || 'free';
  
      const plansOrder = ['free', 'pro', 'growth', 'enterprise'];
  
      if (!plansOrder.includes(userPlan)) {
        return res.status(400).json({
          error: {
            message: 'Plan no reconocido.',
            status: 400
          }
        });
      }
  
      if (plansOrder.indexOf(userPlan) >= plansOrder.indexOf(requiredPlan)) {
        return next(); // ✅ Tiene acceso
      }
  
      // ❌ Bloqueado
      return res.status(403).json({
        error: {
          message: `Tu plan (${userPlan}) no permite acceder a esta funcionalidad.`,
          status: 403
        }
      });
    };
  };
  
  module.exports = { planLimiter };
  