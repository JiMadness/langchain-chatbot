# Langchain Chatbot Project (POC)

This project is a LLM powered chatbot application that acts as a customer service agent for a specified product.
A recursive scan of the product website is performed at the startup of the application to act as knowledge base for the chatbot using RAG.

It is built using NestJS, Langchain, LangGraph, and OpenRouter. It offers dual interfaces—a command-line interface (REPL) and a web-based interface via WebSockets—allowing for versatile interaction with the chatbot. The project now also incorporates Retrieval Augmented Generation (RAG) capabilities, FastEmbed for document embeddings, and enhanced state management for a more intelligent and context-aware chatbot.

## Key Features

-   **Dual Interface Support:**
    -   **REPL (Read-Eval-Print Loop):** Engage with the chatbot directly from your terminal for rapid testing and interactions.
    -   **WebSocket:** Integrate the chatbot into web applications to provide real-time, interactive, and engaging chat experiences.
-   **Langchain Integration:** Leverages Langchain's robust framework for creating complex conversational flows, managing AI agents, and structuring interactions.
-   **LangGraph Integration:** Employs LangGraph to manage complex stateful interactions and multi-actor applications, providing a sophisticated backend for managing conversation states.
-   **OpenRouter API:** Connects to the OpenRouter API, granting access to a variety of cutting-edge language models and providing flexibility in model selection.
-   **Retrieval Augmented Generation (RAG):** Implements RAG to enhance the chatbot's knowledge by retrieving and incorporating information from a knowledge base, enabling more accurate and contextually relevant responses.
-   **FastEmbed Integration:** Utilizes FastEmbed for creating document embeddings, enabling efficient vector storage and retrieval for RAG.
-   **State Management:** Utilizes LangGraph's `StateGraph` and `MemorySaver` for advanced state management, ensuring that conversations retain context across multiple turns.
-   **Asynchronous Streaming:** Supports asynchronous streaming of chatbot responses, allowing for dynamic, real-time updates in the WebSocket interface.
-   **Modular Design:** Built using NestJS's modular architecture, promoting code that is clean, maintainable, and scalable.
-   **Environment Variables:** Uses `.env` files for secure management of API keys and settings, ensuring both security and flexibility in configuration.

## Technologies Used

-   **LangGraph:** A framework for building stateful, multi-actor applications with LLMs.
-   **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
-   **Langchain:** A powerful framework for developing applications powered by language models.
-   **OpenRouter:** An API aggregator that provides a unified interface to access various language models.
-   **WebSockets:** Enables real-time, bidirectional communication between web clients and the server.
-   **Node.js:** The JavaScript runtime environment.
-   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
-   **FastEmbed:** Used for creating document embeddings and handling vector storage.
-   **RAG (Retrieval Augmented Generation):** Enhances chatbot responses by integrating external knowledge sources.

## Setup and Installation

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/JiMadness/langchain-chatbot
    cd langchain-chatbot
    ```

2.  **Install Dependencies:**

    ```bash
    yarn install
    ```

3.  **Environment Variables:**

    -   Create a `.env` file in the root directory of the project.
    -   Add your OpenRouter API key and set your desired protocol and configurations:

        ```
        OPENROUTER_API_KEY=sk-or-v1-...
        PROTOCOL=REPL # or WEB for WebSocket interface
        LLM_MODEL=deepseek/deepseek-r1:free # or any other supported model
        OPENROUTER_BASE_URL=https://llm.chutes.ai/v1 # or any other Open AI compatible URL
        PORT=3000
        PRODUCT_URL=https://www.mywebsite.com
        ```

4.  **Running the Application:**
    -   **REPL Mode (set `PROTOCOL=REPL` in `.env`):**
        ```bash
        npm run start:dev
        ```
        The console will indicate that the "Chatbot CLI is ready." You can then start chatting by typing your message.

    -   **WebSocket Mode (set `PROTOCOL=WEB` in `.env`):**
        ```bash
        npm run start:dev
        ```
        The console will indicate that "Chatbot is running on http://localhost:3000".

## Usage

### REPL (Command Line)

1.  Start the application in REPL mode as described above.
2.  The terminal will prompt you with "You:".
3.  Type your message and press Enter.
4.  The chatbot will respond with "Bot:" followed by its reply.
5.  Continue the conversation by typing subsequent messages.

### WebSocket (Web Interface)

1.  Start the application in WEB mode as described above.
2.  Connect to the server via a WebSocket client (e.g., using Socket.IO client library in your web application).
3.  Send a message to the 'message' event.
4.  Listen for the 'response' event to receive the chatbot's replies in real-time.

## Code Structure

-   `src/main.ts`: The application's entry point, managing environment configuration and starting the application in either REPL or web server mode.
-   `src/app.module.ts`: The root module of the NestJS application.
-   `src/chat/`: Contains all chatbot-specific code.
    -   `chat.service.ts`: Implements the core logic for interacting with Langchain and LangGraph, managing conversation flow, handling state, and constructing responses.
    -   `chat.gateway.ts`: Manages WebSocket connections and handles message routing for the web interface.
    -   `chat.module.ts`: Defines the chat module, importing and exporting its dependencies.
    -   `llm.service.ts`: Manages the connection to and interaction with the language model via the OpenRouter API.
- `src/rag/`: Contains all the RAG-specific code.
    - `lib/`: Contains library classes specific to RAG.
      - `recursive-url-loader.ts`: A custom adaptation to Langchain's recursive url loader, with better crawling functionality.
    - `rag.service.ts`: Implements the core logic for interacting with RAG, storing data in a vector-store and returning data for llm.
    - `vector-store.service.ts`: Implements the logic for interacting with the vector store and embeddings.
    - `crawler.service.ts`: Implements the core logic for crawling websites for RAG.
-   `.env`: Stores environment variables securely.

## Example Interactions

### REPL

1.  **Chatbot CLI is ready.**
2.  **Start chatting below:** `You: Hello, how are you?`
3.  **Wait for bot to respond.**

### WebSocket

1.  **Client sends:**
    `{ event: 'message', data: { message: 'Hello, can you help me?' } }`
2.  **Server sends back (multiple times):**

    ```
    { event: 'response', data: { reply: 'Hello there!' } }
    { event: 'response', data: { reply: 'Yes, how can I help you?' } }
    ```

## Further Development

-   **Enhanced Error Handling:** Implement more robust error handling and recovery mechanisms.
-   **Improved System Prompt:** Refine the system prompt to better guide the conversation and improve the quality of responses.
-   **Use Persistent Vector Store:** Explore and implement a persistent vector store for RAG instead of the current memory store.
-   **Expanded Agent Capabilities:** Integrate more Langchain and LangGraph agent features to handle more complex tasks and scenarios.

## Contributing

Contributions to this project are welcome! Please fork the repository and submit a pull request with your changes.
