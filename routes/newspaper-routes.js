import express from 'express';
import Newspaper from '../models/newspaper.js';

const router = express.Router();

router.get('/', async (req,res,next) =>{
    try{
        const newspapers = await Newspaper.findAll(); 
        res.status(200).json(newspapers);
    } catch(err){
        next(err);
    }
})

router.post('/', async (req,res,next) =>{
    try{
        const {name,category} = req.body;
        const date = new Date().toISOString().split('T')[0];
        const newNewspaper = await Newspaper.create({
            name: name,
            publication_date: date,
            category: category,
        })
        res.status(200).json(newNewspaper);
    }
    catch(err){ 
        next(err);
    }
})

router.delete('/:id', async (req,res,next) =>{
    

    try{
        const {id} = req.params;
        const getNewspaper = await Newspaper.findByPk(id)
        await Newspaper.destroy({
            where: {
                id: id,
            }
        })
       
        return res.status(200).json(getNewspaper);
        } catch(err){
        next(err);
    }
})

router.patch('/:id', async(req,res,next)=>{
    
    try{
        const {name,category} =req.body;
        const {id} = req.params;

        await Newspaper.update({
            name: name,
            category: category,
        },
            {  
                where: {
                id: id,
                }
            }
        )
        const updatedNewspaper = await Newspaper.findByPk(id);
        res.status(200).json(updatedNewspaper);
    }
    catch(err){
        next(err);
    }
})

export default router;