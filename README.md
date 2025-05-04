# indexer-demo-in-javascript
2nd indexer demo written in my stronger language

# How to execute this program
You can either index documents using one of two endpoints:
1. /indexdocuments
```bash
node index.js
```
2. /bulkindexdocuments
```bash
node bulkIndex.js
```

The crucial difference between both endpoints is: 
- ```/bulkindexdocuments``` is designed for completely refreshing the datasource. It deletes all existing documents and replaces them with the new ones provided.
- ```/indexdocuments``` is intended for incremental updates. It allows you to add a batch of new documents or update existing ones without affecting the other documents in the index.



# Setup Instructions

## Step 1 - Clone this repository to your machine
```bash
git clone <paste-source-url-here>
```

## Step 2 - install dependencies
Navigate to the cloned directory and install the required dependencies. The Node modules for axios and dotenv (or any other packages i nthe package.json) will be installed.
```bash
npm install
```

## Step 3 - create a .env file
In the root of the project create an env file with this command.
```bash
touch .env
```

## Step 4 - add your environment variables to the .env file
You will need to add the Bearer token and endpoint URL(s) to the env file.
```sh
BEARER_TOKEN='your-token-goes-here'
GLEAN_URL='your-url-goes-here'
BULK_INDEX_URL='bulk-url-goes-here'
```

## Step 5 - run the program
**NOTICE** This demo is not production grade, its just to demonstrate that I can call an endpoint.
Run th program with the command from the section of how to execute this program. Otherwise I would have hosted this on the cloud, abstracted it away and made it a lot more user friendly. 

```bash
node index.js # Index document(s)/refresh document(s)
```
```bash
node bulkIndex.js # Bulk index document(s)
```
