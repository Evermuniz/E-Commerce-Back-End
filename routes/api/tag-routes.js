const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    //auto join the product table using the product tag model
    include: [{model: Product, through: ProductTag}], 
  })
    .then((tag) => res.json(tag))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    //auto join the product table using the product tag
    include: [{ model: Product, through: ProductTag }],
  })
    .then((tag) => res.json(tag))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
