/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from "react";

export type categoriesType = {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type userType = {
  id: string|number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: categoriesType[];
};

type initialStateType = {
  user?: userType | undefined;
  setUser: (user: userType | undefined) => void;
  token?:string
};

export const AppContext = createContext<initialStateType>({
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user: userType | undefined) => {},
  token:''
});
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, setUserState] = useState<userType | undefined>(undefined);
  const [tokenState,setTokenState] = useState('')
  
  useEffect(()=>{
  setTokenState( localStorage.getItem("token")!);

  },[])

  return (
    <AppContext.Provider
      value={{
        user: userState,
        setUser: setUserState,
        token:tokenState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
