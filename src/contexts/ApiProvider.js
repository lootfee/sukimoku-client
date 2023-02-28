import { createContext, useContext } from "react";
import ApiClient from "../ApiClient";

const ApiContext = createContext();

function ApiProvider({children}){
    const api = new ApiClient();

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

export default ApiProvider;

export function useApi(){
    return useContext(ApiContext);
}

