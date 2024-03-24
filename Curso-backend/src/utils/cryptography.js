import jwt from "jsonwebtoken"
import { JWT_PRIVATE_KEY } from "../config/config.js"
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';

export function hashPassword(frase) {
    if (!frase) throw new Error('invalid data to hash')
    return hashSync(frase, genSaltSync(10))
}

export function comparePassword(recibida, almacenada) {
    if (!recibida) throw new Error('invalid data to decode')
    if (!almacenada) throw new Error('invalid data to compare')
    return compareSync(recibida, almacenada)
}


export function encrypt(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: '24h' }, (err, encoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(encoded)
            }
        })
    })
}



export function decrypt(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}