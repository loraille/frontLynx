import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';

function Home() {
  const [count, setCount] = useState(false);
  const [style, setStyle] = useState({});

  const handleClick = () => {
    setCount(!count);
    setStyle(count ? { color: '#0070f3' } : {});
    console.log(count)
  }

  return (
    <div>
      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <FontAwesomeIcon onClick={handleClick} icon={faCoffee} style={style} className={styles.pointer} /> */}
        <Signup />
      </main>
    </div>
  );
}

export default Home;

