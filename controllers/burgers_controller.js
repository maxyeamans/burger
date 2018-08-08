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

// TODO: Verify that this works
router.post("/api/burgers", (req, res) => {
    burger.create( "burger_name", req.body.name, result => {
        res.json({ id: result.insertID });
    });
});

router.put("/api/burgers/:id", (req, res) => {
    const burgerID = req.params.id;

    burger.update(/* TODO: fill this in when views are completed */)
});

module.exports = router;