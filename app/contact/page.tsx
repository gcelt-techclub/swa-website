import Image from "next/image";
import { format } from "date-fns";


// Local imports
import prismadb from "@/lib/prismadb"

// Components
import Carousel from "@/app/components/Carousel";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import { ReviewList } from "@/app/contact/components/ReviewList";
import { columns } from "@/app/contact/components/columns";

//clients
import ReviewClient from "./reviewClient";

// actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getallReviews from "@/app/actions/getallReviews";



const ContactPage = async () => {
    const currentUser = await getCurrentUser();
    const allComplaint = await getallReviews();
    const ContactInfo = await prismadb.contactInfo.findFirst();
    
    const formattedReviews: any = allComplaint.map((item) => ({
        id: item.id,
        Name: item.Name,
        email: item.email,
        message: item.message,
        verified: item.verified,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));


    return (
        <ClientOnly>
            {/* Carousel */}
            <Carousel/>        

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
                {currentUser?.role === 'admin' &&
                    <div className="">
                        <ReviewList
                            columns={columns} data={formattedReviews}
                        />
                    </div>}
            </Container>
        </ClientOnly>
    )
}

export default ContactPage;