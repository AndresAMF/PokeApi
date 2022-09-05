import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "auto",
  bgcolor: "#1976d2",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Se reciben todas las props
function BasicModal({ name, abilities, height, weight, evolutions }) {
  const [evolution, setEvolution] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const evoFilter = () => {
    for (let item of evolutions) {
      item.find((elem) => elem.name === name)
        ? setEvolution(item)
        : console.log("notFound");
    }
  };

  useEffect(() => {
    evoFilter();
  }, []);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Know more!
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mainContainer">
            <div className="titleContainer">
              <h2>{name.toUpperCase()}</h2>
            </div>
            <div className="subTitleContainer">
              <h3>Height: {height}</h3>
              <h3>Weight: {weight}</h3>
            </div>

            <div className="secondContainer">
              <div className="evoContainer">
                <h3>Evolutions</h3>
                {evolution.map((item) => (
                  // mapeo de evolution para sacar los nombres
                  <div className="item" key={evolution.indexOf(item)}>
                    {item.name.toUpperCase()}
                  </div>
                ))}
              </div>
              <div className="infoContainer">
                <h3>Abilities</h3>
                {abilities.map((item) => (
                  // mapeo de abilities para sacar las abilidades
                  <div className="item" key={abilities.indexOf(item)}>
                    {item.ability.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
            <div className="imgEvoContainer">
              <h3>Evolution Images</h3>
              <div className="evoImg">
                {evolution.map((item) => (
                  // mapeo de evolution para sacar las imagenes
                  <div className="imgBox">
                    <img className="evoItem" src={item.image_url} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default BasicModal;
