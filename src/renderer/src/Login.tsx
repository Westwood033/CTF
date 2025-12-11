type LoginProps = {
  onLoginSuccess: () => void;
  goToRegister: () => void;
};

function checkLogin({ onLoginSuccess }: LoginProps,
                    { pseudo, password }: { pseudo: string; password: string }) {

  console.log(`pseudo récupéré : ${pseudo}`);
  console.log("pseudo attendu : root");
  window.api.getUserByPseudoAndByPassword(pseudo, password).then((user: User | undefined) => {
    if(user){
        onLoginSuccess();
    } else {
      alert("Identifiant ou mot de passe incorrect");
    }
  });
}


function Login({ onLoginSuccess, goToRegister}: LoginProps): React.JSX.Element {
  return (
    
    <div
      className="d-flex vh-100 w-100 align-items-center justify-content-center">
      <form
        className="d-flex flex-column text-center border rounded p-5 bg-dark"
        style={{ minWidth: "350px" }}
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const pseudo = (form.elements.namedItem("identifiant") as HTMLInputElement).value;
          const password = (form.elements.namedItem("motDePasse") as HTMLInputElement).value;
          checkLogin({ onLoginSuccess }, { pseudo, password });
        }}
      >
        <h3 className="mb-3 text-light">Connexion</h3>

        <label className="text-light">Identifiant</label>
        <input
          type="text"
          name="identifiant"
          className="form-control mb-3 mt-2"
          placeholder="Identifiant"
          required
        />

        <label className="text-light">Mot de passe</label>
        <input
          type="password"
          name="motDePasse"
          className="form-control mb-3 mt-2"
          placeholder="Mot de passe"
          required
        />

        <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">
          Se connecter
        </button>

        <a href="#" className="text-light mt-3"
        onClick={(e) => {
          e.preventDefault();   // évite le scroll/reload
          goToRegister();
        }}>
          Vous n'avez pas de compte ? Inscrivez-vous !
        </a>
      </form>
    </div>
  );
}

export default Login;
