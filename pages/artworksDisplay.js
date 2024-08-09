import { useRouter } from 'next/router';
import ArtworksDisplay from '../components/ArtworksDisplay';

function ArtworksDisplayPage() {
    // const category = '3D'; 
    
const router = useRouter();  
const { name } = router.query;  

return <ArtworksDisplay category={name}  />;
}

export default ArtworksDisplayPage;
