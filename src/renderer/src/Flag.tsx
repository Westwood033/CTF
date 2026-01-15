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
    { id: 2, desc: "T'es nouveau ici ?" },
    { id: 3, desc: "Gagne contre le morpion" },
    { id: 4, desc: "Disponible le 19 mars 2026" },
  ];

  useEffect(() => {
    const loadFlags = async () => {
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

    await window.api.confirmFlag(id, textValue);

    setSuccessRows((prev) => ({
      ...prev,
      [id]: textValue,
    }));

    setModalMessage("Bravo");
    setShowModal(true);

    setInputs((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 position-relative">

      {/* Table */}
      <table className="table table-bordered w-75 text-center align-middle">
        <thead className="table-light">
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
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      value={inputs[flag.id] || ""}
                      placeholder={validatedFlag || ""}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          [flag.id]: e.target.value,
                        }))
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
                  </div>
                </td>

                <td>{flag.desc}</td>

                <td className={validatedFlag ? "bg-success text-white fs-4" : "bg-danger text-white fs-4"}>
                  {validatedFlag ? "✓" : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Bouton retour */}
      <button
        className="btn btn-primary position-absolute top-0 start-0 m-3"
        onClick={() => goToApp()}
      >
        Retour
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
          <div className="bg-white text-dark p-4 rounded-3 shadow-lg text-center" style={{ width: 320 }}>
            
            <h2 className="mb-3">{modalMessage}</h2>

            <button
              className="btn btn-secondary"
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

export default Flag;
