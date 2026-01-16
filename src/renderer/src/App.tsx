import React, { useEffect, useState } from "react";

type AppProps = {
  goToMorpion: () => void;
  goToFlagList: () => void;
  currentUser: User | null;
};

function goToPage({ goToMorpion }: AppProps, idPage: number) {
  switch (idPage) {
    case 1:
      goToMorpion();
      break;
  }
}

function App({ goToMorpion, goToFlagList, currentUser }: AppProps): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const flagFromDB1 = await window.api.getFlagByNumber(1);
      const flagFromDB2 = await window.api.getFlagByNumber(2);

      if (currentUser?.pseudo === "root" && !flagFromDB1) {
        const parts = [54, 86, 65, 109, 118, 53, 67, 66, 49, 119, 81, 101, 66, 76, 78, 90];
        const message = parts.map((c) => String.fromCharCode(c)).join("");
        setModalMessage(`Tu es l'admin ?\n${message}`);
        setShowModal(true);
      } 
      else if (currentUser?.pseudo !== "root" && !flagFromDB2) {
        const parts = [78, 55, 97, 81, 120, 80, 50, 76, 109, 57, 90, 75, 99, 82, 56, 68];
        const message = parts.map((c) => String.fromCharCode(c)).join("");
        setModalMessage(`T'es nouveau ici ?\n${message}`);
        setShowModal(true);
      }
    };

    checkUser();
  }, [currentUser]);

  const cards = [
    { id: 1, title: "Morpion", desc: "Rond contre croix, fait une ligne de trois", img: "./../src/assets/morpion.png" },
  ];

  return (
    <div className="container-fluid p-4">

      {/* Bouton */}
      <button
        className="btn btn-primary position-absolute top-0 end-0 m-3"
        onClick={() => goToFlagList()}
      >
        Remplis tes drapeaux
      </button>

      <h1 className="text-center mb-4">Mini-jeux</h1>

      {/* Grille */}
      <div className="row g-4">
        {cards.map((card) => (
          <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div
              className="card h-100 shadow text-center"
              role="button"
              onClick={() =>
                goToPage({ goToMorpion, goToFlagList, currentUser }, card.id)
              }
            >
              <img
                src={card.img}
                alt={card.title}
                className="card-img-top rounded"
              />

              <div className="card-body p-2">
                <h5 className="card-title mb-1">{card.title}</h5>
                <p className="card-text text-muted small">
                  {card.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
          <div className="bg-white text-dark p-4 rounded-3 shadow-lg text-center" style={{ width: 320 }}>
            
            <p className="bg-light p-2 rounded font-monospace text-break" style={{ whiteSpace: "pre-line" }}>
              {modalMessage}
            </p>

            <button
              className="btn btn-secondary mt-2"
              onClick={() => setShowModal(false)}
            >
              Fermer
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
