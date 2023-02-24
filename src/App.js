import React, { useState, useRef, useEffect } from 'react';
import Header from './components/header/Header.js';
import Subreddits from './components/subreddits/Subreddits.js';
import Posts from './components/posts/Posts.js';
import './App.css';


function App() {
  const [subredditsDisplay, setSubredditsDisplay] = useState(false);
  const subredditsAside = useRef(null);

  useEffect(() => {
    const showHideSubredditsAside = () => {
    const width = window.innerWidth;
      
      if (width > 1290) {
        subredditsAside.current.classList.remove('hide');

      } else {
        if (subredditsDisplay) {
          subredditsAside.current.classList.remove('hide');
        }
        else {
          subredditsAside.current.classList.add('hide');
        };
      }
    }

    showHideSubredditsAside();

    // set resize listener
    window.addEventListener('resize', showHideSubredditsAside);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', showHideSubredditsAside);
    }

  }, [subredditsDisplay])

  return (
    <>
      <header><Header subredditsDisplay={subredditsDisplay} setSubredditsDisplay={setSubredditsDisplay} /></header>
      <main>
        <aside className='subreddits-aside' ref={subredditsAside} >
          <Subreddits />
        </aside>
        <section className='posts-section'>
          <Posts />
        </section>
      </main>
    </>
  );
}

export default App;


