const negocio = require('../negocios/territorioNegocio');

const serviceObject = {
  TerritorioService: {
    TerritorioPort: {
      AgregarTerritorio: async function (args) {
        try {
          await negocio.agregar(args.claveVpn, args.region, args.provincia, args.comuna);
          return { exito: true, mensaje: 'Comuna registrada correctamente' };
        } catch (err) {
          return { exito: false, mensaje: err.message };
        }
      },
      ListarTerritorios: async function (args) {
        try {
          const lista = await negocio.listar(args.claveVpn);
          return { territoriosJson: JSON.stringify(lista) };
        } catch (err) {
          return { territoriosJson: JSON.stringify({ error: err.message }) };
        }
      },
      EliminarTerritorio: async function (args) {
        try {
          await negocio.eliminar(args.claveVpn, args.id);
          return { exito: true, mensaje: 'Comuna eliminada' };
        } catch (err) {
          return { exito: false, mensaje: err.message };
        }
      }
    }
  }
};

module.exports = serviceObject;