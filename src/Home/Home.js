import './Home.css'
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';

function Home() {
  const [text, setText] = useState('');
  const fullText = 'Welcome, JetLi';

  return (
    <div className="home-container">
      <div className="samurai-background" />
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(fullText)
            .start();
        }}
      >
        <span className="text">{text}</span>
      </Typewriter>
    </div>
  );
}

export default Home;