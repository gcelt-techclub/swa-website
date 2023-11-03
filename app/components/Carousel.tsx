//Global imports
import React from 'react'
import Image from "next/image";

//components
import Heading from "./ui/Heading";

function Carousel() {
    return (
        <>
            <div>
                <Image
                    src={"/images/assets/hero_img.jpg"}
                    height={1200}
                    width={637}
                    className="w-full h-1/3 lg:h-[40rem] object-cover"
                    alt="hero_img"
                />
                {/* <img className="w-full h-1/3 lg:h-[40rem] object-cover" src={"/images/assets/hero_img.jpg"} alt='hero_img'/> */}
            </div>
            <div className={`bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950
            w-full pt-4 pb-2 px-10 transition-all delay-500 text-white flex flex-row`}>
                <Heading title="WELCOME" />
                <div className="w-1 ml-10 border-solid border-r-2 border-white"> </div>
                <div className="w-1 border-solid border-r-2 border-white"> </div>
            </div>
        </>
    )
}

export default Carousel