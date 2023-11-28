// mongodb+srv://admin:<password>@image.ghzhekl.mongodb.net/?retryWrites=true&w=majority
// admin

const express = require("express");
const multer = require("multer");
const app = express();
const mongoose = require("mongoose");
const imageModel = require("./model/model.js");
const bodyparser = require("body-parser");
const https = require("https");
const request = require("request");
const path = require("path")
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
const PORT = 3003;

const dbUrl = "mongodb+srv://admin:Violinwalker%40onyx@image.ghzhekl.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(dbUrl, connectionParams)
    .then(function() {
        console.info("Pinged your deployment. You successfully connected to MongoDB!")
    }).catch(function(e) {
        console.log("Error While connecting to database: ", e);
    })

const Storage = multer.memoryStorage({
    destination: "./uploads",
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: Storage
}).single("photo")




app.use(express.urlencoded({ extended: false }));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    app.post("/", function(req, res) {
        upload(req, res, async function(err) {
            if (err) {
                console.log(err);
                // Handle error and potentially show an error page
                return res.status(500).send("Internal Server Error");
            } else {
                console.log(req.file);
                const name = req.body.name;
                const number = req.body.phonenumber;
                const imageBuffer = req.file.buffer;
                const imagename = req.file.originalname;
                const consoledraft = "Name : " + name +
                    ", Phone Number: " + number + ", image name :" + imagename;
                const coretest = "image string : " + imageBuffer;
                console.log(consoledraft);
                console.log(coretest);

                if (imageBuffer && imageBuffer.length > 0) {
                    const ImageModel = new imageModel({
                        name: name,
                        number: number,
                        image: { data: imageBuffer, contentType: req.file.mimetype }
                    });
                    try {
                        await ImageModel.save();
                        console.log("Image sent to the database");

                        // Redirect to a success page after successful form submission
                        return res.redirect("/success");
                    } catch (error) {
                        console.error(error);
                        return res.status(500).send({ "error": "Failed to insert to DB: " + error.message });
                    }
                } else {
                    console.log("Image buffer is empty or undefined");
                    return res.status(400).send({ "error": "No image data received" });
                }
            }
        });
    });

    // Define a success route where you can display a success message
    app.get("/success", function(req, res) {
        res.sendFile(__dirname + "/public/success.html");
    });
});
app.listen(PORT, function(response) {
    console.log("Its currently breathing in the Port :", PORT)
});