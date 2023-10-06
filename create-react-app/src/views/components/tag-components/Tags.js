import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import './tag.css';
export default function Tags({ tags, setTags }) {
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = '';
  };
  return (
    <div>
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <Typography className="close" onClick={() => setTags(tags.filter((_, i) => i !== index))}>
            &times;
          </Typography>
        </div>
      ))}
      <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type something" />
    </div>
  );
}
Tags.propTypes = {
  setTags: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired
};
