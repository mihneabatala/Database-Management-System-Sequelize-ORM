import express from 'express';
import db from '../database/database.js ';

const router = express.Router();

router.get('/spenders', async (req,res,next) => {
    try{
        const query = "SELECT s.name AS subscriber_name, COUNT(sub.id) AS subscription_count, SUM(sub.price) AS total_spending, s.id FROM Subscriber s JOIN Subscription sub ON s.id = sub.id_subscriber GROUP BY s.id ORDER BY total_spending DESC LIMIT 3;";
        const [spender] = await db.query(query);
        return res.status(200).json(spender);
    }catch(err){
        next(err);
    }
})

router.get('/revenue', async(req, res,next) => {
    try{
        const query = "SELECT  n.name as newspaper_name, COUNT(sub.id) AS total_subscriptions, SUM(sub.price) AS total_revenue,n.id FROM Newspaper n JOIN Subscription sub ON n.id = sub.id_newspaper GROUP BY n.id ORDER BY total_revenue DESC LIMIT 3;"
        const [revenue] = await db.query(query);
        return res.status(200).json(revenue);
    }catch(err){
        next(err);
    }
})

router.get('/category', async(req, res,next) => {
    try{
        const query = "SELECT n.category as newspaper_category, COUNT(sub.id) AS total_subscriptions, SUM(sub.price) AS total_revenue, MAX(n.id) as id FROM Newspaper n JOIN Subscription sub ON n.id = sub.id_newspaper GROUP BY n.category ORDER BY total_revenue DESC;"
        const [category] = await db.query(query);
        return res.status(200).json(category);
    }catch(err){
        next(err);
    }
})

export default router