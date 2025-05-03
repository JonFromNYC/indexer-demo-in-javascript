// Node modules
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Environment variables
const BULK_INDEX_URL = process.env.BULK_INDEX_URL || 'https://support-lab-be.glean.com/api/index/v1/bulkindexdocuments';
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const DOCUMENTS_FOLDER = path.join(__dirname, 'documents');

async function loadDocuments() {
  const files = fs.readdirSync(DOCUMENTS_FOLDER).filter(f => f.endsWith('.json'));

  return files.map(filename => {
    const filePath = path.join(DOCUMENTS_FOLDER, filename);
    const doc = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // In case the viewURL needs to change
    // doc.viewURL = 'https://ncbi.nlm.nih.gov/pubmed/12345678';
    doc.permissions = {
      allowAnonymousAccess: true,
      allowAllDatasourceUsersAccess: true
    };

    return doc;
  });
}

async function bulkIndexDocuments(documents) {
  try {
    const response = await axios.post(
      BULK_INDEX_URL,
      {documents},
      {headers: {Authorization: `Bearer ${BEARER_TOKEN}`,'Content-Type': 'application/json'}}
    );

    console.log(`Bulk indexing ended with status: ${response.status}`);
  } catch (error) {
    console.error(`Bulk indexing failed with status: ${error.response?.status || ''} - ${error.response?.data || error.message}`);
  }
}

// asynchronous IIFE
(async () => {
  const docs = await loadDocuments();
  await bulkIndexDocuments(docs);
})();
