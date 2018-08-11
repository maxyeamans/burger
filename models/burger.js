const orm = require("../config/orm.js");

const burger = {
    all: cb => {
        orm.selectAll("burgers", res => {
            cb(res)
        });
    },
    create: (val, cb) => {
        orm.insertOne("burgers", "burger_name", val, (res) => {
            cb(res);
        });
    },
    update: (objColVals, condition, cb) => {
        orm.updateOne("burgers", objColVals, condition, (res) => {
            cb(res);
        });
    }
};

module.exports = burger;