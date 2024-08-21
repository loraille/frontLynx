import React, { useState } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../styles/ArtistCard.module.css";

const ArtistCard = ({ artist }) => {
  ///////////////////////setup//////////////////////////////////////
  const [expanded, setExpanded] = useState(false);
  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };
  ////////////////3 artworks list////////////////////////////////////
  let artistArtworks =
    artist.artworks &&
    artist.artworks.map((work, index) => (
      <Grid item key={index} xs={12} sm={4}>
        <Link href={{ pathname: "/artworkView", query: { id: work._id } }}>
          <a>
            <CardMedia
              component="img"
              height="100"
              image={work.url}
              alt={`Artwork ${index + 1}`}
            />
            {/* ------------------artworks title--------------- */}
            {/* <Typography
              variant="body2"
              color="text.secondary"
              className={styles.workTitle}
            >
              {work.title}
            </Typography> */}
          </a>
        </Link>
      </Grid>
    ));

  return (
    <Card className={styles.card}>
      <Link href={{ pathname: "/user", query: { username: artist.username } }}>
        <a>
          <CardMedia
            component="img"
            alt={artist.username}
            height="200"
            image={artist.avatarUrl || "defaultProfile.jpg"}
            title={artist.username}
            className={styles.artistImage}
          />
        </a>
      </Link>
      <CardContent>
        <Link
          href={{ pathname: "/user", query: { username: artist.username } }}
        >
          <a style={{ textDecoration: "none" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={styles.text}
            >
              {artist.username}
            </Typography>
          </a>
        </Link>
        <Accordion
          expanded={expanded}
          onChange={handleAccordionChange}
          sx={{ backgroundColor: "#424141", color: "#ACABAB" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Biography</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.artistDescription}
            >
              {artist.bio || "No biography available."}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Typography
          variant="h6"
          component="div"
          className={styles.sectionTitle}
        >
          {/*3Artworks*/}
        </Typography>
        <Grid container spacing={2} className={styles.gridContainer}>
          {artistArtworks}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
