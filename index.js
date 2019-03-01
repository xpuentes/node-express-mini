// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
const PORT = '3001';

server.use(express.json());

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if(!name || !bio) {
    res.status(400).json({errorMessage: 'Please provide a name and bio for the user.'});
  } else {
    db.insert({name, bio})
      .then(users => {
        res.status(201).json(users)
      }).catch(err => {
        res.status(500).json({error: 'There was an error while saving.'})
      });
  }
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.json(users)
    }).catch(err => {
      res.status(500).json({error: 'The users information could not be retreived!'})
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(users =>{
      if(users){
        res.json(users);
      }else{
        res.status(404).json({message: 'The user with specified ID does not exist!'})
      }
    }).catch(err => {
      res.status(500).json({error: 'The user information could not be retrieved.'})
    });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
