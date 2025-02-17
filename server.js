const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());

let mockDB = {
  endpoints: {},
  data: {},
  counters: {}
};

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const rawData = fs.readFileSync(DATA_FILE, 'utf8');
      mockDB = JSON.parse(rawData);
    } else {
      initializeDefaultData();
      saveData();
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    initializeDefaultData();
  }
}

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(mockDB, null, 2), 'utf8');
}

function initializeDefaultData() {
  const defaultEndpoints = [
  ];

  mockDB = {
    endpoints: {},
    data: {},
    counters: {}
  };

  defaultEndpoints.forEach(endpoint => {
    mockDB.endpoints[endpoint] = true;
    mockDB.data[endpoint] = [];
    mockDB.counters[endpoint] = 0;
  });
}

loadData();

app.post('/endpoints', (req, res) => {
  const { endpoint } = req.body;
  
  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint name is required' });
  }
  
  if (mockDB.endpoints[endpoint]) {
    return res.status(400).json({ error: 'Endpoint already exists' });
  }

  mockDB.endpoints[endpoint] = true;
  mockDB.data[endpoint] = [];
  mockDB.counters[endpoint] = 0;
  
  saveData();
  
  res.status(201).json({ 
    message: `Endpoint '/${endpoint}' created successfully`,
    endpoint: `/${endpoint}`
  });
});

app.use('/:endpoint*', (req, res, next) => {
  const { endpoint } = req.params;
  
  if (!mockDB.endpoints[endpoint]) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  
  next();
});

app.route('/:endpoint')
  .get((req, res) => {
    const data = mockDB.data[req.params.endpoint];
    res.json(data);
  })
  .post((req, res) => {
    const endpoint = req.params.endpoint;
    const newId = ++mockDB.counters[endpoint];
    const newItem = {
      id: newId,
      ...req.body
    };
    
    mockDB.data[endpoint].push(newItem);
    saveData();
    
    res.status(201).json(newItem);
  });

app.route('/:endpoint/:id')
  .delete((req, res) => {
    const endpoint = req.params.endpoint;
    const items = mockDB.data[endpoint];
    const filteredItems = items.filter(i => i.id !== Number(req.params.id));
    
    if (items.length === filteredItems.length) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    mockDB.data[endpoint] = filteredItems;
    saveData();
    
    res.status(204).send();
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mock API persistente rodando na porta ${PORT}`);
  console.log(`Dados armazenados em: ${DATA_FILE}`);
});