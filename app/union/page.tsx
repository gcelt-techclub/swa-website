// import { format } from "date-fns";

import Image from "next/image";
// const BillboardsPage = async ({
//     params
// }: {
//     params: { storeId: string }
// }) => {

// Local imports
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/ui/Heading";
import Container from "@/app/components/Container";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getUnionMembers , { MemberListingsParams } from "@/app/actions/getUnionMembers";

import UnionClient from "./unionClient";



interface VerifyProps {
    searchParams: MemberListingsParams
};

const UnionPage = async ({ searchParams }: VerifyProps) => {
    const currentUser = await getCurrentUser();
    const pictures = await getUnionMembers(searchParams);

    if (pictures.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Photos found"
                    subtitle="Looks like No Photos Uploaded recently."
                />
            </ClientOnly>
        );
    }

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
                <span className="mt-10 mb-10 flex flex-col justify-center items-center">
                    <p className="font-black text-4xl whitespace-pre p-3">SWA  UNION  MEMBERS</p>
                    <hr className="w-full  border-t border-neutral-400 dark:border-muted-foreground" />
                </span>
                {/* <Filter/> */}
                <UnionClient
                    imgList={pictures}
                    currentUser={currentUser}
                />
            </Container>
            <br className="mb-10" />
        </ClientOnly>
    );
}

export default UnionPage;