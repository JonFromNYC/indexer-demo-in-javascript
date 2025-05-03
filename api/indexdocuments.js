// Node Modules
const axios = require('axios'); // axios for HTTP requests
// Environment variables
const GLEAN_URL = process.env.GLEAN_URL || 'https://support-lab-be.glean.com/api/index/v1/indexdocument';
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const count = 1; // used for terminal output.

/**
 * 
 * @param {JSON} doc - Document to be indexed
 * @return {Promise<void>} - A promise that resolves when the document is indexed
 * @description - This function indexes documents via the Glean API.
 */
async function indexdocuments(doc) {
    try {
        // Override viewURL if needed
        // doc.ViewURL = 'https://ncbi.nlm.nih.gov/pubmed/12345678';

        doc.permissions = {
            "allowedUsers": [
                {"email": "alex@glean-sandbox.com", "datasourceUserId": "dataSourceId","name": "Alex from Glean"},
                {"email": "rajeev.bector@glean.com","datasourceUserId": "dataSourceId","name": "Rajeev Bector"},
            ],
            "allowAnonymousAccess": true,
            "allowAllDatasourceUsersAccess": true,
        }

        const res = await axios.post(
            GLEAN_URL,
            {document: doc,},
            {headers: {Authorization: BEARER_TOKEN,'Content-Type': 'application/json',}}
        );

        console.log(`${count} Processed doc-ID ${doc.id || '<blank>'} with status [${res.status}]`);
        count += 1;
    } catch (error) {
        console.error(`Error during indexdocuments(). Tried to index doc-ID ${doc.id || '<blank>'}:`, error.response ? error.response.data : error.message);
    }
};

module.exports = indexdocuments;