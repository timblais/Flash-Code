const Card = require('../models/Card');
const Deck = require('../models/Deck')

module.exports = {
    createCard: async (req, res) => {
        try {
            const deck = await Deck.findOneAndUpdate({_id: req.body.deckId}, {$inc: { totalCards: 1}}, {new: true})
            await Card.create({
                createdBy: req.body.user,
                createdDate: new Date(),
                title: `Card ${deck.totalCards}`,
                dueDate: new Date(),
                deck: req.body.deckId,
                question: req.body.question,
                answer: req.body.answer,
                repetitionNumber: 0,
                easinessFactor: 2.5,
                repetitionInterval: 1,
                totalViews: 0,
                language: req.body.language,
          });
          res.json('Card created');
        } catch (err) {
          console.log(err);
        }
    },

    editCard: async (req, res) => {
      try {
          const card = await Card.findOneAndUpdate({_id: req.body.cardId}, {
                question: req.body.question,
                answer: req.body.answer,
          }, {new: true});
          res.json('Card Edited')
      } catch (err) {
        console.log(err);
      }
  },

  editCardReset: async (req, res) => {
    try {
        const card = await Card.findOneAndUpdate({_id: req.body.cardId}, {
              dueDate: new Date(),
              question: req.body.question,
              answer: req.body.answer,
              repetitionNumber: 0,
              easinessFactor: 2.5,
              repetitionInterval: 1,
              totalViews: 0,
        }, {new: true});
        res.json('Card Edited and Reset')
    } catch (err) {
      console.log(err);
    }
},

deleteCard: async (req, res) => {
  try {
      
      const deck = await Deck.findOneAndUpdate({_id: req.body.deckId}, {$inc: { totalCards: -1}}, {new: true})
      const card = await Card.findOneAndDelete({_id: req.body.cardId})
      res.json('Card Deleted')
  } catch (err) {
    console.log(err);
  }
},

updateCardRating: async (req, res) => {
  try {
      const card = await Card.findOneAndUpdate({_id: req.body.cardId}, {
            dueDate: req.body.dueDate,
            repetitionNumber: req.body.repetitionNumber,
            easinessFactor: req.body.easinessFactor,
            repetitionInterval: req.body.repetitionInterval,
            totalViews: req.body.totalViews,
      }, {new: true});
      res.json('Card Ratings Updated')
  } catch (err) {
    console.log(err);
  }
},

}