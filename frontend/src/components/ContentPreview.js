// src/ContentPreview.js

import React, { useState } from 'react';
import './styles.css';

const ContentPreview = ({ contentList, onSelect }) => {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleContentClick = (contentId) => {
    // Update the selected content and trigger the onSelect callback
    setSelectedContent(contentList.find(content => content._id === contentId));
    onSelect(contentId);
  };

  return (
    <div className="container content-details">
      <h2>All Content Submissions</h2>
      <ul>
        {contentList.map((content) => (
          <li key={content._id} onClick={() => handleContentClick(content._id)} className="content-item">
            <p><strong>Title:</strong> {content.title}</p>
            <p><strong>Description:</strong> {content.description}</p>
            <p><strong>Mock File/Link:</strong> <a href={content.mockFile}>{content.mockFile}</a></p>
          </li>
        ))}
      </ul>

    
    </div>
  );
};

export default ContentPreview;
