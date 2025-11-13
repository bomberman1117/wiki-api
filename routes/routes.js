import express from 'express'
import { getPokedex, getPokedexEntry } from '../controllers/pokedexController.js'
import { getHumanDex, getHumanDexEntry } from '../controllers/humanController.js';



const router = express.Router();

router.get('/pokedex', getPokedex)
router.get('/pokedex/:id', getPokedexEntry)
router.get('/humans', getHumanDex)
router.get('/humans/:id', getHumanDexEntry)






export default router;