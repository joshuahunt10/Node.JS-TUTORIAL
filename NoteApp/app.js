const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;

var command = argv._[0];
// console.log('Command : ' + command);
// // console.log('Process ARGS ' , process.argv);
// console.log('Yargs ARGS ' , argv);

if(command === 'add'){
  var note = notes.addNote(argv.title,argv.body);
  if(note){
    console.log('SUCCESS!! YOUR NOTE WAS ENTERED INTO THE DATABASE!');
    notes.logNote(note);
  } else {
    console.log('WARNING!!! NOTE NOT CREATED!');
    console.log('A note with similar title already exists');
  }
} else if(command === 'list'){
  var allNotes = notes.getAll();
  console.log(`Prining ${allNotes.length} Note(s).`);
  allNotes.forEach((note) => {
    notes.logNote(note);
  })
} else if(command === 'read'){
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('SUCCESS!! YOUR NOTE WAS FOUND IN THE DATABASE!');
    notes.logNote(note);
  } else {
    console.log('ERROR!!! NOTE NOT FOUND IN THE DATABASE!');
  }
} else if(command === 'remove'){
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'SUCCESS! Note Was Removed' : 'ERROR! Note Not Found';
  console.log(message);
} else{
  console.log('Command not recognized');
}
