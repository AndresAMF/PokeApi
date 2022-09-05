import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { TextField } from "@mui/material";
import "./styles.css";
import Modal from "../Modal";

export default function PokemonCard({ data, evolutions }) {
  const [search, setSearch] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (search === "") {
      setCards(data);
    } else {
      let searchResults = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setCards(searchResults);
    }
  }, [search, data]);

  // Función que maneja el boton search y setea el valor de search
  const searchHandler = (value) => {
    setSearch(value);
  };

  return (
    <>
      <Container className="searchBox">
        <TextField
          sx={{ pt: 15, pb: 3 }}
          id="outlined-basic"
          variant="outlined"
          placeholder="Search by name"
          onChange={(e) => searchHandler(e.target.value)}
        />
      </Container>

      <Container maxWidth="md">
        <Grid container spacing={4}>
          {/* Se mapea el state de cards y se extrae la información
          para generar las cards */}
          {cards.map((pokemon) => (
            <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={pokemon.img}
                  alt={pokemon.name}
                />
                <CardContent>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {pokemon.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Id: {pokemon.id.toString().padStart(3, 0)}
                  </Typography>
                  <Typography>
                    Types: {pokemon.types.map((item) => item.type.name + " ")}
                  </Typography>
                  <Typography>
                    Prev Evolution:{" "}
                    {pokemon.evolvedFrom.name
                      ? pokemon.evolvedFrom.name.toUpperCase()
                      : "No data"}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/*Se importa el modal y se envía por props lo que se necesita desplegar  */}
                  <Modal
                    name={pokemon.name}
                    abilities={pokemon.abilities}
                    weight={pokemon.weight}
                    height={pokemon.height}
                    evolutions={evolutions}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
