import React from 'react'


type AppProps = {
  goToMorpion: () => void;
};

function goToPage({ goToMorpion }: AppProps, idPage: number){
  switch(idPage){
    case 1:
      goToMorpion();
      break;
  }

}



function App({ goToMorpion }: AppProps): React.JSX.Element {
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
      <h1 style={{ textAlign: "center" }}>Mes Cards</h1>

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
