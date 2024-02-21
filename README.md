# AssetHub

AssetHub is a note and resource management site designed for college use.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Git
- Node.js
- Docker (for Docker setup)

### Manual Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/GoAmeer030/Noter.git
    ```

2. **Install dependencies**

    Navigate to the project directory and run:

    ```bash
    npm i && npm run install-all
    ```

3. **Run the application**

    Start the application in the development mode:

    ```bash
    npm run dev
    ```

### Docker Setup

1. **Install Docker**

    Follow the instructions on the official [Docker](https://docs.docker.com/get-docker/) website to install Docker on your machine.

2. **Run the application**

    Use Docker Compose to start the application:

    ```bash
    docker-compose -f dev-docker-compose.yml up
    ```
