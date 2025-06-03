# ConvoPilot

**ConvoPilot** is an AI-powered conversational strategy engine designed to help users optimize their cold outreach messages. It leverages advanced AI techniques to generate personalized and effective communication strategies. The project is now evolving into a full-stack web application.

## Features

* **User Tone Customization**: Adjust the tone of messages to align with the user's desired communication style.
* **Contextual Information Integration**: Include background details such as name, email, title, and relevant links to personalize messages.
* **Conversational Thread Creation**: Develop coherent conversational threads by incorporating past interactions between parties.
* **Recipient Context Awareness**: Tailor messages based on the background and context of the recipients.
* **Flexible Message Formatting**: Choose from various message formats, including direct messages, emails, cold outreach, and responses to existing messages.

## Tech Stack

* **Frontend**: React
* **Backend**: Spring Boot (Java)
* **AI Engine**: Python

## Project Structure

```
ConvoPilot/
├── ai_engine_python/        # Python-based AI engine
├── backend-spring/          # Spring Boot backend
├── frontend-react/          # React frontend
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

* Node.js and npm (for the frontend)
* Java and Gradle (for the backend)
* Python 3.x and pip (for the AI engine)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/a-ayuan/ConvoPilot.git
   cd ConvoPilot
   ```

2. **Set Up the AI Engine**:

   ```bash
   cd ai_engine_python
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set Up the Backend**:

   ```bash
   cd ../backend-spring
   ./gradlew clean build
   ```

4. **Set Up the Frontend**:

   ```bash
   cd ../frontend-react
   npm install
   ```
5. **Set Up Environment Variables**:

   Make a copy of `.env.example` and rename it `.env` while replacing `YOUR_API_KEY` your Gemini Flash 2.0 API key

## Usage

### Running the Application

1. **Start the AI Engine**:

   ```bash
   cd ai_engine_python
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Start the Backend Server**:

   ```bash
   cd ../backend-spring
   ./gradlew bootrun
   ```

3. **Start the Frontend Development Server**:

   ```bash
   cd ../frontend-react
   npm run dev
   ```

The frontend will be available at `http://localhost:5173/`.

## License

This project is licensed under the MIT License.
