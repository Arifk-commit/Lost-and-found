import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import logger from '../config/logger.js'

export const validateJWT = async (req, res, next) => {
    const token = req.header('token')

    try {
        if (!token) {
            logger.warn('Missing authentication token')
            return res.status(401).json({
                ok: false,
                msg: 'Access denied',
            })
        }

        const payload = jwt.verify(token, env.JWT_SECRET)

        req.id = payload.id
        logger.info({ userId: payload.id }, 'JWT validated successfully')
        return next()
    } catch (error) {
        logger.error({ error: error.message }, 'JWT validation failed')
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid',
        })
    }
}

export default validateJWT;
