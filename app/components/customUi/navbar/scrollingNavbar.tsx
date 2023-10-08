'use client';

//Global imports
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from "next-themes";

//icons
import { Mail, MapPin } from "lucide-react";

// Local imports
import { SafeUser } from "@/app/types";

//components
import Container from "@/app/components/Container";
import { NavMenu } from "@/app/components/customUi/navbar/navMenu";
import UserMenu from "@/app/components/customUi/navbar/userMenu";
import { Separator } from "@/app/components/ui/separator";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const ScrollingNavbar: React.FC<NavbarProps> = ({
    currentUser,
}) => {
    const router = useRouter();
    const [scrollingColor, setScrollingColor] = useState(false);
    const [scrolling, setScrolling] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150 && !scrolling) {
                setScrolling(true);
                setTimeout(() => {
                    setScrolling(false);
                    if (window.scrollY > 150) {
                        setScrollingColor(true);
                    }
                    else {
                        setScrollingColor(false);
                    }
                }, 700); // Adjust the duration as needed (1000ms = 1 second)
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrolling]);


    const springVariant = {
        hidden: { translateY: 0 },
        visible: { translateY: -100 },
    };

    return (
        <div
            className={`fixed top-0 w-full bg-white dark:bg-transparent z-20 drop-shadow-sm`}
        // transition={{ duration: 0.2, type: 'spring', stiffness: 100, bounce: 5 }}
        >
            <div className={`${scrollingColor ? "hidden" : "block -top-40 lg:top-0"} bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950
            w-full py-4 px-10 transition-all delay-500   z-10 fixed   text-white flex flex-col justify-between`}>

                <Container>
                    <div className={`${scrollingColor && 'py-2'} flex flex-row items-center justify-between gap-10`}>
                        <Image
                            onClick={() => router.push('/')}
                            className="xs:block  cursor-pointer"
                            src={"/images/logo.png"}
                            height={scrollingColor ? 80 : 100}
                            width={scrollingColor ? 80 : 100}
                            alt="Logo"
                        />
                        <span className="flex flex-col gap-y-2 justify-center items-center">
                            <span className="text-3xl font-extrabold">STUDENT&apos;S WELFARE ASSOCIATION</span>
                            <span className="hidden lg:block font-normal text-base ">GOVERNMENT COLLEGE OF ENGINEERING AND LEATHER TECHNOLOGY</span>                            
                            <span className="hidden lg:block font-normal text-sm ">Reg. No being- S/1L/74818 of 2010-2011 under West Bengal Act XXVI of 1961.</span>
                        </span>
                    </div>
                </Container>
                <div className="hidden w-full mt-5 px-4 lg:flex flex-row justify-between">
                    <span className="flex flex-row justify-center items-center gap-2 font-light text-sm"> <Mail size={18} /> swa.gcelt@gmail.com </span>
                    <Separator orientation="vertical" />
                    <span className="flex flex-row justify-center items-center gap-2 font-light text-sm"> <MapPin size={18} /> Block - LB 11, Sector-III, Salt Lake, Kolkata-700106, West Bengal , India. </span>
                </div>
            </div>


            <motion.div className={`transition-all duration-300 z-20 bg-cyan-900 text-white
            ${scrollingColor ? "dark:bg-gray-800 dark:border-gray-700" : "dark:bg-cyan-900 top-0 lg:top-40"}
            fixed top-0 w-full p-4 py-1  border-b-[1px]`}
                initial="hidden"
                animate={scrolling ? "visible" : "hidden"}
                variants={springVariant}
                transition={{ type: "spring", stiffness: 500, damping: 25, duration: 0.1 }} // Adjust the duration as needed
            >
                <div className="mb-1" >
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

                        <NavMenu />
                        <span className="whitespace-normal">     </span>
                        <UserMenu currentUser={currentUser} scrollingColor={scrollingColor} />
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default ScrollingNavbar;