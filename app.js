// For server Web apps
const express = require("express");
const app = express();

// For Database
const mongoose = require("mongoose");

// For accessing files and folders
const path = require("path");

// For accessing DB and its Schema and data
const Listing = require("./models/listing.js");

// To override post by PUT,PATCH,PUT,DELETE
const methodOverride = require("method-override");

// To create template/ layouts
const ejsMate = require("ejs-mate");

// To use ejs files 
app.set('view engine', 'ejs');
// Giving path for views folder to access ejs files
app.set('views', path.join(__dirname, 'views'));
// Giving path for public forlder to access static files (.css,.js)
app.use(express.static(path.join(__dirname,"public")));
// To get the data/ details from url
app.use(express.urlencoded({extended: true}));

// Activating/ giving fuctionality of method-override package
app.use(methodOverride("_method"));

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

// MongoDB server address
const MONGO_URL = "mongodb://127.0.0.1:27017/wandurlust";

// Connecting Server with Database
main().then(() => {
    console.log("Connected to database.");
}).catch((err) => {
    console.log(err);
});

// Fuction to connet
async function main() {
    await mongoose.connect(MONGO_URL);
}


// Creating Server
app.listen(8080, () => {
    console.log("server is listning to port 8080");
});

// Home 
app.get( "/", (req,res) => {
    res.send("Hi, this is root!");
});

// app.get( "/testListing", async (req,res) => {
//     let sampleListing = new Listing( {
//         title: "Villa",
//         desciption: "new villa",
//         price: 1200,
//         location: "Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("Sample was saved!");
//     res.send("Successful testing.");
// });

// INDEX Route
// To show all listting
app.get( "/listings", async (req ,res) => {
    const allListings = await Listing.find( {} );
    res.render("listings/index.ejs", {allListings});
});


// CREATE
// NEW Route
// To create new listing
app.get( "/listings/new" , (req,res) => {
    res.render("listings/new.ejs");
});

// UPDATE Route
// To get details of listing and add it to DB
app.post( "/listings" , async (req,res) => {
    // let {title,description,image,price,location,country} = req.body;
    // let newListing = new Listing({
    //     title: title,
    //     description: description,
    //     image: image,
    //     price: price,
    //     location: location,
    //     country: country
    // });
    // OR
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log("New Listing added successfully!");
    res.redirect("/listings");
});

// UPDATE Route
// To Edit and Update listing
app.get( "/listings/:id/edit", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

// PUT request
// to updata details in db
app.put( "/listings/:id", async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    console.log("Update successfully!");
    res.redirect("/listings");
});

// DELETE Route
// to delete the listings
app.delete( "/listings/:id" , async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// SHOW Route
// To show the details of particular listing (destinations/place)
app.get( "/listings/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});