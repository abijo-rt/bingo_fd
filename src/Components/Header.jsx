import { useEffect, useState } from "react";
import { SpeakerHigh , Sun } from "phosphor-react";

const Header=()=>{
    return(
    <>
        <header className="w-[100%] min-h-[7vh] flex flex-row items-center space px-[2rem] py-[1rem] justify-between"> 
            <img src="/src/assets/BingoLogo.png" className="w-[7rem] h-[4.9rem] "/> 
            <div className="flex flex-row w-[10rem] h-[4rem] items-centre p-2">
                <button className="cursor-pointer w-[3rem] h-[3rem] mr-[3rem] rounded-3xl flex items-center justify-center border-[#febc4a] border-2"><SpeakerHigh size={22} weight="fill" className="text-[#febc4a]" /></button>
                <button className="cursor-pointer w-[3rem] h-[3rem] border-2 border-[#febc4a] flex items-center rounded-4xl justify-center"><Sun size={22} color="#febc4a" weight="fill" /></button>
            </div>
        </header>
    </>
    );
}
export default Header;