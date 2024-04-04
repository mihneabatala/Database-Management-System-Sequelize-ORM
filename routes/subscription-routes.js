import  express  from "express";
import Subscription from "../models/subscription.js";
import Newspaper from "../models/newspaper.js";
import Subscriber from "../models/subscriber.js";
const router = express.Router();

router.get('/', async (req,res,next) => {
    try{
        const subscriptions = await Subscription.findAll({
            include: [
                
                {
                  model: Newspaper,
                  attributes: ['name'], 
                },
                
                {
                  model: Subscriber,
                  attributes: ['email'], 
                },
              ],
            });
            const transformedSubscriptions = subscriptions.map(subscription => ({
                id: subscription.id,
                start_date: subscription.start_date,
                type: subscription.type,
                price: subscription.price,
                id_newspaper: subscription.id_newspaper,
                id_subscriber: subscription.id_subscriber,
                newspaperName: subscription.Newspaper ? subscription.Newspaper.name : null,
                subscriberEmail: subscription.Subscriber ? subscription.Subscriber.email : null,
              }));
        res.status(200).json(transformedSubscriptions);
    }catch(err){
        next(err);
    }
})

router.post('/', async (req,res,next) => {
    try{
        const {newspaperName,subscriberEmail,type,price} = req.body;
        
        const newspaper = await Newspaper.findOne({
            where: {
                name: newspaperName,
            }
        })
        if(newspaper === null) {
            return res.status(400).json({message: "Newspaper not found!"});
        }
        const subscriber = await Subscriber.findOne({
            where: {
                email: subscriberEmail,
            }
        })
        if(subscriber === null) {
            return res.status(400).json({message: "Subscriber not found!"});
        }
        const subscriptionCheck = await Subscription.findOne({
            where: {
                id_newspaper: newspaper.id,
                id_subscriber: subscriber.id,
            }
        })
        if(subscriptionCheck) {
            res.status(404).json({message: "Subscription already exists!"});
        }
        const date = new Date().toISOString().split('T')[0];
        const createdSubscription = await Subscription.create({
            start_date: date,
            type: type,
            price: price,
            id_newspaper: newspaper.id,
            id_subscriber: subscriber.id,
        });
        
        const transformedSubscription = {
            ...createdSubscription.dataValues,
            newspaperName: newspaper.name,
            subscriberEmail: subscriber.email
        }
        
        return res.status(200).json(transformedSubscription);
    }
    catch(err){
        next(err);
    }
})

router.delete('/:id', async(req, res, next) => {
    
    try{
        const {id} = req.params;
        await Subscription.destroy({
            where: {
                id:id
            }
        })
        return res.status(200).json({message: 'Subscription deleted successfully!'});
    }catch(err){
        next(err);
    }
})

router.patch('/:id', async(req, res, next) => {
    try{
        const {id} = req.params;
        const {type, price} = req.body;
        await Subscription.update({
            type: type,
            price: price,
        },{
            where: {
                id: id
            }
        })
        const updatedSubscription = await Subscription.findByPk(id);
        return res.status(200).json(updatedSubscription.dataValues);
    }catch(err){
        next(err); 
    }
})

export default router;