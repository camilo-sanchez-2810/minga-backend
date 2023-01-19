import defaultResponse from '../config/response.js'
import { Author } from '../models/Author.js'

async function isAuthorActive(req, res, next) {
    const user_id = req.user.id // El id del autor deberia pasarse de otra forma (Proximamente)
    console.log(user_id)
    // Primero buscamos el autor
    // Verificamos si esta activo
    //   Si esta activo lo dejo pasar al controlador
    //   Si no esta activo no lo dejo crear un comic (NO LO DEJO PASAR AL CONTROLADOR)
    try {
      const [author] = await Author.find({user_id})
      console.log(author)
      if (author.active) {
        return next()
      }
      req.body.success = false
      req.body.sc = 400
      req.body.data = 'is not active!'
      return defaultResponse(req,res)
    }catch (error) {
      req.body.success = false
      req.body.sc = 500
      req.body.data = 'error'
      return defaultResponse(req,res)
    }
}

export default isAuthorActive