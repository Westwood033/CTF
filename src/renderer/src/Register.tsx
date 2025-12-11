type RegisterProps = {
  goToLogin: () => void;
};

function checkRegister({ goToLogin }: RegisterProps,
                    { pseudo, password }: { pseudo: string; password: string }) {

  window.api.createUser(pseudo, password).then((user: User | undefined) => {
    if(user){
        goToLogin();
    } else {
      alert("Impossible de créer l'utilisateur");
    }
  });
}

const handleOpenDevTools = () => {
    // envoyer un message au main process
    window.api.openDevTool();
  };


function Register({ goToLogin }: RegisterProps): React.JSX.Element {
  return (
    <div className="text-body d-flex p-0 m-0 vh-100 w-100 position-relative">
      
      {/* Bouton en haut à droite */}
      <button
        className="btn btn-info position-absolute"
        style={{ top: "1rem", right: "1rem", zIndex: 10 }}
        onClick={() => {
          handleOpenDevTools();
        }}
      >
        Ouvrir la console
      </button>

      <div className="container-fluid p-0 m-0 h-100 d-flex">
        {/* Formulaire collé à gauche */}
        <form
          className="w-50 h-100 d-flex flex-column text-center border-end justify-content-center align-items-center bg-dark"
          style={{ minWidth: "350px" }}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const pseudo = (form.elements.namedItem("identifiant") as HTMLInputElement).value;
            const password = (form.elements.namedItem("motDePasse") as HTMLInputElement).value;
            checkRegister({ goToLogin }, { pseudo, password });
          }}
        >
          <h3 className="mb-3 text-light">Inscription</h3>

          {/* Wrapper pour réduire la largeur visuelle des champs */}
          <div className="container" style={{ maxWidth: "400px" }}>
            <label className="text-light w-100 mb-1">Identifiant</label>
            <input
              className="form-control mb-3 w-100"
              type="text"
              name="identifiant"
              placeholder="Identifiant"
              required
            />

            <label className="text-light w-100 mb-1">Mot de passe</label>
            <input
              className="form-control mb-3 w-100 text-black"
              type="password"
              name="motDePasse"
              placeholder="Mot de passe"
              required
            />

            <div className="d-flex flex-row">
              <input
                type="checkbox"
                name="acceptTerms"
                className="me-2 ms-5 mb-1 d-none"
                required
                defaultChecked={false}
              />
              <label className="text-light mb-1">J'accepte les conditions d'utilisation</label>
            </div>

            <button type="submit" className="btn btn-lg btn-primary w-100 mt-2 mb-3">
              S'inscrire
            </button>

            <a
              href="#"
              className="mt-4 text-light w-100"
              onClick={(e) => {
                e.preventDefault();
                goToLogin();
              }}
            >
              Vous avez déjà un compte ? Connectez-vous !
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
