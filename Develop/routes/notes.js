const router = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// API ROUTE: `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
router.get('/notes', (req, res) => {
console.log(`${req.method} request received for notes`)
  readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)))
});

// API ROUTE: `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
router.post('/notes', (req, res) => {
    // console.info(`${req.method} request received to make a new note`);
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, 'db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding the new note');
    }
  });

//  API ROUTE: `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
router.delete('/notes/:id', (req, res) => {
  // console.info(`${req.method} request received to remove a note`);
  let deletedNote = req.params.id
  readFromFile('db/db.json').then((data) => { return JSON.parse(data) })
    .then((jsonData) => {
      
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].id === deletedNote) {
          // remove ONE element from the json array at the index position with array.splice(index, howmany)
          jsonData.splice(i, 1);
        }
      }
      console.log(jsonData)
      writeToFile("db/db.json", jsonData, (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.send("Successfully deleted");
      });
    })
});
       
  module.exports = router;