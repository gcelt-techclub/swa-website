// Global imports
import { Nunito } from "next/font/google";

// local imports
import './globals.css'
import ClientOnly from '@/app/components/ClientOnly'
import { ModalProvider } from '@/providers/modalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import Navbar from "@/app/components/navbar";
import AuthContextProvider from '@/providers/AuthContextProvider'

// services
import getCurrentUser from "@/app/actions/getCurrentUser"
import Feedback from "./components/Feedback";
import Footer from "./components/footer";
import prismadb from "@/lib/prismadb";



export const metadata = {
    title: "Student Portal",
    description: "In card format Students Information are kept",
};
const font = Nunito({
    subsets: ["latin-ext","cyrillic"],
});


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    const ContactInfo = await prismadb.contactInfo.findFirst();
    return (
        <AuthContextProvider>
            <html lang="en">
                <body className={font.className}>
                    <ClientOnly>
                        <ToasterProvider />
                        <ModalProvider />
                        <Navbar currentUser={currentUser} />
                        <Feedback/>
                    </ClientOnly>
                    <div className="pt-28">{children}</div>
                    {/* <Footer/> */}
                    <ClientOnly>
                        <Footer contactInfo={ContactInfo}/>
                    </ClientOnly>
                </body>
            </html >
        </AuthContextProvider>
    )
}
