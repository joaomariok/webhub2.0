//jshint esversion:6

// Requires
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// Connect to mongoose port
mongoose.connect("mongodb://localhost:27017/linksDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Creating app variable
const app = express();

// Links schema
const linkSchema = new mongoose.Schema({
	list: String,
	name: String,
	link: String,
	icon: String
});

const Link = mongoose.model("Link", linkSchema);

const link1 = new Link({
	list: "Home",
	name: "Trello",
	link: "https://trello.com/",
	icon: "https://a.trellocdn.com/prgb/dist/images/ios/apple-touch-icon-72x72-precomposed.91a3a04ec68a60903801.png"
});

const link2 = new Link({
	list: "Home",
	name: "Gmail",
	link: "https://mail.google.com/mail/u/0/#inbox",
	icon: "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico"
});

const link3 = new Link({
	list: "Sociais",
	name: "Facebook",
	link: "https://www.facebook.com",
	icon: "https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico"
});

const link4 = new Link({
	list: "Sociais",
	name: "Twitter",
	link: "https://twitter.com/home",
	icon: "https://abs.twimg.com/favicons/twitter.ico"
});

const defaultLinks = [link1, link2, link3, link4];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){

	Link.find({}, function(err, foundLinks){

		if (foundLinks.length === 0) {
			Link.insertMany(defaultLinks, function(err){});
			res.redirect("/");
		} else {
			var linksSet = new Set();
			foundLinks.forEach(function(oneLink){
				linksSet.add(oneLink.list);
			})
			foundLists = Array.from(linksSet);

			res.render("lists", {linkItems: foundLinks, listItems: foundLists});
		}
	});
});


app.post("/", function(req, res){

	const link = new Link({
		list: req.body.listName,
		name: req.body.linkName,
		link: req.body.linkLink,
		icon: req.body.linkIcon
	});

	link.save();

	res.redirect("/");

});


app.post("/deletelist", function(req, res){
	const deleteList = req.body.removeList;
});


app.post("/deletelink", function(req, res){
	const deleteLink = req.body.removeLink;

	Link.findByIdAndRemove(deleteLink, function(err){
		if(!err){
			console.log("Removido: " + deleteLink);
			res.redirect("/");
		}
	});
});


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
