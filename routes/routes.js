import express from 'express'
import { getPokedex, getPokedexEntry } from '../controllers/pokedexController.js'
import { getHumanDex, getHumanDexEntry } from '../controllers/humanController.js';
import { addSegment, deleteSegment, getCompleteArticle } from '../controllers/articleController.js';

const router = express.Router();

router.get('/pokedex', getPokedex)
router.get('/pokedex/:id', getPokedexEntry)
router.get('/humans', getHumanDex)
router.get('/humans/:id', getHumanDexEntry)
router.get('/article/:name', getCompleteArticle)
router.post('/write/:id', addSegment)
router.post('/delete/:id', deleteSegment)

export default router;