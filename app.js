const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose")
const date = require(__dirname + "/date.js") 
const app = express();
let items = ["Project" , "Grocery Shopping"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB",()=>{
   console.log("MongoDb connected"); 
});

const itemsSchema = {
    name:String
}

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item ({
    name:"Welcome to TO-DO-list"
})


const defaultItems = [item1];


app.get("/", function (req, res) {
  Item.find({}, function (err,foundItems){
 if (foundItems.length ===0) {
Item.insertMany(defaultItems , function (err){
    if(err) {
        console.log(err);
    } else {
        console.log("inserted");
    }
})
res.redirect("/")
 }else{
    res.render("list", {listTitle: day,newListItems:foundItems
    }); 
    
 }
  })
      let day = date.getDate()
});

app.post("/",function(req,res){
   
    const  itemName = req.body.newItem; 

    const item = new Item({
        name:itemName
    });
    item.save()
    res.redirect("/")
});

app.post("/delete" , function(req,res){
    const checkedItemId= req.body.checkbox

    Item.findByIdAndRemove(checkedItemId, function(err){
        if(!err) {
            console.log("deleted success");
            res.redirect("/")
        }
    })
})

 

app.post("/work", function(req,res){
    let item = req.body.newItem
    workItems.push(item);
    res.redirect("/work")
})


app.listen(3000, function () {
    console.log("server started at port 3000");
});