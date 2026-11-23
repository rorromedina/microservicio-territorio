require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const soap = require('soap');
const conectarDB = require('./conexion/db');
const Territorio = require('./conexion/territorioModel');
const serviceObject = require('./servicios/soapHandlers');

const app = express();
app.use(cors());

const wsdlXml = fs.readFileSync(path.join(__dirname, 'servicios', 'territorio.wsdl'), 'utf8');
const PORT = process.env.PORT || 3001;

const iniciar = async () => {
  await conectarDB();

  // Cargar comunas iniciales si está vacío
  const total = await Territorio.countDocuments();
  if (total === 0) {
    await Territorio.create([
      { region: 'Metropolitana', provincia: 'Santiago', comuna: 'Providencia' },
      { region: 'Metropolitana', provincia: 'Santiago', comuna: 'Las Condes' },
      { region: 'Valparaíso', provincia: 'Valparaíso', comuna: 'Viña del Mar' }
    ]);
    console.log('🗺️ Comunas iniciales cargadas');
  }

const server = app.listen(PORT, () => {
      soap.listen(app, '/wsdl', serviceObject, wsdlXml, () => {
        console.log(`Servidor SOAP corriendo en http://localhost:${PORT}/wsdl?wsdl`);
      });

      const listeners = server.listeners('request').slice(0);
      server.removeAllListeners('request');
      server.on('request', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, SOAPAction');

        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }

        for (const listener of listeners) {
          listener.call(server, req, res);
        }
      });
    });
};

iniciar();
