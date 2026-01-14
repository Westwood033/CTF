import { useEffect, useState } from "react";

type MorpionProps = {
  goToApp: () => void;
};

function Morpion({goToApp}: MorpionProps): React.JSX.Element {

 useEffect(() => {
  if (player !== 2) return;

  const timer = setTimeout(() => {
    const emptyCells: [number, number][] = [];

    for (let i = 0; i < grille.length; i++) {
      for (let j = 0; j < grille[i].length; j++) {
        if (grille[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [i, j] = emptyCells[randomIndex];

    play(i, j);
  }, 1000);

  return () => clearTimeout(timer);
});  

 const [grille, setGrille] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [player, setPlayer] = useState(1); // 1 = X, 2 = O

  // Vérifie si une grille simplifiée contient une victoire
  const verify = (g, num) => {
    let cpt = 0;
    for (let l = 0; l < g.length; l++) {
      for (let k = 0; k < g[l].length; k++) {
        if (g[l][k] === num) cpt += num;
      }
    }
    return cpt === 3 || cpt === 6;
  };

  const multiply = (g, num) => {
    const grilles = [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1],
      ],
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
      ],
    ];

    for (let model of grilles) {
      const newGrid = model.map((row, i) =>
        row.map((cell, j) => cell * g[i][j])
      );
      if (verify(newGrid, num)) return true;
    }
    return false;
  };

  const clean = (g, num) => g.map((row) => row.map((cell) => (cell === num ? cell : 0)));
    
  const play = (i, j) => {
    setGrille((prev) => {
      if (prev[i][j] !== 0) return prev;

      const newGrid = prev.map((row) => [...row]);
      newGrid[i][j] = player;

      if (multiply(clean(newGrid, player), player)) {
        alert(`${player === 1 ? "qvbiBhWOpiDC2Bhm" : "L'IA à gagné"}`);
      }else{
        setPlayer(player === 1 ? 2 : 1);
      }
      
      return newGrid;
    });
  };

  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f0f0",
        flexDirection: "column",
      }}
    >
        <button
        className="btn btn-primary position-absolute"
        style={{ top: "1rem", left: "1rem", zIndex: 10 }}
        onClick={() => {
          goToApp();
        }}
      >
        Retour
      </button>

      <h1 style={{ marginBottom: "20px" }}>Morpion React</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grille.length}, 100px)`,
          gridTemplateRows: `repeat(${grille.length}, 100px)`,
          gap: "10px",
          background: "#333",
          padding: "10px",
          borderRadius: "15px",
        }}
      >
        {grille.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => play(i, j)}
              style={{
                width: "100px",
                height: "100px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "50px",
                fontWeight: "bold",
                borderRadius: "8px",
                userSelect: "none",
              }}
            >
              {cell === 1 ? "X" : cell === 2 ? "O" : ""}
            </div>
          ))
        )}
      </div>

      <p style={{ marginTop: "20px" }}>Joueur actuel : {player === 1 ? "X" : "O"}</p>
    </div>
  );
}

export default Morpion;
