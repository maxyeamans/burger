const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

router.get("/", (req, res) => {
    burger.all( data => {
        const handlebarObj = {
            burgers: data
        };
        console.log("Incoming data for burgers:", handlebarObj);
        res.render("index", handlebarObj);
    });
});

// Adding this as an easy way to get all of the burgers
router.get("/api/burgers", (req, res) => {
    burger.all( results => {
        res.json(results);
    });
});

// TODO: Verify that this works
router.post("/api/burgers", (req, res) => {
    burger.create( req.body.name, result => {
        console.log("POST response:", result.insertID);
        res.json( {id: result.insertID} );
    });
});

router.put("/api/burgers/:id", (req, res) => {
    const condition = "id=" + req.params.id;

    burger.update( { devoured : true }, condition, result => {
        console.log("You just ate a burger.");
    });
});

module.exports = router;