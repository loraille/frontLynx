import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import styles from '../styles/ArtistCard.module.css';

const ArtistCard = ({ artist }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Card sx={{ ...styles.card, zIndex: -0.9 }}>
      <Link href={{ pathname: '/user', query: { username: artist.username } }}>
        <a>
          <CardMedia
            component="img"
            alt={artist.username}
            height="200"
            image={artist.avatarUrl || 'defaultImage.jpg'} // Utilise une image par défaut si `avatar` est absent
            title={artist.username}
            sx={{ ...styles.artistImage, zIndex: -0.9 }}
          />
        </a>
      </Link>
      <CardContent>
        <Link href={{ pathname: '/user', query: { username: artist.username } }}>
          <a> {/* Ensemble de la carte cliquable */}
            <Typography gutterBottom variant="h5" component="div" sx={styles.text}>
              {artist.username}
            </Typography>
          </a>
        </Link>
        <Accordion expanded={expanded} onChange={handleAccordionChange} sx={{ backgroundColor: '#424141', color: '#ACABAB' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Biography</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={styles.artistDescription}>
              {artist.bio || 'No biography available.'} {/* Utilise `bio` ou texte par défaut */}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Typography variant="h6" component="div" sx={styles.sectionTitle}>
          {/* Ses œuvres */}
        </Typography>
        <Grid container spacing={2} sx={styles.gridContainer}>
          {artist.artworks && artist.artworks.map((work, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Link href={{ pathname: '/artworkView', query: { id: work._id } }}>
                <a>
                  <CardMedia
                    component="img"
                    height="100"
                    image={work.url}
                    alt={`Artwork ${index + 1}`}
                  />
                  <Typography variant="body2" color="text.secondary" sx={styles.workTitle}>
                    {/* {work.title} */}
                  </Typography>
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};


// js.doc pour l'auto-complétion (importe que ds l'environnement dev)
/**@type {import('@mui/system').SxProps} */
const styles = {
  card: {
    width: 300,
    margin: '20px',
    backgroundColor: "#2c2c2c",
    border: "10px solid #2c2c2c",
    borderRadius: "8px 8px 0 0",
    color: "white"
  },
  artistImage: {
    width: '100%',
    objectFit: 'cover'
  },
  text: {
    color: "#FEB830"
  },
  artistDescription: {
    color: "white",
    marginBottom: "2px",
    paddingBottom: "8px"
  },
  sectionTitle: {
    color: "#FEB830"
  },
  workTitle: {
    color: "#FEB830",
    textAlign: "center"
  },
  gridContainer: {
    paddingTop: "16px"
  }
};
export default ArtistCard;
// styles est un objet qui contient des styles pour différents éléments.
// card et text sont des clés de l'objet styles représentant des parties spécifiques du composant.