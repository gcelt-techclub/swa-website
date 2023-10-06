
// Local imports
import prismadb from "@/lib/prismadb"

// Components
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import Heading from "@/app/components/ui/Heading";
//clients
import ReviewClient from "./reviewClient";

// actions
import getCurrentUser from "@/app/actions/getCurrentUser";




const ContactPage = async () => {
    const currentUser = await getCurrentUser();

    const ContactInfo = await prismadb.contactInfo.findFirst();
    // const safecontactInfo = {
    //     id : ContactInfo?.id.toString(),
    //     email: ContactInfo?.email.toString(),
    //     address: ContactInfo?.address.toString(),
    //     contactName1: ContactInfo?.contactName1.toString(),
    //     PhoneNum1: ContactInfo?.PhoneNum1.toString(),
    //     contactName2: ContactInfo?.contactName2.toString(),
    //     PhoneNum2: ContactInfo?.PhoneNum2.toString(),
    //     createdAt: ContactInfo?.createdAt.toISOString(),
    //     updatedAt: ContactInfo?.updatedAt.toISOString(),
    // };

    return (
        <ClientOnly>
            <div>
                <img className="w-full h-1/3 lg:h-[40rem] object-cover" src={"/images/assets/hero_img.jpg"} />
            </div>
            <div className={`bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950
            w-full pt-4 pb-2 px-10 transition-all delay-500 text-white flex flex-row`}>
                <Heading title="WELCOME" />
                <div className="w-1 ml-10 border-solid border-r-2 border-white"> </div>
                <div className="w-1 border-solid border-r-2 border-white"> </div>
            </div>

            <Container>
                <span className="mt-10 mb-10 flex flex-col justify-center items-center">
                    <p className="font-black text-4xl whitespace-pre p-3">CONTACT  US</p>
                    <hr className="w-full  border-t border-neutral-400 dark:border-muted-foreground" />
                </span>
                <ReviewClient currentUser={currentUser} info={ContactInfo} />

                <span className="flex justify-center items-center mt-5 mb-20">
                    <iframe
                        className='dark:invert-[84%]  dark:contrast-[.83]'
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14738.018615462393!2d88.4108622!3d22.5602212!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc178d80fd958e825!2sGovernment%20College%20of%20Engineering%20and%20Leather%20Technology!5e0!3m2!1sen!2sin!4v1606327720525!5m2!1sen!2sin"
                        width="400"
                        height="400"
                        frameBorder="0"
                        allow=''
                        aria-hidden="false"
                    />
                </span>
            </Container>
        </ClientOnly>
    )
}

export default ContactPage;