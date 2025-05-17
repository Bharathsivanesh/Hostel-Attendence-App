import React, { createContext, useState } from "react"

export const Wardencontext=createContext();

export const WardenProvider=({children})=>{

    const[wardeninfo,setWardenifo]=useState(null);
    return(
        <Wardencontext.Provider value={{wardeninfo,setWardenifo}}>
        {children}

        </Wardencontext.Provider>
    )
}