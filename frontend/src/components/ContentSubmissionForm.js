import React, { useState } from 'react';
import './styles.css';

const ContentSubmissionForm = ({ onContentSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mockFile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error submitting content');
      }
      onContentSubmit();

      // Reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        mockFile: '',
      });
    } catch (error) {
      console.error('Error submitting content:', error);
  
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="mockFile">Mock File/Link:</label>
        <input
          type="text"
          id="mockFile"
          name="mockFile"
          value={formData.mockFile}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContentSubmissionForm;
