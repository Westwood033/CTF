export {}

declare global {
  interface Window {
     electron: {
      process: {
        versions: NodeJS.ProcessVersions
      }
    }
   api: {
    verify(text: string, id: number): boolean;
    getUserByPseudoAndByPassword: (pseudo: string, password: string) => Promise<User | undefined>;
    createUser: (pseudo: string, password: string) => Promise<User>;
    openDevTool: () => Promise<>;
    closeDevTool: () => Promise<>;
    getFlagByNumber: (id: number) => Promise<Flag | undefined>;
    confirmFlag: (id: number, flag: string) => Promise<Flag>;
  };
}
}

export interface User {
  id: number;
  pseudo: string;
  password: string;
}

export interface Flag {
  id: number;
  number: number;
  flag: string;
}

