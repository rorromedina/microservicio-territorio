const Territorio = require('../conexion/territorioModel');
const TerritorioTO = require('../to/territorioTO');

class TerritorioNegocio {
  validarClaveVPN(claveVpn) {
    if (!claveVpn || claveVpn !== process.env.VPN_SECRET_KEY) {
      throw new Error('Acceso denegado: Clave VPN inválida.');
    }
  }

  async agregar(claveVpn, region, provincia, comuna) {
    this.validarClaveVPN(claveVpn);
    const nuevo = await Territorio.create({ region, provincia, comuna });
    return new TerritorioTO(nuevo);
  }

  async listar(claveVpn) {
    this.validarClaveVPN(claveVpn);
    const lista = await Territorio.find();
    return lista.map((t) => new TerritorioTO(t));
  }

  async eliminar(claveVpn, id) {
    this.validarClaveVPN(claveVpn);
    await Territorio.findByIdAndDelete(id);
    return true;
  }
}

module.exports = new TerritorioNegocio();