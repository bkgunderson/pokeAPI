const axios = require("axios");
const BASE_URL = "https://pokeapi.co/api/v2/";

class PokemonService {
  /**
   * Constructor
   * @param {*} string representing pokemon id
   */
  constructor() {
    this.id = "";
  }

  /**
   * Fetches data from Poke API
   */
  async getData() {
    const endpoint = `${BASE_URL}pokemon/${this.id}`;
    const result = await axios.get(endpoint);
    const data = await result.data;
    return data;
  }

  async getSpecies() {
    const data = await this.getData();
    const endpoint = data.species.url;
    const result = await axios.get(endpoint);
    return result.data;
  }

  async getEvolution() {
    const data = await this.getSpecies();
    const endpoint = data.evolution_chain.url;
    const result = await axios.get(endpoint);
    return result.data;
  }

  get idQuery() {
    return this.id;
  }

  set idQuery(newId) {
    this.id = newId;
  }
}

module.exports = PokemonService;
