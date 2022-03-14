const note = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// API ROUTE: `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
note.get('/api/notes', (req, res) =>
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

// API ROUTE: `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
note.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, '../db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });

//  API ROUTE: `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
note.delete('/api/notes/:uuid', (req, res) => {
    let deletednote = req.params.uuid
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))

    for (let i = 0; i < json.length; i++) {
        if (json[i].uuid === chosenNoteToDelete) {
            // remove ONE element from the json array at the index position with array.splice(index, howmany)
            json.splice(i, 1);
            return;
        }
    }
    fs.writeFile(__dirname + "../db/db.json", JSON.stringify(json), (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.send("Successfully deleted");
    });
});
       
  module.exports = note;