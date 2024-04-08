/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useRef, useState } from "react";

export type categoriesType = {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type userType = {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: categoriesType[];
};

type initialStateType = {
  user?: userType | undefined;
  setUser: (user: userType | undefined) => void;
};

export const AppContext = createContext<initialStateType>({
  user: undefined,
  setUser: (user: userType | undefined) => {},
});
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, setUserState] = useState<userType | undefined>(undefined);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const localUser: userType = JSON.parse(localStorage.getItem("user")!);

    userState ?? setUserState(localUser);
  }, [userState]);

  return (
    <AppContext.Provider
      value={{
        user: userState,
        setUser: setUserState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
