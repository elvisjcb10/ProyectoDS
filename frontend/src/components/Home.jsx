import React from "react";
import appFireBase from "../credenciales";
import { getAuth,signOut } from "firebase/auth";
const auth=getAuth(appFireBase);
const Home =({correoUsuario}) =>{
    return(
        <div>
            <h2>Home {correoUsuario}</h2>
            <button className="btn btn-primary" onClick={()=>signOut(auth)}>logout</button>
        </div>
    )
}
export default Home