import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('/upload', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(event) => setFile(event.target.files[0])}
      />
      <button type="submit">Cargar</button>
    </form>
  );
};

export default UploadForm;
