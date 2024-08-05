import styles from '../styles/Home.module.css';
import { useState } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import Header from './Header'

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

        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.container}>

        </div>
      </main>
    </div>
  );
}

export default Home;

