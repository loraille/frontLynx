import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import styles from '../styles/ArtistCard.module.css';

const ArtistCard = ({ artist }) => {
  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={artist.name}
          height="200"
          image={artist.avatar}
          title={artist.name}
          className={styles.artistImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={styles.text}>
            {artist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={styles.artistDescription}>
            {artist.description}
          </Typography>
          <Typography variant="h6" component="div" sx={styles.sectionTitle}>
            {/* Ses œuvres */}
          </Typography>
          <Grid container spacing={2} sx={styles.gridContainer}>
            {/* {artist.works.map((work, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <CardMedia
                  component="img"
                  height="100"
                  image={work.image}
                  alt={work.title}
                />
                <Typography variant="body2" color="text.secondary" sx={styles.workTitle}>
                  {work.title}
                </Typography>
              </Grid>
            ))} */}
          </Grid>
        </CardContent>
      </CardActionArea>
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