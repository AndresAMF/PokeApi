import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/system";
import pokemonLogo from "../../Assets/img/pokemonLogo.png";
import "./styles.css";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container className="imgContainer">
            <img className="logoPokemon" src={pokemonLogo} alt="" />
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
