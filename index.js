// Node Modules
require('dotenv').config()
const fs = require('fs'); // file system module
const path = require('path'); // file path module
const axios = require('axios'); // axios for HTTP requests

// Environment variables
const GLEAN_URL = process.env.GLEAN_URL || 'https://support-lab-be.glean.com/api/index/v1/indexdocument';
const BEARER_TOKEN = process.env.BEARER_TOKEN;

// Hold folder path to documents
const FOLDER_PATH = path.join(__dirname, 'documents'); // Folder containing the documents

// Import the indexdocuments function
const indexdocuments = require('./api/indexdocuments.js');

/**
 * main() sends JSON documents to Glean for Indexing.
 */
async function main() {
    const files = fs.readdirSync(FOLDER_PATH).filter(file => file.endsWith('.json'));
    
    for (const file of files) {
        const filePath = path.join(FOLDER_PATH, file);
        try {
            const fileContentAsUTF8 = fs.readFileSync(filePath, 'utf-8'); // force the file to be read as utf-8
            const doc = JSON.parse(fileContentAsUTF8); // Read and parse the JSON file
            await indexdocuments(doc); 
        } catch (error) {
            console.error(`Error in main() when reading or parsing file ${file} - Error: ${error.message}`);
        }
    }    
};

main()
    .then(() => console.log('Program ended.'))
    .catch(err => console.error('Error in main():', err.message));