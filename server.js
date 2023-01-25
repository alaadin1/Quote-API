const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const quoteRouter = express.Router()
app.use('/api/quotes', quoteRouter)

const PORT = process.env.PORT || 5500;

app.use(express.static('public'));


//return all quotes from the data if the request has no query
quoteRouter.get('/', (req,res,next)=>{
    const queryParam = req.query
    const quote = []
    if(Object.keys(queryParam).length == 0){

        for(let i=0; i<quotes.length; i++){
            quote.push(quotes[i])
        }
        
    }
    else{
        const person = req.query.person
        for(let i=0; i<quotes.length; i++){
            if (quotes[i].person == person){
                quote.push (quotes[i])
            }
        }
        
    }
    const returnObj = {quote}
    res.send(returnObj)
})


//get random quote
quoteRouter.get('/random', (req,res,next)=>{
    let quote = getRandomElement(quotes)
    const returnedQuote = {
        quote
    }
    res.send(returnedQuote)
})

//add new quotes to the our quotes
quoteRouter.post('/',(req,res,next)=>{
    const addElement = req.query
    if(addElement.person && addElement.quote){
        quotes.push((addElement))
        res.send(quotes)
    }
    else{
        res.status(404).send()
    }
    
   

})





app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})