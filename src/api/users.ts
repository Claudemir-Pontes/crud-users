import express, { json }  from "express"

const router = express.Router()


router.get('/', async (req,res) => {
    
    try{
        
        const users = await getUsers()

        if (!users) {
            throw new Error('Falha ao acessar banco de dados.')
          }

          res.status(200).json(users)

    } catch (err) {
        res.status(400).send(err.message)
    }
})

export default  router