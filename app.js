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

// Creating a model for each link
const Link = mongoose.model("Link", linkSchema);

// Getting default set of links
const defaultLinksJson = fs.readFileSync('public/json/default.json');
const defaultLinksObj = JSON.parse(defaultLinksJson);

var defaultLinks = [];
for (var i = 0; i < defaultLinksObj.length; i++) {
	const link = new Link(defaultLinksObj[i]);
	defaultLinks.push(link);
}

// Uses
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Password
const defaultPsw = "1234";
let enteredPsw = "";


// /
app.route("/")
	
	// GET /
	.get(function(req, res){

		enteredPsw = "";

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
	})

	// POST /
	.post(function(req, res){
	});


// /editmode
app.route("/editmode")

	// GET /editmode
	.get(function(req, res){

		if (enteredPsw === defaultPsw) {
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

					res.render("edit", {linkItems: foundLinks, listItems: foundLists});
				}
			});
		} else {
			res.status(403).send("403 - Forbidden");
		}
	})

	// POST /editmode
	.post(function(req, res){
		enteredPsw = req.body.editModePW;
		const isChecked = req.body.editModeCB;

		if (isChecked) {
			res.redirect("/editmode");
		} else {
			res.redirect("/");
		}
	});


// POST /addlink
app.post("/addlink", function(req, res){
	const link = new Link({
		list: req.body.listName,
		name: req.body.linkName,
		link: req.body.linkLink,
		icon: req.body.linkIcon
	});

	link.save();

	res.redirect("/editmode");
});


// POST /deletelist
app.post("/deletelist", function(req, res){
	const deleteList = req.body.removeList;

	// remover todos os elementos que tem list com o nome pedido
	Link.deleteMany({ list: deleteList }, function (err) {
		if(!err) {
	  		console.log("Removida lista: " + deleteList);
			res.redirect("/editmode");
	  }
	});
});


// POST /deletelink
app.post("/deletelink", function(req, res){
	const deleteLink = req.body.removeLink;

	Link.findByIdAndRemove(deleteLink, function(err){
		if(!err){
			console.log("Removido: " + deleteLink);
			res.redirect("/editmode");
		}
	});
});


// Starting app on localhost:3000
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
