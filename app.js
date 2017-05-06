var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Post = require("./models/post");
var app = express();

mongoose.connect("mongodb://localhost/blog_post");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));


//creating an example 
//Post.create(
//    {
//    name: "Abdusamad",
//    title: "Very Second Post",
//    article: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its          layout. The point of using Lorem Ipsum is that it has a more or less normal distribution of letters, as opposed to using        Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors        now use Lorem Ipsum as their default model text, and a search for lorem"
//}, function(err, post){
//    if(err){
//        console.log("something is wrong");
//    }else{
//        console.log("newly created post");
//        console.log(post)
//    }
//});

//rendering landing page
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX ROUTE -- render all posts
app.get("/posts", function(req, res){
    //get all post from db
    Post.find({}, function(err, all_posts){
        if(err){
            console.log(err);
        }else{
            res.render("posts", {posts:all_posts});
        }
    })
});

//CREATE ROUTE -- get info from form and stored to db
app.post("/posts", function(req, res){
    //get the value from the form
    var name = req.body.name;
    var title = req.body.title;
    var article = req.body.article;
    
    //creating new object
    var newPosts = {name:name, title:title, article:article}
   //create new post and save to db
    Post.create(newPosts, function(err, post){
        if(err){
            console.log(err);
        }else{
            console.log("posts created successfully")
            res.redirect("/posts")
        }
    })
});

//NEW ROUTE -- render post form
app.get("/posts/new", function(req, res){
    res.render("new");
});

//SHOW ROUTE -- more info about posts
app.get("/posts/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err)
        }else{
            res.render("show", {post: foundPost});      
        }
    })
});

//connect to server
app.listen(3000, function(){
	console.log("server started");
});
