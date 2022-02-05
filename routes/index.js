const express = require("express");
const PokemonService = require("../services/pokemonService");
const router = express.Router();

module.exports = (params) => {
  // limit the options for group pages
  // https://pokeapi.co/api/v2/type
  const availableGroups = ["pokemon", "type"];

  /* GET home page. */
  router.get("/", function (req, res, next) {
    try {
      res.render("layout", { template: "index" });
    } catch (err) {
      return next(err);
    }
  });

  /* GET group page. */
  router.get("/:group", function (req, res, next) {
    const selectedGroup = req.params.group;
    availableGroups.includes(selectedGroup)
      ? res.render("layout", { template: "group", selectedGroup })
      : res.render("layout", { template: "error", selectedGroup });
  });

  /* GET group member page. */
  router.get("/:group/:member", async function (req, res, next) {
    try {
      const selectedGroup = req.params.group;
      const selectedMember = req.params.member;
      const pokemonService = new PokemonService();
      pokemonService.idQuery = selectedMember;
      const pokemonData = await pokemonService.getData();
      const pokemonSpecies = await pokemonService.getSpecies();
      const pokemonEvolution = await pokemonService.getEvolution();

      return res.render("layout", {
        template: "member",
        selectedGroup,
        selectedMember,
        pokemonData,
        pokemonSpecies,
        pokemonEvolution,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
