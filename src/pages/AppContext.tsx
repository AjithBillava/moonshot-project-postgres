/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";


type initialStateType={
    user?: any;
    setUser: (user: any | undefined) => void;
}

export const AppContext = createContext<initialStateType>({
  user: undefined,
  setUser: (user: any) => {},
});
const AppProvider = ({ children }) => {
  const [userState, setUserState] = useState(undefined);

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
