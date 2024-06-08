import { createContext, useContext } from 'react';

interface AppContextType {
    appState: {
        position: any;
        turn: string;
        candidateMoves: any;
        movesList: any;
    
        promotionSquare: any;
        status: string;
        castleDirection:any
    },
    dispatch:(input:{type:string,payload?:any})=>void
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext(): AppContextType {
  return useContext(AppContext) as AppContextType;
}

export default AppContext;