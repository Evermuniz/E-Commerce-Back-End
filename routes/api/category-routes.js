const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//using .then method since we are making HTTP requests to a db
router.get("/", (req, res) => {
  Category.findAll({ //retrieve all categories
    include: [Product], //auto join product table
  })
    .then((category) => res.json(category)) //return all categories in json format
    .catch((err) => res.status(500).json(err)); //catch errors and respond with 500 status code and err in json 
});

router.get("/:id", (req, res) => {
  //route includes id
  Category.findOne({
    //find one category where the id in the route url matches
    where: { id: req.params.id },
    include: [Product], //auto join the product table
  })
    .then((category) => res.json(category)) //return the single category in json format
    .catch((err) => res.status(400).json(err)); //catch errors and respond with 500 status code and err in json
});

router.post("/", (req, res) => {
  //post a new category
  Category.create(req.body) //using create method
    .then((category) => res.status(200).json(category)) //return a successfull 200 code
    .catch((err) => res.status(400).json(err)); //catch errors and respond with 500 status code and err in json
});

router.put("/:id", (req, res) => {
  Category.update(req.body, {
    //update an existing category where the id in the route url matches
    where: { id: req.params.id },
  })
    .then((category) => res.status(200).json(category)) //return a successfull 200 code
    .catch((err) => res.status(400).json(err)); //catch errors and respond with 500 status code and err in json
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    //delete an existing category where the id in the route url matches
    where: { id: req.params.id },
  })
    .then((category) => res.status(200).json(category)) //return a successfull 200 code
    .catch((err) => res.status(400).json(err)); //catch errors and respond with 500 status code and err in json
});

module.exports = router;
