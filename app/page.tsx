export const dynamic = 'force-dynamic'
// Global imports
import { redirect } from "next/navigation";
import Image from "next/image";

// Local imports
import { PictureList0, PictureList1 } from "./HomePicture";

// Components
import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "./components/ui/Heading";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";

// actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import FeatureSection from "./components/customUi/featureSection";


const Home = async () => {
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
                <Card className="select-none w-full bg-neutral-100 dark:bg-slate-900 shadow-lg mt-3">
                    <CardHeader className="flex flex-col justify-center items-center">
                        <CardTitle className="text-3xl font-extrabold">GLORY OF GCELT</CardTitle>
                        <hr className="w-full border-t border-neutral-400 dark:border-muted-foreground" />
                    </CardHeader>
                    <CardContent className="mt-3">
                        <div className="max-w-screen-lg mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-8 md:gap-7 mt-6 mb-2">
                                <div className="order-1 col-span-4 flex flex-col gap-1 pr-18">
                                    <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-700">ABOUT GCELT</p>
                                    <p className="text-sm">
                                        The Government College of Engineering and Leather Technology (GCELT),
                                        pioneer in the field of education and research on Leather Technology
                                        was originally started under the name &apos;Calcutta Research Tannery&apos; in
                                        the year 1919 on the recommendation of Munitions Board set up by the
                                        Government of India immediately after the first World War with the aim
                                        of exploring Indigenous resources of hides, skins and tanning materials
                                        for the purpose of production of leather and leather goods and development
                                        of leather industry in the country. The college originally was situated
                                        on Canal South Road, Pagladanga, P.O. Tangra, Calcutta - 700 015. In
                                        August 1955 this college was affiliated to the University of Calcutta
                                        for imparting training in B. Sc. (Tech) course in Leather Technology and
                                        it has been recognized as a professional college under the University of
                                        Calcutta. The latest development and new schemes undertaken by the college
                                        has turned it into a big organization in the field of Leather Technology,
                                        the like of which was not found in any part of India. The main service
                                        provided by the college to the industry during 90 years of existence was
                                        supply of technical manpower and technical development.
                                    </p>
                                </div>
                                <div className="order-first mb-10 md:order-2 md:col-span-4 ">
                                    {/* images here */}
                                    <div className="flex flex-wrap gap-3">
                                        {PictureList0.map((image: { src: string, label: string }) => (
                                            <div key={image.src} className="w-fit h-fit p-2 border-2 border-neutral-500 dark:border-neutral-100">
                                                <Image
                                                    src={image.src}
                                                    height={150}
                                                    width={200}                                                    
                                                    alt="four_images"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div></div>
                    </CardContent>
                </Card>
                <Card className="select-none w-full bg-neutral-100 dark:bg-slate-900 shadow-lg my-5">
                    <CardHeader className="flex flex-col justify-center items-center">
                        <CardTitle className="text-3xl font-extrabold">ABOUT US</CardTitle>
                        <hr className="w-full border-t border-neutral-400 dark:border-muted-foreground" />
                    </CardHeader>
                    <CardContent className="mt-3">
                        <div className="max-w-screen-lg mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-8 md:gap-7 mt-6 mb-2">
                                <div className="order-1 col-span-3 flex flex-col gap-1 pr-18">
                                    {/* images here */}
                                    <div className="flex flex-wrap gap-0.5">
                                        {PictureList1.map((image: { src: string, label: string }) => (
                                            <div key={image.src} className="w-fit h-fit">
                                                <Image
                                                    src={image.src}
                                                    height={120}
                                                    width={160}                                                    
                                                    alt="ten_images"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="order-first mb-10 md:order-2 md:col-span-5 flex flex-col gap-2">
                                    <p className="text-3xl font-black mb-4">STUDENTS&apos; VOICE</p>
                                    <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-700">Students&apos; Welfare Association</p>
                                    <p className="text-sm">
                                        The student body of any educational institute is one of the primary pillars of that institute. Thus every student body needs a platform through which they can voice their opinions, suggestions, complains and demands for their and their institute&apos;s betterment. And not only voicing their opinion, but a platform is also very essential for proper communication among the students, faculty and administration. In GCELT this platform is provided to the students in form of Students Welfare Association of GCELT, a non-profitable, apolitical welfare association, by the students of GCELT and for the students of GCELT.
                                    </p>
                                    <p className="text-sm">
                                        Students Association of GCELT is a government of West Bengal registered association, the Reg. No being- S/1L/74818 of 2010-2011 under West Bengal Act XXVI of 1961. The main purpose and activity of this student body are as follows-
                                    </p>
                                    <ol style={{ listStyleType: 'decimal' }} className="text-sm flex flex-col gap-1 ml-5">
                                        <li>To maintain a unity and communication among all the students of the college present or alumni. Provide a platform using which the students will be able to voice their opinions, suggestions and complains.
                                        </li>
                                        <li>Organize and encourage various co-curricular activities. Different student clubs of GCELT such as the Anti-ragging club, Theatre club, Music club, Debate club, Sports club are all part of the Students Welfare Association.
                                        </li>
                                        <li>Every year two fests: one cultural and one technical are being organized by the students of GCELT, under the banner of Students Welfare Association.
                                        </li>
                                        <li>Annual cricket, football, badminton, carom tournament are organized by the association.
                                        </li>
                                        <li>Other events organized and celebrated by the association includes- Freshers&apos; Welcome, Teachers&apos; Day, Independence Day, Republic Day, Rabindra Jayanti, Sharswati Puja, Final year Farewell etc.
                                        </li>
                                    </ol>
                                    <p className="text-sm">
                                        The office bearers of this association are strictly students studying in GCELT and no one else. The post of General Secretary contains student from 4th year, Assistant General Secretary from 3rd year, and Treasurer from both 4th and 3rd year. Other official posts of the association include Sports Secretary, Cultural Secretary, Association PR student. Also class&apos; representative from each year and each stream are also part of the Students&apos; Welfare Association of GCELT. The office bearers are strictly students studying at GCELT at that time and they are chosen through voting. This election is held every year, under the supervision of college administration.
                                    </p>
                                    <p className="text-sm">
                                        Lastly to speak about this association&apos;s motive, it can be said, Students Welfare Association of GCELT echoes George Bernard Shaw&apos;s words: “You see things, and you say &quot;Why?&quot; But I dream things that never were, and I say &quot;Why not?&quot;.
                                    </p>
                                </div>
                            </div>


                            <hr className="w-full mb-10 border-t border-neutral-400 dark:border-muted-foreground" />


                            <div className="flex flex-col gap-3">
                                <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-700">From The Admin Panel</p>
                                <p className="text-sm">
                                    Students Welfare Association, GCELT is a versatile organisation of Government College Of Engineering And Leather Technology. This Association is an emotion to all the GCELTIANS. In a 100 years college it&apos;s not easy to keep all the GCELTIANS under a single umbrella. But Students Welfare Association, GCELT has the ability to do it. Thats why we are launching this website to reunite the GCELTIANS under their own kingdom. We want to grow the melange of connections between us for the betterment of the college.
                                </p>
                                <p className="text-sm">
                                    So this is a small innitiative by the GCELTIANS & for the GCELTIANS. Register here and make your own profile and stay connected. Mind it Every GCELTIAN is a wealth for the college. We may reunite in every cultural or technical, or sports or any other programs.....but this website is a connector between alumni & Present Students. GCELT has now two international platform related to social work . Rotaract Club Of GCELT for the present GCELTIANS & Rotaract club of Calcutta Metro City for the Alumni of the institutions.
                                </p>
                                <p className="text-sm">
                                    We are in all domains. This is the power of all GCELTIANS. Students Welfare Association has completed its 10 years journey.. and more to go. Students Welfare Association is like a sun in the GCELT galaxy. Be there Enjoy the connection.
                                </p>
                                <span className="flex justify-center items-center">
                                    <blockquote className="relative flex justify-center items-center">
                                        <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-300 dark:text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
                                        </svg>

                                        <div className="relative z-10">
                                            <p className="text-gray-800 dark:text-white"><em>
                                                &quot;Four words we never tell lieRemain GCELTIANS till die&quot;
                                            </em></p>
                                        </div>
                                    </blockquote>
                                </span>
                                <ul className="font-black text-sm">
                                    <li>Mr. Pallab Nandi</li>
                                    <li>Mr. Arkadipta Mukherjee</li>
                                    <li>Miss Tithi Ghosh</li>
                                    <li>Mr. Souraprabha Ganguly</li>
                                    <li>Mr. Saptarshi Chatterjee</li>
                                </ul>
                            </div>
                            <div className="mt-10 flex flex-col gap-3">
                                <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-700">From the Union&apos;s Desk</p>
                                <p className="text-sm">
                                    গর্বের ১০ বছর
                                </p>
                                <p className="text-sm">
                                    Students&apos; Welfare Association
                                </p>
                                <p className="text-sm">
                                    The student body of any educational institute is one of the primary pillars of that institute. Thus every student body needs a platform through which they can voice their opinions, suggestions, complains and demands for their and their institute&apos;s betterment. And not only voicing their opinion, but a platform is also very essential for proper communication among the students, faculty and administration. In GCELT this platform is provided to the students in form of Students Welfare Association of GCELT, a non-profitable, apolitical welfare association, by the students of GCELT and for the students of GCELT.
                                </p>
                                <p className="text-sm">
                                    Students Association of GCELT is a government of West Bengal registered association, the Reg. No being- S/1L/74818 of 2010-2011 under West Bengal Act XXVI of 1961.
                                    10 college level clubs two district level and 1 International based club( RC GCELT) are running under the banner of Students Welfare Association
                                </p>
                                This Association organises
                                <ol style={{ listStyleType: 'decimal' }} className="text-sm flex flex-col gap-1 ml-5">
                                    <li>Freshers</li>
                                    <li>Technical Festival</li>
                                    <li>Cultural Festival</li>
                                    <li>Sports Festival</li>
                                    <li>Sarswati Puja</li>
                                    <li>Biswakarma Puja</li>
                                    <li>Farewell, every year.</li>
                                </ol>
                                <ul style={{ listStyleType: 'disc' }} className="font-bold text-sm">
                                    <li>And other Red letter days are celebrated with equal enthusiasm</li>
                                    <li>The association was founded on the same day of the year 2010 under the supervision of Founder President of Swa cum Ex Principal Of GCELT Dr Buddhadeb Chattopadhaya And incumbent vice president cum Registrar Mr. Roudrashis Hota.</li>
                                    <li>The first ever elected General secretary is SK Imran Hassan</li>
                                    <li>Please listen some spellbound words from the Founder President of Swa cum Ex Principal Dr Buddhadeb Chattopadhaya and Incumbent President of SWA cum officer in Charge Dr Sanjoy Chakraborty</li>
                                    <li>Hopefully the pandemic time will over and whole college will celebrate all the upcoming festivals with full of cherish and melange</li>
                                </ul>
                                <p className="font-black text-base">Stay Safe , Stay home.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Container>

            <FeatureSection
                heading="INTRODUCING  THE  PIONEERS  OF  SWA"
                description="VETERAN   PERSONALITY"
                subtitle="Here You get to know the history of SWA by the valueable speech of diginitaries"
                feature1={
                    <div className="tm-progress-label flex flex-col flex-wrap justify-center items-center text-sm">
                        <iframe width="400" height="200" src="https://www.youtube.com/embed/aXBl9W5NlSo?start=4" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <p>Dr. Sanjoy Chakraborty</p>
                        <p>President OF SWA,GCELT & Officer In-Charge, GCELT</p>
                    </div>
                }

                feature2={
                    <div className="tm-progress-label flex flex-col flex-wrap justify-center items-center text-sm">
                        <iframe width="400" height="200" src="https://www.youtube.com/embed/BdX_rWmr1oE?start=4" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <p>Dr. Buddhadeb Chattopadhyay</p>
                        <p>Founder President OF SWA,GCELT & EX PRINCIPAL OF GCELT</p>
                    </div>
                }
            />
        </ClientOnly>

    )
}

export default Home;