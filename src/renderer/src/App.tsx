import React from 'react'


type AppProps = {
  goToMorpion: () => void;
  goToFlagList: () => void;
};

function goToPage({ goToMorpion }: AppProps, idPage: number){
  switch(idPage){
    case 1:
      goToMorpion();
      break;
  }
}

function App({ goToMorpion, goToFlagList } : AppProps): React.JSX.Element {

  /*const parts = [54, 86, 65, 109, 118, 53, 67, 66, 49, 119, 81, 101, 66, 76, 78, 90];
  return parts.map((c) => String.fromCharCode(c)).join("");
  6VAmv5CB1wQeBLNZ
  f4310e03cf6b1c98a1ebd2c0d7eeb2f8d0e13b64a7a9050d6162d4df509c689b
  */

  /*const parts = [
  78, 55, 97, 81, 120, 80, 50, 76,
  109, 57, 90, 75, 99, 82, 56, 68
];
return parts.map(c => String.fromCharCode(c)).join("");
N7aQxP2Lm9ZKcR8D
c1b8f3c4c2b5f7f7c5b9c99e4d2b0f2c4f4b7c07b3f4f0e5e1b8f4d95d6a0c21
*/
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
  ]

  return (
    <div style={styles.page}>

      <button
        className="btn btn-primary position-absolute"
        style={{ top: "1rem", right: "1rem", zIndex: 10 }}
        onClick={() => {
          goToFlagList();
        }}
      >
        Remplis tes drapeaux
      </button>

      <h1 style={{ textAlign: "center" }}>Mini-jeux</h1>

      <div style={styles.grid}>
        {cards.map(card => (
          <div key={card.id} style={styles.card}
          onClick={() => {
                goToPage({ goToMorpion },card.id);
              }}>
            <img src={card.img} alt={card.title} style={styles.image} />
            <h3 style={styles.title}>{card.title}</h3>
            <p style={styles.description}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px"
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    textAlign: "center"
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  title: {
    margin: "8px 0 4px 0"
  },
  description: {
    fontSize: "14px",
    color: "#555"
  }
}

export default App
