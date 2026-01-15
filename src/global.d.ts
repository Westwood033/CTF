interface Window {
  api: {
    verify(text: string, id: number): boolean;
    getUserByPseudoAndByPassword: (pseudo: string, password: string) => Promise<User | undefined>;
    createUser: (pseudo: string, password: string) => Promise<User>;
    openDevTool: () => Promise<>;
    getFlagByNumber: (id: number) => Promise<Flag | undefined>;
    confirmFlag: (id: number, flag: string) => Promise<Flag>;
  };
}

interface User {
  id: number;
  pseudo: string;
  password: string;
}

interface Flag {
  id: number;
  number: number;
  flag: string;
}
