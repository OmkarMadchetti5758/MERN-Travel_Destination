import React from 'react';

// import './Avatar.css';

export default function Avatar(props){
  return (
    <div className={`w-full h-full flex justify-center items-center ml-2 ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width}}
        className='block rounded-full w-full h-full object-cover'
      />
    </div>
  );
};
