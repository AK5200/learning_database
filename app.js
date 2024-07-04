const express = require('express');
const app = express();
const path = require('path');
const userModel = require("./models/user")

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
// static files are in public

app.get('/create',(req,res)=>
{
    res.render("create"); 
})


// CREATE 

app.post('/create', async (req,res)=>
{
    let {name, email, image} = req.body;   // same name as in create.ejs
    
     await userModel.create({
        name:name,   // same as name: name // name (schema) : name (req.body.name)
        email:email,
        image:image
    });


    // res.send(createdUser);
    res.redirect("/user");
})

app.get('/user', async (req,res)=>
{
    let users = await userModel.find()
    res.render("users",{users});
})



// UPDATE
app.get('/edit/:userid', async (req,res)=>
{        
    let user = await userModel.findOne({_id:req.params.userid});
    res.render("update", {user});
})


app.post('/update/:userid', async(req,res)=>{
 
    let {name, email, image} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.userid}, {name, email, image}, {new:true});
    res.redirect("/user");
})




// READ

app.get('/read', async (req,res)=>
{
    const user = await userModel.find({email: "anupam@gmail.com"});
     res.send(user);
})

app.get('/readAll', async (req,res)=>
{
    const allusers = await userModel.find();
    res.send(allusers);

})


// DELETE
app.get('/delete/:userid', async(req,res)=>
{
    await  userModel.findOneAndDelete({_id:req.params.userid});
    res.redirect("/user");
})



app.listen(3000, (err)=>
{
    if(err)
        console.error(err);
    console.log(`Server chal raha hai`);
})