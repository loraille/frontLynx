import styles from '../styles/ResultSearch.module.css';
import { useEffect, useState } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from './ArtworkUpload';
import Header from './Header';
import ArtworkList from './ArtworkList';
import { urlBackend } from '../assets/varGlobal';
import { useRouter } from 'next/router';
import ArtworkCard from './ArtworkCard';
import ArtistCard from './ArtistCard';

function ResultSearch() {
  /////////Modale///////////////////////////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };
  //////////Fetch conditionnel suivant router///
  const router = useRouter();
  const { category, query } = router.query;

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (category && query) {
      fetchResults(category, query);
    }
  }, [category, query]);

  const fetchResults = async (category, query) => {
    try {
      let response;
      switch (category) {
        case 'artworks':
          response = await fetch(`${urlBackend}/searchs/artworks?title=${query}`);
          break;
        case 'tags':
          response = await fetch(`${urlBackend}/searchs/tags?tag=${query}`);
          break;
        case 'artists':
          response = await fetch(`${urlBackend}/searchs/artists?username=${query}`);
          break;
        default:
          return;
      }
      const data = await response.json();
      // console.log(data)
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
  ////construction des cards à afficher///////////////////////
  const total = results.length
  let cardsResult
  if (total !== 0) {
    console.log('c pas bon')
    if (category === 'artworks' || category === 'tags') {
      cardsResult = results.map(artwork => (
        <ArtworkCard key={artwork._id} artwork={artwork} />
      ));
    } else {
      cardsResult = results.map((artist, index) => (
        <ArtistCard key={index} artist={artist} />
      ))
    }
  }
  ///////////category vs categories///////////////
  let result = category
  if (total == 1) {
    result = result.slice(0, - 1)
  }



  return (
    <div>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header onOpenModal={handleOpenModal} />
        </div>
        <div className={styles.container}>
          {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
          {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
          {modalType === 'upload' && <ArtworkUpload isOpen={isModalOpen} onClose={handleCloseModal} />}
        </div>
        <div>
          {category === 'artworks' && <h1 className="titlePage">Results for Artworks</h1>}
          {category === 'tags' && <h1 className="titlePage">Results for Tags</h1>}
          {category === 'artists' && <h1 className="titlePage">Results for Artists</h1>}
        </div>
        <div>
          {total === 0 ? (<span className={styles.reponseText}>"No result found in <span className={styles.lynx}>Lynx</span>"</span>) : (<span className={styles.reponseText}>"{total} {result} found"</span>)}
        </div>
        <div className={styles.cardsDisplay}>
          {cardsResult}
        </div>
      </main>
    </div>
  );
}

export default ResultSearch;
