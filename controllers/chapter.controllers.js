import {Chapter} from '../models/Chapter.js'

const controller = {
    create: async(req, res)=>{
        try{
            const {comic_id,title, pages,order} = req.body
            await Chapter.create({comic_id,title, pages,order}) //el usuario no envia order
            res.status(201).json({
                success:true,
                response:"Nuevo capitulo creado"
            })
        } catch(error){
            console.log(error)
        }
    }
}
export default controller