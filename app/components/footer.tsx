//Global imports
import { redirect } from "next/navigation";

// Local imports
import { SafeUser } from "@/app/types";

//components
import Container from "@/app/components/Container";
import Heading from "@/app/components/ui/Heading";
import { Mail, MapPin, PhoneCall , Facebook , Youtube } from "lucide-react";

interface NavbarProps {
    contactInfo: any;
}

const Footer: React.FC<NavbarProps> = async ({
    contactInfo,
}) => {
    return (
        <div className="w-full h-fit relative bg-cyan-900 flex flex-col items-center justify-center text-white">
            <div className="w-full absolute top-0 h-5 bg-gradient-to-r from-sky-950 via-cyan-950 to-cyan-900 border-b-2 border-cyan-950">
            </div>
            <Container>
                <div className="max-w-screen-lg py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-7 mt-6 mb-2">
                        <div className="order-1 col-span-2 flex flex-col gap-1 pr-18">
                            <Heading heading2="MAIN MENU" />
                            <span className="font-light text-neutral-300 text-sm flex flex-col -mb-1">
                                <a href='https://gcelt.gov.in' target="_blank">GCELT</a>
                                <a href='/'>HOME</a>
                                <a href='/events'>EVENTS</a>
                                <a href='/gallery'>GALLERY</a>
                                <a href='/clubs'>CLUBS</a>
                                <a href='/union'>UNION MEMBERS</a>
                                <a href='/students'>STUDENTS</a>
                                <a href='#'>RC_GCELT</a>
                                <a href='/contact'>CONTACTS</a>
                            </span>
                        </div>
                        <div className="order-first mb-10 md:order-2 md:col-span-4 ">
                            <Heading heading2="ABOUT US"
                                subtitle="Students Association of GCELT is a government of West Bengal registered association, the Reg. No being- S/1L/74818 of 2010-2011 under West Bengal Act XXVI of 1961."
                            />
                            <span className="text-white text-sm mt-2 ">
                                <p>Account Details</p>
                                <p>A/C Name :- STUDENTS WELFARE ASSOCIATION</p>
                                <p>A/C No. :- 520101247020415</p>
                                <p>IFSC Code :- UBIN0906638</p>
                                <p>Bank Name :- UNION BANK</p>
                            </span>
                        </div>
                        <div className="order-2 col-span-2 flex flex-col gap-1 pr-18">
                            <Heading heading2="IMPORTAT LINKS" />
                            <span className="font-light text-neutral-300 text-sm flex flex-col -mb-1">
                                <a>MAKAUT Result</a>
                                <a>Participation Certificate</a>
                                <a>Academic Calendar</a>
                                <a>Anti-Ragging Committee</a>
                                <a>SWA Presentation</a>
                                <a>Students Database</a>
                            </span>                  
                        </div>
                        <div className="order-last col-span-4 flex flex-col gap-1 pl-3 pr-18">
                            <Heading heading2="CONTACT US" />
                            <p className="font-normal text-sm ">GOVERNMENT COLLEGE OF ENGINEERING AND LEATHER TECHNOLOGY</p> 
                            <span className="flex flex-row items-center gap-2 font-light text-sm"> <Mail size={18} /> {contactInfo.email} </span>
                            <span className="flex flex-row items-center gap-2 font-light text-sm"> <PhoneCall  size={18} /> +91 {contactInfo.PhoneNum1} </span>
                            <span className="flex flex-row items-center gap-2 font-light text-sm"> <MapPin size={18} /> Block - LB 11, Sector-III, Salt Lake</span>     
                            <span className="flex flex-row items-center gap-2 font-light text-sm"> Kolkata-700106, West Bengal , India. </span>       
                            <span className="flex flex-row items-center gap-2 font-light text-sm"> <Facebook size={18} /> Facebook</span>   
                            <span className="flex flex-row items-center gap-2 font-light text-sm"> <Youtube size={18} /> Youtube</span>                   
                        </div>
                    </div>
                </div>
            </Container>
            <div className="w-full  h-fit absolute bottom-0 p-2 bg-cyan-950 flex flex-col flex-wrap overflow-hidden justify-center items-center whitespace-pre text-sm">
               <p> &#169; 2023 All Rights Reserved by SWA GCELT </p> 
               <p className="text-xs">Developed by Saptarshi Chatterjee @Batch-2024</p>
            </div>
        </div>


    )
}
export default Footer;