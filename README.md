# Embedding Learning Website

An intelligent document retrieval and question-answering system powered by embeddings and LLM technology. This application allows users to save documents with vector embeddings and retrieve relevant data based on semantic similarity to answer user queries.

## Features

- **Document Embedding**: Convert text documents into high-dimensional vector embeddings using Ollama
- **Semantic Search**: Find relevant documents based on semantic similarity using cosine similarity matching
- **RAG Architecture**: Retrieve Augmented Generation - fetch relevant documents and pass them to LLM for context-aware answers
- **MongoDB Integration**: Persist documents and their embeddings for efficient retrieval
- **RESTful API**: Easy-to-use endpoints for saving data and querying

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Embedding Model**: Ollama (nomic-embed-text:latest)
- **LLM Integration**: Ollama
- **Dependencies**:
  - `express` - Web server framework
  - `mongoose` - MongoDB ODM
  - `ollama` - Local LLM and embedding client
  - `dotenv` - Environment variable management
  - `nodemon` - Development server auto-reload

## Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v16 or higher)
2. **MongoDB** (local or remote connection string)
3. **Ollama** - Download and install from [ollama.ai](https://ollama.ai)
4. **Ollama Models** - Pull required models:
   ```bash
   ollama pull nomic-embed-text:latest
   ```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vyomsagar/Embedding.git
cd Embedding/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
```

## Usage

### Start the Server

```bash
npm run test
```

The server will run on `http://localhost:3000`

### API Endpoints

#### 1. Save Document with Embedding
**POST** `/savedata`

Request body:
```json
{
  "text": "Your document text here"
}
```

Response:
```json
{
  "message": "Embedding generated successfully"
}
```

#### 2. Query and Get Answer
**POST** `/ask`

Request body:
```json
{
  "query": "Your question here"
}
```

Response:
```json
{
  "answer": "Answer based on relevant documents",
  "relevantDocuments": [...]
}
```

## How It Works

1. **Document Storage**: 
   - User sends text via `/savedata` endpoint
   - System generates embeddings using Ollama's `nomic-embed-text` model
   - Document and embedding are stored in MongoDB

2. **Query Processing**:
   - User sends query via `/ask` endpoint
   - System converts query to embedding
   - Cosine similarity is calculated between query embedding and all stored document embeddings
   - Top relevant documents are retrieved

3. **Answer Generation**:
   - Relevant documents are passed as context to the LLM
   - LLM generates an answer based on the provided context

## Project Structure

```
backend/
├── server.js          # Express server and API routes
├── embedding.js       # Embedding and similarity search logic
├── db.js              # MongoDB connection setup
├── embedSchema.js     # MongoDB schema for embeddings
├── package.json       # Project dependencies
├── .env               # Environment variables (not tracked)
└── node_modules/      # Dependencies (not tracked)
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/embedded?retryWrites=true&w=majority
```

## Development

To start the development server with auto-reload:

```bash
npm run test
```

This uses `nodemon` to automatically restart the server when you make changes.

## Error Handling

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| Model not found (404) | Embedding model not installed | Run `ollama pull nomic-embed-text:latest` |
| MongoDB Connection Error | Invalid connection string | Check `MONGO_URI` in `.env` file |
| Ollama not recognized | Ollama not installed or not in PATH | Install Ollama from ollama.ai |

## Future Enhancements

- Add support for multiple embedding models
- Implement user authentication
- Add frontend UI
- Support for PDF/document file uploads
- Rate limiting and caching
- Batch processing for large datasets

## License

ISC

## Author

Vyom Sagar

## Contributing

Feel free to open issues and submit pull requests for improvements.
