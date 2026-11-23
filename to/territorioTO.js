class TerritorioTO {
  constructor(doc) {
    this.id = doc._id.toString();
    this.region = doc.region;
    this.provincia = doc.provincia;
    this.comuna = doc.comuna;
  }
}

module.exports = TerritorioTO;