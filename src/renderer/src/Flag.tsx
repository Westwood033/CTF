import { useEffect, useState } from "react";

type FlagProps = {
  goToApp: () => void;
};

function Flag({ goToApp }: FlagProps): React.JSX.Element {
  const [inputs, setInputs] = useState<{ [id: number]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [successRows, setSuccessRows] = useState<{ [id: number]: string }>({});

  const flags = [
    { id: 1, desc: "Tu es l'admin ?" },
    { id: 2, desc: "Bonjour nouveau participant" },
    { id: 3, desc: "Gagne contre le morpion" },
    { id: 4, desc: "Disponible le 19 mars 2026" },
    { id: 5, desc: "Le puit n'existe pas" },
    { id: 6, desc: "df" },
    { id: 7, desc: "Trouve la bonne combinaison" },
    { id: 8, desc: "Es-tu un dieu ?" },
    { id: 9, desc: "Description de la card 9" },
    { id: 10, desc: "Clique sur les ronds qui apparaissent" },
  ];

  useEffect(() => {
     console.log("useEffect chargé");
  const loadFlags = async () => {
     console.log("load chargé");
    const results: { [id: number]: string } = {};
    for (const flagLine of flags) {
      const flagFromDB = await window.api.getFlagByNumber(flagLine.id);
      if (flagFromDB) {
        results[flagLine.id] = flagFromDB.flag;
      }
    }

    setSuccessRows(results);
  };

  loadFlags();
}, []);


  const saveFile = async (id: number) => {
    const textValue = inputs[id] || "";
    const isValid = await window.api.verify(textValue, id);

    if (!isValid) {
      setModalMessage("Perdu");
      setShowModal(true);
      return;
    }

    const test = await window.api.confirmFlag(id, textValue);
    console.log(test)

    const check = await window.api.getFlagByNumber(id);
    console.log("Check after save:", check);

    // ✔️ Mise à jour UI
    setSuccessRows((prev) => ({
      ...prev,
      [id]: textValue,
    }));

    setModalMessage("Bravo");
    setShowModal(true);

    // reset input de cette ligne
    setInputs((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="text-body d-flex justify-content-center align-items-center vh-100 w-100">
      <table className="table table-bordered w-75 text-center align-middle">
        <thead>
          <tr>
            <th>Drapeau</th>
            <th>Description</th>
            <th>Statut</th>
          </tr>
        </thead>

        <tbody>
          {flags.map((flag) => {
            const validatedFlag = successRows[flag.id];

            return (
              <tr key={flag.id}>
                <td className="d-flex flex-row align-items-center gap-2">
                  <input
                    type="text"
                    className="form-control"
                    value={inputs[flag.id] || ""}
                    placeholder={validatedFlag || ""}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, [flag.id]: e.target.value }))
                    }
                    disabled={!!validatedFlag}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => saveFile(flag.id)}
                    disabled={!!validatedFlag}
                  >
                    Valider
                  </button>
                </td>

                <td>{flag.desc}</td>

                <td
                  style={{
                    fontSize: "1.5rem",
                    backgroundColor: validatedFlag ? "green" : "red",
                    color: "#fff",
                  }}
                >
                  {validatedFlag ? "✓" : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Bouton retour */}
      <button
        className="btn btn-primary position-absolute"
        style={{ top: "1rem", left: "1rem", zIndex: 10 }}
        onClick={() => goToApp()}
      >
        Retour
      </button>

      {/* ⭐ POPUP */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2>{modalMessage}</h2>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Styles de la popup */
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

export default Flag;
