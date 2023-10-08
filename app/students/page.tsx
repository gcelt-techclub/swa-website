// Global imports
import { useEffect } from "react";
import Image from "next/image";

// Components
import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/ui/Heading";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

// actions
import getCurrentUser from "@/app/actions/getCurrentUser";

//client
import StudentClient from "./studentClient";


const StudentPage = async () => {
    const currentUser = await getCurrentUser();
    const isEmpty = true;

    return (

        <ClientOnly>
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


            <Container>
                <Card className="select-none w-full bg-neutral-100 dark:bg-slate-900 shadow-lg mt-3 mb-16">
                    <CardHeader className="flex flex-col justify-center items-center">
                        <CardTitle className="text-3xl font-extrabold">STUDENTS</CardTitle>
                        <hr className="w-full border-t border-neutral-400 dark:border-muted-foreground" />
                    </CardHeader>
                    <CardContent className="mt-3">
                        <Container>
                            <div className=" flex flex-col gap-3 pr-18 px-auto">
                                <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-700">ABOUT OUR STUDENTS</p>
                                <p className="text-sm">
                                    THE STUDENTS OF GCELT ARE ACTIVE, VIBRANT AND LIVELY. ADMISSION OF WARDS IS TAKEN FROM POOL OF SUCCESSFUL CANDIDATES IN WEST BENGAL JOINT ENTRANCE EXAMINATION THROUGH COUNSELING PROCESS CONDUCTED BY CENTRAL SELECTION COMMITTEE.
                                </p>
                                <p className="text-sm">
                                    ADMISSION OF STUDENTS TO ADVANCED CERTIFICATE COURSE IS DONE THROUGH ADVERTISEMENT IN NEWSPAPER & COLLEGE PORTAL FOLLOWED BY A LOCAL ADMISSION TEST CONDUCTED IN THE COLLEGE ITSELF.
                                </p>
                                <p className="text-sm">
                                    STUDENTS BELONG TO A CERTAIN MERITORIOUS CATEGORY. MOST OF OUR STUDENTS HAVE EXCELLED IN THEIR PROFESSIONAL LIVES AND HEIGHTENED NAME OF THE INSTITUTE IN PROFESSIONAL ARENA. MANY OF OUR STUDENTS OPT FOR HIGHER STUDIES AND HAVE EXCELLED IN COMPETITIVE EXAMINATIONS LIKE GATE, CAT, AND MAT ETC. STUDENTS HAVE ALSO PROVED THEIR EXCELLENCE IN PROFESSIONAL EXAMINATIONS DESIGNATED FOR ADMINISTRATIVE POSTS. STUDENTS HAVE ALSO LEFT EXCELLENT FOOTPRINTS IN OTHER SECTORS E.G. CULTURAL PROFESSION, ENTREPRENEURSHIP ETC. STUDENTS HAVE ALSO PROVEN THEIR TRACK RECORDS IN OTHER EXTRA CURRICULAR ACTIVITIES ALSO.
                                </p>
                                <span className="flex justify-center items-center my-5">
                                    <blockquote className="relative flex justify-center items-center">
                                        <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-300 dark:text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
                                        </svg>

                                        <div className="relative z-10">
                                            <p className="text-gray-800 dark:text-white"><em>
                                            &quot;BE A LIFELONG LEARNER, NOT A LIFELONG STUDENT...&quot; -ANONYMOUS
                                            </em></p>
                                        </div>
                                    </blockquote>
                                </span>
                                <p className="text-sm">
                                    GCELT IS SUCH AN INSTITUTE THAT BELIEVES IN CREATING AND SHAPING FUTURE CITIZENS OF THE COUNTRY, WHO WILL TAKE THE COUNTRY TO NEW HEIGHTS RATHER THAN ONLY PRODUCING GOOD TECHNICIANS. IN DOING SO, GCELT NOT ONLY GIVES IMPORTANCE TO THE SYLLABUS ORIENTED ACADEMIC EDUCATION BUT ALSO KEEPS VIGILANT EYE ON CHARACTER BUILDING EXERCISE AND PROVIDING LIFE ORIENTED EDUCATION.
                                </p>
                                <p className="text-sm">
                                    STUDENTS OF GCELT CAN BE FOUND DOING THEIR WORK AND MAKING THE COUNTRY PROUD IN A WIDE RANGE OF FIELDS AND NOT ONLY IN COMPUTER SCIENCE/INFORMATION TECHNOLOGY AND LEATHER TECHNOLOGY SECTORS. ALL TOP LEVELS COMPUTER/IT INDUSTRY HAVE GOT ALUMNI OF GCELT AS THEIR EMPLOYEES, IBM, COGNIZANT, CAPGEMINI, WIPRO, TCS, ACCENTURE TO NAME A FEW SUCH COMPANIES. BESIDE THIS LEADING CHEMICAL INDUSTRY COMPANIES SUCH AS CLARIENT, STAHL, BASF, TFLT, AND FB HAVE GOT ALUMNI OF THIS COLLEGE FROM LEATHER TECHNOLOGY DEPARTMENT. THIS SPEAKS FOR ITSELF ABOUT THE INSTITUTE AND THE STUDENTS OF THIS INSTITUTE.
                                </p>
                                <p className="text-sm">
                                    BESIDE THIS MANY STUDENTS OF GCELT CAN BE FOUND PURSUING FURTHER HIGHER STUDIES IN TOP INSTITUTES ACROSS THE COUNTRY, BOTH IN R&D AND HR FIELD.
                                </p>
                                <p className="text-sm">
                                    THERE ARE ALSO ALUMNI OF THIS INSTITUTE, WHO ARE FLOURISHING IN OTHER PROFESSIONS APART FROM CS/IT AND LT. GCELT TAKES PRIDE IN THEM ALSO, AS THE INSTITUTE BELIEVES, THE ULTIMATE GOAL IS TO BE A PROPER HUMAN BEING AND DO WELL TO ONESELF AND TO THE SOCIETY, AND THE FIELD OR PROCESS FOR DOING SO MAY VARY. AND GCELT MAKES SURE THAT EVEN WHEN THE STUDENT COMPLETES HIS/HER COURSE AND ATTAINS THE DEGREE, THE WILL TO LEARN IS NOT DIMINISHED IN ANY FORM. IT’S A MATTER OF A JOY, TILL DATE GCELT HAVE BEEN SUCCESSFUL IN DOING SO, AND FOR THAT THE STUDENTS OF THE COLLEGE DESERVES EQUAL CREDIT AS THE INSTITUTE ITSELF.
                                </p>

                            </div>
                        </Container>
                    </CardContent>
                    <CardFooter>
                        <StudentClient currentUser={currentUser}/>
                    </CardFooter>
                </Card>
            </Container>
        </ClientOnly>

    )
}

export default StudentPage;