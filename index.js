const express = require('express'); 
const app = express(); 
let ejs = require('ejs'); 
const { v4: uuidv4 } = require('uuid');


app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
const comments = [
    {
        id: uuidv4(), 
        username: "Josh", 
        description: "The funniest thing I've ever seen"
    } ,
    { 
        id: uuidv4(),
        username: "Caren", 
        description: "I need to speak to the manager" 
    }, 
    {
        id: uuidv4(),
        username: "Sk8terboi", 
        description: "Cool dude"
}
]

app.get('/comments', (req, res) => {
    res.render('comments', {comments})
});

app.get('/comments/new', (req, res) =>{
    res.render('newcomment')
})
app.post('/comments', (req, res) =>{
    const {username, description} = req.body; 
    comments.push({username, description, id: uuidv4()});
    res.redirect("/comments");
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params; 
    const comment = comments.find(c => c.id === id);
    res.render('show', {comment}); 
})
app.get('/tacos', (req,res) => {
    res.render('tacos')
})

app.post('/tacos', (req,res) => {
    const {meat, qty} =  req.body
    res.send(`Ok you have ordered ${qty}  ${meat}`)
})

app.listen(3000, () => {
    console.log('on port 3000')
})