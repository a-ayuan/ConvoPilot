import React from 'react';
import '../styles/Info.css';
import pdfFile from '../assets/ConvoPilot-Data-Science-Project.pdf';

const Info: React.FC = () => {
  return (
    <div className="info-container">
      <h1>Welcome to ConvoPilot</h1>
      <p>
        ConvoPilot is an advanced message optimization tool designed to help users craft effective outreach messages. 
        By leveraging the Gemini Flash 2.0 API, ConvoPilot uses prompt engineering to analyze your draft messages 
        and provides suggestions to enhance their effectiveness, ensuring that your communication is clear, engaging, 
        and impactful.
      </p>
      <h2>How to Use ConvoPilot</h2>
      <ol>
        <li>
          <strong>Draft Your Message:</strong> Start by entering your draft message parameters in the designated input area. 
          Be sure to include any relevant context and goals for your communication.
        </li>
        <li>
          <strong>Set Your Goals:</strong> Clearly define what you aim to achieve with your message. This could 
          include objectives like increasing engagement, securing a meeting, or generating leads.
        </li>
        <li>
          <strong>Run the Optimization:</strong> Click the "Generate" button to run the optimization process. 
          ConvoPilot will analyze your draft and provide suggestions based on your input.
        </li>
        <li>
          <strong>Review Suggestions:</strong> Examine the suggested messages and scores provided by ConvoPilot. 
          Use these insights to refine your draft and improve its effectiveness.
        </li>
      </ol>
      <h2>Additional Resources</h2>
      <p>
        For a deeper understanding of the methodologies and technologies behind ConvoPilot, please refer to the 
        detailed project documentation.
      </p>
      <a href={pdfFile} target="_blank" rel="noopener noreferrer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7,10 12,15 17,10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download the ConvoPilot Data Science Project PDF
      </a>
    </div>
  );
};

export default Info;