const express = require('express')
const router = express.Router()
const deckController = require('../controllers/deck') 

router.post('/', deckController.createDeck)
router.get('/byuser/:userId', deckController.getUserDecks)
router.get('/byuserwithcardsdue/:userId', deckController.getUserDecksWithCardsDue)
router.get('/bydeck/:userId/:deckId', deckController.getDeckandCards)

module.exports = router