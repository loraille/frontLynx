import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from '../styles/ArtistCard.module.css';

const ArtistCard = ({ artist }) => {
  return (
    <Card className={styles.artistCard}>
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
          <Typography gutterBottom variant="h5" component="div">
            {artist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {artist.description}
          </Typography>
          <Typography variant="h6" component="div">
            Ses œuvres
          </Typography>
          <Grid container spacing={2}>
            {artist.works.map((work, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <CardMedia
                  component="img"
                  height="100"
                  image={work.image}
                  alt={work.title}
                />
                <Typography variant="body2" color="text.secondary">
                  {work.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArtistCard;
