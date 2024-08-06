import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function MyCard({ artist }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={artist.name}
          height="140"
          image={artist.avatar}
          title={artist.name}
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
          {/* Vous pouvez ajouter ici une grille ou une liste pour les œuvres */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MyCard;
