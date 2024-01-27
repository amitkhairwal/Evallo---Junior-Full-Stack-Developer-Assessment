import React, { useState, useEffect } from 'react';
import ContentSubmissionForm from './components/ContentSubmissionForm';
import ContentPreview from './components/ContentPreview';
import './components/styles.css';

function App() {
  const [selectedContentId, setSelectedContentId] = useState(null);
  const [contentList, setContentList] = useState([]);

  const handleContentSelect = (contentId) => {
    setSelectedContentId(contentId);
  };

  const fetchAllContent = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/content');
      if (!response.ok) {
        throw new Error('Error fetching content list');
      }
      const data = await response.json();
      setContentList(data);
    } catch (error) {
      console.error('Error fetching content list:', error);
      
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  return (
    <div className="container">
      <h1>Evallo Content Submission</h1>
      <ContentSubmissionForm onContentSubmit={fetchAllContent} />
      <hr />
      <h2>Content Preview</h2>
      <ContentPreview contentList={contentList} onSelect={handleContentSelect} />
    </div>
  );
}

export default App;
