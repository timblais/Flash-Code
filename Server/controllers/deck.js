const Deck = require('../models/Deck');
const Card = require('../models/Card');

module.exports = {
    createDeck: async (req, res) => {
        try {
          await Deck.create({
            createdBy: req.body.user,
            createdDate: new Date(),
            title: req.body.deckTitle,
            language: req.body.language,
            totalCards: 0,
          });
          res.json('Deck has been created');
        } catch (err) {
          console.log(err);
        }
      },

    getUserDecks: async (req, res) => {
      const user = req.params.userId
      try {
        const decks = await Deck.find({ createdBy: user});
        res.json({decks: decks})
      } catch (err) {
        console.log(err)
      }
    },

    getUserDecksWithCardsDue: async (req, res) => {
      const user = req.params.userId
      try {
        const decks = await Deck.find({ createdBy: user});
        const cards = await Card.find({ createdBy: user});

        let decksAndCards = {}
        for (const deck of decks){
          decksAndCards[deck['_id']] = []
          decksAndCards[deck['_id']][0] = deck
          decksAndCards[deck['_id']][1] = []
        }

        for (const card of cards){
          if(decksAndCards[card['deck']]){
            let date = new Date(card['dueDate'])
            let tomorrow = new Date()
            tomorrow.setHours(24,0,0,0)
            if(date <= tomorrow){
              console.log(true)
              decksAndCards[card['deck']][1].push(card)
            }
          }
        }
        
        res.json({decksAndCards: decksAndCards})
      } catch (err) {
        console.log(err)
      }
    },

    getDeckandCards: async (req, res) => {
      const user = req.params.userId
      const deck = req.params.deckId
      try {
        const myDeck = await Deck.find({ createdBy: user, _id: deck});
        const deckCards = await Card.find({createdBy: user, deck: deck});
        res.json({deck: myDeck[0], cards: deckCards})
      } catch (err) {
        console.log(err)
      }
    }
}