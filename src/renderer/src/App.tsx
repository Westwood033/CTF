import React, { useEffect, useState } from 'react';

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

      // root et flag 1 manquant
      if (currentUser?.pseudo === "root" && !flagFromDB1) {
        const parts = [54, 86, 65, 109, 118, 53, 67, 66, 49, 119, 81, 101, 66, 76, 78, 90];
        const message = parts.map((c) => String.fromCharCode(c)).join("");
        setModalMessage(`Tu es l'admin ?\n${message}`);
        setShowModal(true);
      }
      // non-root et flag 2 manquant
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
    { id: 2, title: "Puissance 4", desc: "Bleu contre rouge, fait une ligne de 4", img: "./../src/assets/puissance4.png" },
    { id: 3, title: "Démineur", desc: "Ne tombe pas sur la bombe", img: "https://picsum.photos/300?3" },
    { id: 4, title: "Jeu du pendu", desc: "Trouve le mot avec un nombre limité de coups", img: "https://picsum.photos/300?4" },
    { id: 5, title: "Pierre - Feuille - Ciseaux", desc: "Le puit n'existe pas", img: "https://picsum.photos/300?5" },
    { id: 6, title: "2048", desc: "", img: "https://picsum.photos/300?6" },
    { id: 7, title: "Sudoku", desc: "Trouve la bonne combinaison", img: "https://picsum.photos/300?7" },
    { id: 8, title: "Jeu de la vie", desc: "Es-tu un dieu ?", img: "https://picsum.photos/300?8" },
    { id: 9, title: "Devine le film", desc: "Description de la card 9", img: "https://picsum.photos/300?9" },
    { id: 10, title: "Reflex master", desc: "Clque sur les ronds qui apparaissent", img: "https://picsum.photos/300?10" },
  ];

  return (
    <div style={styles.page}>
      <button
        className="btn btn-primary position-absolute"
        style={{ top: "1rem", right: "1rem", zIndex: 10 }}
        onClick={() => goToFlagList()}
      >
        Remplis tes drapeaux
      </button>

      <h1 style={{ textAlign: "center" }}>Mini-jeux</h1>

      <div style={styles.grid}>
        {cards.map(card => (
          <div
            key={card.id}
            style={styles.card}
            onClick={() => goToPage({ goToMorpion, goToFlagList, currentUser }, card.id)}
          >
            <img src={card.img} alt={card.title} style={styles.image} />
            <h3 style={styles.title}>{card.title}</h3>
            <p style={styles.description}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
             <p
              style={{
                background: "#f4f4f4",
                padding: "10px",
                borderRadius: "6px",
                fontFamily: "monospace",
                wordBreak: "break-all",
                whiteSpace: "pre-line",
              }}
            >
              {modalMessage}
            </p>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "20px", fontFamily: "Arial, sans-serif" },
  grid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" },
  card: { background: "#fff", borderRadius: "10px", padding: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", textAlign: "center" },
  image: { width: "100%", borderRadius: "8px", marginBottom: "10px" },
  title: { margin: "8px 0 4px 0" },
  description: { fontSize: "14px", color: "#555" },
} as const;

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  color: "#222",
  padding: "25px",
  borderRadius: "12px",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
};

export default App;
