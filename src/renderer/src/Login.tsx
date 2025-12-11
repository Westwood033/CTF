import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

type LoginProps = {
  onLoginSuccess: () => void; // Fonction venant du parent
};

function checkLogin(({ onLoginSuccess }: LoginProps, {pseudo, password}) => {
     if (pseudo === 'admin' && password === '1234') {
              onLoginSuccess();
            } else {
              alert('Identifiant ou mot de passe incorrect');
            }
});

function Login({onLoginSuccess }: LoginProps): React.JSX.Element {
  return (
    <>
      <div className="login-form">
        <h2>Connexion</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const form = e.target as HTMLFormElement;
            const pseudo = (form.elements.namedItem('identifiant') as HTMLInputElement).value;
            const password = (form.elements.namedItem('motDePasse') as HTMLInputElement).value;
            checkLogin({onLoginSuccess}, {pseudo, password});
          }}
        >
          <div className="form-group">
            <label htmlFor="identifiant">Identifiant</label>
            <input type="text" name="identifiant" id="identifiant" required />
          </div>

          <div className="form-group">
            <label htmlFor="motDePasse">Mot de passe</label>
            <input type="password" name="motDePasse" id="motDePasse" required />
          </div>

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </>
  );
}

export default Login;
