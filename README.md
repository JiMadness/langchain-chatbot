# Langchain Chatbot Project (POC)

This project is a simple chatbot application built using NestJS, Langchain, and OpenRouter. It supports both a command-line interface (REPL) and a web-based interface via WebSockets, allowing for seamless interaction with the chatbot.

## Features

-   **Dual Interface Support:**
    -   **REPL (Read-Eval-Print Loop):** Engage with the chatbot directly from your terminal for quick testing and interactions.
    -   **WebSocket:** Integrate the chatbot into web applications to provide real-time, interactive chat experiences.
-   **Langchain Integration:** Leverages the power of Langchain for creating and managing complex conversational flows and managing AI agents.
-   **OpenRouter API:** Utilizes the OpenRouter API to access various language models, in this case, providing flexibility and access to cutting-edge AI.
-   **State Management:** Employs Langgraph's `StateGraph` and `MemorySaver` for managing the conversation state and maintaining context across interactions.
-   **Asynchronous Streaming:** Supports asynchronous streaming of chatbot responses, allowing for dynamic, real-time updates in the WebSocket interface.
-   **Modular Design:** Built with NestJS's modular architecture, promoting clean, maintainable, and scalable code.
-   **Environment Variables:** Uses `.env` files to manage API keys and configuration settings, enhancing security and flexibility.

## Technologies Used

-   **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
-   **Langchain:** A framework for developing applications powered by language models.
-   **OpenRouter:** An API aggregator for accessing various language models from a single interface.
-   **WebSockets:** Enables real-time, bidirectional communication between web clients and the server.
-   **Node.js:** The JavaScript runtime environment.
-   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

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
    -   Add your OpenRouter API key and set your desired protocol:

        ```
        OPENROUTER_API_KEY=sk-or-v1-...
        PROTOCOL=REPL # or WEB for WebSocket interface
        LLM_MODEL=deepseek/deepseek-r1:free # or any other supported model
        OPENROUTER_BASE_URL=https://llm.chutes.ai/v1 # or any other Open AI compatible URL
        PORT=3000
        ```

4.  **Running the Application:**
-   **REPL Mode:**
    ```bash
    npm run start:dev
    ```
    The console will indicate that the "Chatbot CLI is ready." You can then start chatting by typing your message.
  
- **WebSocket Mode:**
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

-   `src/main.ts`: The entry point of the application, handles environment configuration and starts the application in REPL or webserver mode.
-   `src/app.module.ts`: The root module of the NestJS application.
-   `src/chat/`: Contains all the chatbot-specific code.
    -   `chat.service.ts`: Implements the core logic for interacting with Langchain, managing the conversation flow, and constructing the responses.
    -   `chat.gateway.ts`: Handles WebSocket connections and message handling for the web interface.
    -   `chat.module.ts`: Defines the chat module, importing and exporting its dependencies.
    -   `llm.service.ts`: Handles the connection and interaction with the language model via the OpenRouter API.
- `.env`: Contains the environment variables.

## Example Interaction (REPL)
1. **Chatbot CLI is ready.**
2. **Start chatting below:** `You: Hello, how are you?`
3. **Wait for bot to respond.**

## Example Interaction (WebSocket)

1.  **Client sends:**
    `{ event: 'message', data: { message: 'Hello, can you help me?' } }`
2.  **Server sends back (multiple times):**

    ```
    { event: 'response', data: { reply: 'Hello there!' } }
    { event: 'response', data: { reply: 'Yes, how can I help you?' } }
    ```

## Further Development

-   Implement error handling and robustness.
-   Improve the system prompt to guide the conversation.
-   Support RAG to read from knowledge base.
- Add more Langchain agent features to the application.

## Contributing

Contributions to this project are welcome! Please fork the repository and submit a pull request with your changes.
