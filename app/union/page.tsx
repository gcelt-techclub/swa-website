export const dynamic = 'force-dynamic'

// import { format } from "date-fns";
// import Category List
import Filter from "@/app/components/customUi/filter/Filter";
import Image from "next/image";

// Local imports
import Carousel from "@/app/components/Carousel";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";

//acyions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUnionMembers, { getCategories, MemberListingsParams } from "@/app/actions/getUnionMembers";

import UnionClient from "./unionClient";



interface VerifyProps {
    searchParams: MemberListingsParams
};

const UnionPage = async ({ searchParams }: VerifyProps) => {
    const currentUser = await getCurrentUser();
    const pictures = await getUnionMembers(searchParams);
    let categoryList = await getCategories();
    categoryList.push({ label: 'All', valuefrom: 2011 , valueTo:2023});

    const newList = categoryList;

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
            {/* Carousel */}
            <Carousel/>

            <Container>
                <span className="mt-10 mb-10 flex flex-col justify-center items-center">
                    <p className="font-black text-4xl whitespace-pre p-3">SWA  UNION  MEMBERS</p>
                    <hr className="w-full  border-t border-neutral-400 dark:border-muted-foreground" />
                    {/* <Filter/> */}
                    <Filter categoryList={newList} />
                </span>

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