# Embedding Learning Website

An intelligent document retrieval and question-answering system powered by embeddings and LLM technology. This full-stack application allows users to upload PDFs or save text documents with vector embeddings, and retrieve relevant data based on semantic similarity to answer user queries using RAG (Retrieve Augmented Generation).

## Features

- **Document Upload**: Support for PDF files and plain text input
- **Document Embedding**: Convert documents into high-dimensional vector embeddings using Ollama
- **Semantic Search**: Find relevant documents based on semantic similarity using cosine similarity matching
- **RAG Architecture**: Retrieve Augmented Generation - fetch relevant documents and pass them to LLM for context-aware answers
- **MongoDB Integration**: Persist documents and their embeddings for efficient retrieval
- **RESTful API**: Comprehensive API endpoints for backend operations
- **Modern Frontend**: React-based UI with Tailwind CSS styling
- **CORS Enabled**: Frontend and backend communicate seamlessly
- **Duplicate Detection**: Prevents saving duplicate text entries

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Embedding Model**: Ollama (nomic-embed-text:latest)
- **LLM Integration**: Ollama
- **File Upload**: Multer
- **PDF Processing**: pdf-parse
- **CORS**: Cross-Origin Resource Sharing

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4 with Vite plugin
- **Runtime**: Node.js (development)

### Core Dependencies

**Backend:**
- `express` - Web server framework
- `mongoose` - MongoDB ODM
- `ollama` - LLM and embedding client
- `multer` - File upload middleware
- `pdf-parse` - PDF text extraction
- `cors` - Cross-origin requests
- `dotenv` - Environment variable management
- `nodemon` - Auto-reload development server

**Frontend:**
- `react` - UI library
- `react-dom` - React DOM rendering
- `tailwindcss` - Utility-first CSS framework
- `@tailwindcss/vite` - Tailwind Vite plugin

## Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v16 or higher)
2. **MongoDB** (local or remote connection string)
3. **Ollama** - Download and install from [ollama.ai](https://ollama.ai)
4. **Ollama Models** - Pull required models:
   ```bash
   ollama pull nomic-embed-text:latest
   ```
5. **Git** - For cloning the repository

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/vyomsagar/Embedding.git
cd Embedding
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/embedded?retryWrites=true&w=majority
```

### 3. Frontend Setup

Navigate to the frontend directory (from project root):
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

## Usage

### Start the Backend Server

From the `backend` directory:
```bash
npm run test
```

The server will run on `http://localhost:3000`

### Start the Frontend Development Server

From the `frontend` directory (in a new terminal):
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is in use)

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:** No build step required, it's a Node.js/Express application

### API Endpoints

#### 1. Upload PDF
**POST** `/pdf/upload-pdf`

Request: Form data with PDF file
- Field name: `file`
- Content-Type: `multipart/form-data`

Response:
```json
{
  "message": "PDF uploaded and processed successfully"
}
```

#### 2. Save Text Data with Embedding
**POST** `/savedata`

Request body:
```json
{
  "text": "Your document text here"
}
```

Response (Success):
```json
{
  "message": "Text saved successfully"
}
```

Response (Duplicate):
```json
{
  "message": "This text already exists"
}
```

#### 3. Query and Get Answer
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
  "answer": "Answer based on relevant documents from your saved data"
}
```

## Frontend Pages

### 1. Save Data Page
- **PDF Upload**: Upload PDF files for processing
- **Text Input**: Add custom text documents
- Location: `/src/pages/SaveData.jsx`

### 2. Ask Question Page
- **Query Input**: Ask questions about your saved documents
- **Answer Display**: View AI-generated answers based on relevant documents
- **Loading State**: Visual feedback while processing
- Location: `/src/pages/AskQuestion.jsx`

## How It Works

### 1. Document Ingestion
- Users upload PDFs or enter text via the React frontend
- PDFs are parsed to extract text content using `pdf-parse`
- Text is validated (checked for duplicates)

### 2. Document Storage & Embedding
- Extracted text is sent to the backend `/savedata` endpoint
- System checks if the text already exists (duplicate prevention)
- Ollama generates embeddings using `nomic-embed-text:latest` model
- Both text and embedding vector are stored in MongoDB

### 3. Query Processing
- User enters a question in the Ask Question page
- Frontend sends query to `/ask` endpoint
- System converts query to embedding using the same model
- Cosine similarity is calculated between query embedding and all stored document embeddings

### 4. Semantic Search & Retrieval
- Documents are ranked by similarity score
- Top-matching documents are retrieved from MongoDB
- These relevant documents provide context for the LLM

### 5. Answer Generation
- Retrieved documents are passed to Ollama as context
- LLM generates an answer based on the provided context
- Answer is returned to frontend and displayed to user

## Project Structure

```
├── backend/
│   ├── server.js              # Express server, routes, and endpoints
│   ├── embedding.js           # Embedding generation and cosine similarity
│   ├── db.js                  # MongoDB connection
│   ├── embedSchema.js         # MongoDB schema for storing embeddings
│   ├── src/
│   │   ├── routes/
│   │   │   └── uploadpdf.js   # PDF upload and processing route
│   │   └── middleware/        # Custom middleware
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables (not tracked)
│   └── node_modules/          # Dependencies (not tracked)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── main.jsx           # Entry point
│   │   ├── index.css          # Tailwind CSS directives
│   │   ├── pages/
│   │   │   ├── SaveData.jsx   # Upload PDF and text data
│   │   │   └── AskQuestion.jsx # Query and answer display
│   │   └── assets/            # Images and static assets
│   ├── vite.config.js         # Vite + React + Tailwind config
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   └── node_modules/          # Dependencies (not tracked)
│
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
└── .git/                      # Git repository
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/embedded?retryWrites=true&w=majority
```

Replace with your actual MongoDB connection string.

## Development

### Backend Development
To start the development server with auto-reload:

```bash
cd backend
npm run test
```

This uses `nodemon` to automatically restart the server when you make code changes.

### Frontend Development
To start the frontend development server:

```bash
cd frontend
npm run dev
```

The development server includes hot module reload (HMR) for instant updates.

### Debugging Tips
- Check backend console logs for embedding generation issues
- Use browser DevTools to inspect frontend API requests
- Verify MongoDB connection with `mongosh` client
- Ensure Ollama is running: `ollama serve` (should run automatically on startup)
- Check CORS errors in browser console if frontend can't reach backend

## Troubleshooting

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Model not found (404)** | Embedding model not installed | Run `ollama pull nomic-embed-text:latest` |
| **MongoDB Connection Error** | Invalid connection string or MongoDB not running | Check `MONGO_URI` in `.env` file and ensure MongoDB is accessible |
| **Ollama not recognized** | Ollama not installed or not in PATH | Install Ollama from [ollama.ai](https://ollama.ai) |
| **CORS Error** | Frontend and backend not properly configured | Ensure backend has `cors` middleware enabled |
| **Port already in use** | Port 3000 or 5173 is occupied | Change PORT in server.js or run frontend on different port |
| **PDF upload fails** | `multer` or file system issue | Check file permissions and temporary directory space |
| **Duplicate text error** | Text already exists in database | Change the text content or clear database |

## Frontend Features

### SaveData Component
- **PDF Upload**: Drag-and-drop or file picker for PDF files
- **Text Input**: Textarea for manual text entry
- **Validation**: Prevents empty submissions
- **Feedback**: Alert notifications for success/error

### AskQuestion Component
- **Query Input**: Textarea for questions
- **Loading State**: "Thinking..." button state during processing
- **Answer Display**: Formatted answer box with retrieved information
- **Clear Input**: Auto-clears question after submission
- **Error Handling**: User-friendly error messages

## Future Enhancements

- Add support for multiple embedding models (OpenAI, Hugging Face)
- Implement user authentication and authorization
- Add document management (edit, delete, organize by collections)
- Support for more file formats (DOCX, TXT, EPUB, etc.)
- Advanced search filters and metadata tagging
- Chat history and conversation management
- Rate limiting and usage analytics
- Caching for frequently asked questions
- Batch processing for large datasets
- API documentation with Swagger/OpenAPI
- Unit and integration tests
- Docker containerization
- Deployment guide for production environments

## API Documentation

For detailed API documentation, refer to the endpoint descriptions in the [API Endpoints](#api-endpoints) section above.

## Performance Notes

- **Embedding Generation**: First embedding for a model takes time as Ollama loads the model into memory
- **Similarity Search**: Cosine similarity calculation is performed in-memory after retrieval from database
- **Scalability**: For production use with large datasets, consider:
  - Vector database solutions (Pinecone, Weaviate, Milvus)
  - Database indexing on embedding vectors
  - Caching mechanisms

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Implement authentication before production deployment
- Validate and sanitize all user inputs
- Use HTTPS in production
- Implement rate limiting to prevent abuse

## License

ISC

## Author

Vyom Sagar

## Repository

[GitHub - Embedding](https://github.com/vyomsagar/Embedding.git)

## Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
