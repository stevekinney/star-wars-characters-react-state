import React from 'react';
import endpoint from './endpoint';

const Character = ({ character }) => {
  const { id, name } = character;
  return (
    <article className="Character">
      <a href={`${endpoint}/characters/${id}`}>{name}</a>
    </article>
  );
};

export default Character;
