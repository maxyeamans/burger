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

/*  Added this as an easy way to get all of the burgers for testing.
    This isn't actually used by the front end. */
router.get("/api/burgers", (req, res) => {
    burger.all( results => {
        res.json(results);
    });
});

/* 
    The request for this API route should contain an object with a single key/value:
    {
        "burger_name": [burger name goes here]
    }
*/
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