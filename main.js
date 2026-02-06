// The challenge is to use asyncronous JavaScript, your program should start with accessing the first book:

// This is done at this URL - https://anapioficeandfire.com/api/books/1
// By using the data from that URL, it should derive the povCharacter urls for the fist book
// It should then use these urls to fetch the details of each pov character
// For each character, the program should make a file on your computer in a known location, and write the following data to it:
// the characters name
// the characters gender
// the characters culture
// is the chahracter alive?
// any titles the character has
// the name of any allegiances the character has
// This is a filer per charecter from the book

// fetch 

// https://anapioficeandfire.com/api/books/1

// comments, try to say why you are doing something, and not what

import { writeFile } from 'node:fs/promises';

async function fetchUrl(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }
    const res = await response.json();
    return res
}

async function getPovCharacters(book) {
    const url = `https://anapioficeandfire.com/api/books/${book}`;
    const result = await fetchUrl(url);    
    return result.povCharacters;
}

// Homework
// Change this to write a file for a character as soon as it has got the data 
// Change it so it does not get all characters data first, and then write all files
try {
    // we know which book
    const bookNr = 5
    const povCharacters = await getPovCharacters(bookNr)
    const promises = povCharacters.map(url => fetchUrl(url))
    const characters = await Promise.all(promises)
    console.log(characters.map(char => char.name))
    const filePromises = characters.map(char => {
        return writeFile(`./output/${char.name}.txt`, char.name)
    })
    
    await Promise.all(filePromises);
    console.log('DONE')

}  catch(error) {
    console.error(error.message);
}






