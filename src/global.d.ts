interface Window {
  api: {
    getUserByPseudoAndByPassword: (pseudo: string, password: string) => Promise<User | undefined>;
    createUser: (pseudo: string, password: string) => Promise<User>;
    openDevTool: () => Promise<>;
  };
}

interface User {
  id: number;
  pseudo: string;
  password: string;
}
