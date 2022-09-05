import React, { useState, useEffect } from "react";
import "./App.css";

//Components
import PokemonCard from "./Components/PokemonCard";
import SearchBar from "./Components/NavBar";

function App() {
  // Mis arrays de datos
  const myArray = [];
  const pokemones = [];
  const moreInfo = [];
  const evos = [];

  const [pokemon, setPokemon] = useState([]);
  const [evolutions, setEvolutions] = useState([]);

  // Endpoint hacia el cual se hará la conexión
  const endpointPokemon = "pokemon";
  const endpointSpecies = "pokemon-species";
  const endpointEvolutions = "evolution-chain";

  // Conexión que obtiene los 25 pokemones
  const getPokemon = async (id) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/` + endpointPokemon + "/" + id
    );
    const data = await response.json();
    return data;
  };
  // conexión que trae info adicional de los 25 pokemones
  const getMoreInfo = async (id) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/` + endpointSpecies + "/" + id
    );
    const data = await response.json();
    return data;
  };
  // conexión que trae info de las evoluciones dentro de un array(evoChain)
  const getEvolutionChain = async (id) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/` + endpointEvolutions + "/" + id
    );
    const data = await response.json();
    const res = data.chain;
    const evoChain = [];
    let evoData = res;
    // Revisa si existen más evoluciones
    do {
      evoChain.push({
        name: evoData.species.name,
      });

      evoData = evoData["evolves_to"][0];
      // Se ejecuta mientras el campo "evolves_to" exista
    } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
    return fetchEvoImages(evoChain);
  };

  //Función que toma el arrai de evoluciones y le agrega las imagenes
  const fetchEvoImages = async (evoChainArr) => {
    for (let i = 0; i < evoChainArr.length; i++) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/` + endpointPokemon + "/" + evoChainArr[i].name
      );
      const data = await response.json();
      data.sprites.other["official-artwork"].front_default
        ? (evoChainArr[i]["image_url"] =
            data.sprites.other["official-artwork"].front_default)
        : console.log("notFound");
    }

    return evoChainArr;
  };

  // Función que itera las conexiones 25 veces
  const fetchPokemones = async () => {
    for (let i = 1; i <= 25; i++) {
      pokemones.push(await getPokemon(i));
      moreInfo.push(await getMoreInfo(i));
      evos.push(await getEvolutionChain(i));
    }
    // Se itera el array de pokemones y se saca la data que necesitamos, se ingresa a un nuevo array (myArray)
    for (let item of pokemones) {
      myArray.push({
        id: item.id,
        name: item.name,
        abilities: item.abilities,
        types: item.types,
        height: item.height,
        weight: item.weight,
        img: item.sprites.other["official-artwork"].front_default,
        evolvedFrom: "",
      });
    }
    // Se itera el array moreInfo y se extrae la info de evolución, se ingresa al array nuevo (myArray)
    for (let i = 0; i <= 24; i++) {
      if (moreInfo[i].evolves_from_species === null) {
        myArray[i].evolvedFrom = "No Data";
      } else {
        myArray[i].evolvedFrom = moreInfo[i].evolves_from_species;
      }
    }

    // Se setea pokemon con myArray y la info que necesitamos para las cards
    setPokemon(myArray);
    setEvolutions(evos);
  };

  useEffect(() => {
    // Ejecuta la conexión
    fetchPokemones();
  }, []);

  // console.log(evolutions)
  return (
    <div className="App">
      <SearchBar />
      {/* Se envía la info por props a las cards */}
      <PokemonCard data={pokemon} evolutions={evolutions} />
    </div>
  );
}

export default App;
