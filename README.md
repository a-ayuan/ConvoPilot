# ConvoPilot

ConvoPilot is an AI-powered conversational strategy engine designed to help users optimize their cold outreach messages.  It leverages advanced AI techniques to generate personalized and effective communication strategies.([GitHub][1])

## Features

* **User Tone Customization**: Adjust the tone of messages to align with the user's desired communication style.
* **Contextual Information Integration**: Include background details such as name, email, title, and relevant links to personalize messages.
* **Conversational Thread Creation**: Develop coherent conversational threads by incorporating past interactions between parties.
* **Recipient Context Awareness**: Tailor messages based on the background and context of the recipients.
* **Flexible Message Formatting**: Choose from various message formats, including direct messages, emails, cold outreach, and responses to existing messages.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/a-ayuan/ConvoPilot.git
   cd ConvoPilot
   ```



2. **Create a Virtual Environment**:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```



3. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```



## Usage

The main functionality is encapsulated in `main.py`. You can run the script to start optimizing your outreach messages:([GitHub][2])

```bash
python main.py
```



Ensure you have the necessary API keys and configurations set up as required by the script.

## Project Structure

* `main.py`: Entry point for the application.
* `enron_analysis.py`: Module for analyzing Enron email dataset (if applicable).
* `evaluate.py`: Contains evaluation metrics and methods.
* `mcts.py`: Implements Monte Carlo Tree Search algorithms.
* `prompts.py`: Houses prompt templates and related functions.
* `mcts_scores.csv`: CSV file containing scores from MCTS evaluations.
* `requirements.txt`: List of Python dependencies.([GitHub][3], [GitHub][1])

