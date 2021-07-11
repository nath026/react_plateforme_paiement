import {createContext} from "react";

export const TraderContext = createContext();

export default function TraderContext({children}){
    return(
        <TraderContext.Provider>
            {children}
        </TraderContext.Provider>
    );
}