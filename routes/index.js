const express = require('express');
const router = express.Router();

// limit the options for group pages
// https://pokeapi.co/api/v2/type
const availableGroups = ['pokemon', 'type'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { template: 'index' });
});

/* GET group page. */
router.get('/:group', function(req, res, next) {
  const selectedGroup = req.params.group;
  availableGroups.includes(selectedGroup)
    ? res.render('layout', { template: 'group', selectedGroup}) 
    : res.render('layout', { template: 'error', selectedGroup});
});

/* GET group member page. */
router.get('/:group/:member', function(req, res, next) {
  const selectedGroup = req.params.group;
  const selectedMember = req.params.member;
  res.render('layout', { template: 'member' , selectedGroup, selectedMember});
});

module.exports = router;
