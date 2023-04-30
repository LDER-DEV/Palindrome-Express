const express = require('express');
const app = express()
const PORT = 9900
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db, collection;

app.set('view engine', 'ejs')
app.use(express.static('public'))
MongoClient.connect('mongodb+srv://ludjydev:lSpwzCoEl3UYWQSn@cluster0.esdycxh.mongodb.net/?retryWrites=true&w=majority'

, { useUnifiedTopology: true }).then(
  client => {
    console.log('Connected to Database')
    db = client.db('Palindrome')
    
  }
)

app.use(bodyParser.urlencoded())

app.use(bodyParser.json())



app.listen(9900, console.log(`listening on port ${PORT}`))


app.use(cors())

app.get('/', (request, response)=>{
    response.render('index.ejs')
})
app.get('/main.js',(request, response)=>{
    response.sendFile(__dirname + '/main.js')
})

app.get('/api/:palindrome',(req,res)=>{
    const palindrome = req.params.palindrome.toLowerCase()
      let reverse = palindrome.toLowerCase().split('').reverse().join('')
      if(palindrome === reverse){
        result = `It's a Palindrome!`
      }else{
       result = `Not a Palindrome :(`
      }
        const objToJson = {
          result :`${result}`
        }
        res.end(JSON.stringify(objToJson));
  
    
})



app.post('/palindromes/' ,  (req, res) =>{
  const palindrome = req.body.word.toLowerCase()
  console.log(palindrome)
  let reverse = palindrome.toLowerCase().split('').reverse().join('')
  if(palindrome === reverse){
  db.collection('Palindrome').insertOne({word: req.body.word, palindrome: req.body.palindrome},
    console.log(req.body)
  
)
}else{
  console.log('not a palindrome')
}

})
