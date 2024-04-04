import express from 'express';
import Subscriber from '../models/subscriber.js';
const router = express.Router();    

router.get('/', async (req,res,next)=>{
    try {
        const subscribers = await Subscriber.findAll()
        res.status(200).json(subscribers);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req,res,next)=>{
    
    try{
        const {name, email, city} = req.body;
        const newSubscriber = await Subscriber.create({
            name:name, 
            email:email,
            city:city,
        })
        res.status(200).send(newSubscriber);
    } catch(error) {
        next(error);
    }
})

router.delete('/:id', async(req,res,next)=>{
    
    try{
        const {id} = req.params;
        const deletedSusbscriber = await Subscriber.findByPk(id);
        await Subscriber.destroy({
            where: {
                id: id,
            }
        })
        return res.status(200).json(deletedSusbscriber);
    }
    catch (error) {
        next(error);
    }
})

router.patch('/:id', async(req, res,next)=>{
    
    try{
        const {name,email,city} = req.body;
        const {id} = req.params;
        await Subscriber.update({
            name: name,
            email: email,
            city: city,
        },{
            where: {
                id: id,
            }
        })
        const updatedSusbcriber = await Subscriber.findByPk(id);
        return res.status(200).json(updatedSusbcriber);

    }catch (error) {
        next(error);
    }

})


export default router;