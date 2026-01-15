import { useEffect, useState } from "react";

type MorpionProps = {
  goToApp: () => void;
};

function Morpion({ goToApp }: MorpionProps): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [grille, setGrille] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [player, setPlayer] = useState(1); // 1 = X, 2 = O

  // IA automatique
  useEffect(() => {
    if (player !== 2 || showModal) return;

    const timer = setTimeout(() => {
      const emptyCells: [number, number][] = [];
      for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
          if (grille[i][j] === 0) emptyCells.push([i, j]);
        }
      }

      if (emptyCells.length === 0) return;

      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const [i, j] = emptyCells[randomIndex];
      play(i, j);
    }, 1000);

    return () => clearTimeout(timer);
  }, [grille, player, showModal]);

  // Vérification victoire
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

  const clean = (g, num) =>
    g.map((row) => row.map((cell) => (cell === num ? cell : 0)));

  function getFlag() {
    const parts = [113, 118, 98, 105, 66, 104, 87, 79, 112, 105, 68, 67, 50, 66, 104, 109];
    return parts.map((c) => String.fromCharCode(c)).join("");
  }

  const play = (i, j) => {
    setGrille((prev) => {
      if (prev[i][j] !== 0) return prev;

      const newGrid = prev.map((row) => [...row]);
      newGrid[i][j] = player;

      if (multiply(clean(newGrid, player), player)) {
        if (player === 1) {
          const f = getFlag();
          setFlag(`Gagne contre le morpion : ${f}`);
        } else {
          setFlag("L'IA a gagné");
        }
        setShowModal(true);

        // Remplir la grille pour montrer victoire
        return Array(3)
          .fill(0)
          .map(() => Array(3).fill(player));
      } else {
        setPlayer(player === 1 ? 2 : 1);
      }

      return newGrid;
    });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 w-100 position-relative"
         style={{ backgroundImage: "url('/chemin/vers/ton/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
      {/* Bouton retour */}
      <button
        className="btn btn-primary position-absolute top-0 start-0 m-3"
        onClick={() => goToApp()}
      >
        Retour
      </button>

      <h1 className="mb-4 text-light">Morpion React</h1>

      {/* Grille */}
      <div className="d-grid gap-2 p-2 rounded" style={{ gridTemplateColumns: "repeat(3, 100px)", backgroundColor: "#333" }}>
        {grille.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className="btn btn-light d-flex align-items-center justify-content-center"
              style={{ width: 100, height: 100, fontSize: 50, fontWeight: "bold" }}
              onClick={player === 2 ? undefined : () => play(i, j)}
            >
              {cell === 1 ? "X" : cell === 2 ? "O" : ""}
            </button>
          ))
        )}
      </div>

      <p className="mt-3 text-light">Joueur actuel : {player === 1 ? "X" : "O"}</p>

      {/* Modal */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
          <div className="bg-white text-dark p-4 rounded-3 shadow-lg text-center" style={{ width: 320 }}>
            <h2>Résultat</h2>
            <p className="bg-light p-2 rounded font-monospace text-break">{flag}</p>
            <button className="btn btn-secondary mt-2" onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Morpion;
