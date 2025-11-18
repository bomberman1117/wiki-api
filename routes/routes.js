import express from 'express'
import { getPokedex, getPokedexEntry } from '../controllers/pokedexController.js'
import { getHumanDex, getHumanDexEntry } from '../controllers/humanController.js';
import { getCompleteArticle } from '../controllers/articleController.js';



const router = express.Router();

router.get('/pokedex', getPokedex)
router.get('/pokedex/:id', getPokedexEntry)
router.get('/humans', getHumanDex)
router.get('/humans/:id', getHumanDexEntry)
router.get('/article/:name', getCompleteArticle)






export default router;