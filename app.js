const express = require('express');
const app = express();
const path = require('path');
const userModel = require("./models/user")

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
// static files are in public

app.get('/',(req,res)=>
{
    res.render("index"); 
})

app.get('/create', async (req,res)=>
{
    let {name, email, image} = req.body;   // same name as in create.ejs
    
    let createdUser = await userModel.create({
        name,   // same as name: name
        email,
        image
    });

    res.send(createdUser);
})

app.get('/user', async (req,res)=>
{
    let allUsers = await userModel.find()
    res.render("users",{users:allUsers})
})

app.listen(3000, (err)=>
{
    if(err)
        console.error(err);
    console.log(`Server chal raha hai`);
})