//jshint esversion:6

// Requires
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

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

const defaultLinksJson = fs.readFileSync('public/json/default.json');
const defaultLinksObj = JSON.parse(defaultLinksJson);
console.log(defaultLinksObj[0]);

var defaultLinks = [];
for (var i = 0; i < defaultLinksObj.length; i++) {
	const link = new Link(defaultLinksObj[i]);
	defaultLinks.push(link);
}


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

	// remover todos os elementos que tem list com o nome pedido
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
