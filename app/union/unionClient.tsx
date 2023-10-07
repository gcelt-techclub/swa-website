"use client";

//icons
import { Trash2, ImagePlus } from "lucide-react";

// Global imports
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// Local imports
import { SafeUnionMember, SafeUser } from "@/app/types";
//Components
import Container from "@/app/components/Container";
import { Button } from "@/app/components/ui/button";

//card component
import {
    Card,
    CardContent,
    CardFooter
} from "@/app/components/ui/card";
import UnionBodyCard from "@/app/components/customUi/cards/UnionBodyCard";


interface UnionClientProps {
    imgList: SafeUnionMember[] | any;
    currentUser?: SafeUser | null;
}

const UnionClient: React.FC<UnionClientProps> = ({
    imgList,
    currentUser,
}) => {
    const router = useRouter();
    const [VerifyId, setVerifyId] = useState("");

    const onVerify = useCallback(
        (id: string, path: string) => {
            setVerifyId(id);
            // Request
            axios
                .post(`/api/listings/${path}/${id}`)
                .then(() => {
                    toast.success("User Card Verfied Successfully");
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.statusText);
                    console.error(error);
                })
                .finally(() => {
                    setVerifyId("");
                });
        },
        [router]
    );


    const onDelete = useCallback(
        (id: string, path: string) => {
            setVerifyId(id);
            // Request
            axios
                .delete(`/api/listings/${path}/${id}`)
                .then(() => {
                    toast('User Card Deleted!', {
                        icon: <Trash2 />, style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#dc2626',
                        },
                    });
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.statusText);
                    console.error(error);
                })
                .finally(() => {
                    setVerifyId("");
                });
        },
        [router]
    );

    //Masonary Grid
    const MAX_COLUMNS = 5;

    function getColumns(colIndex: number) {
        return imgList.filter((resource:any, idx:any) => 
            idx%MAX_COLUMNS=== colIndex
        );
    }   


    return (
        <Container>

            <div className="mt-10
                    grid grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-2 
                    lg:grid-cols-3
                    xl:grid-cols-4
                    2xl:grid-cols-5
                    gap-8
                "
            >
                {currentUser?.role === 'admin' &&
                    <Card onClick={() => router.push(`/union/new`)}
                        className="select-none w-full h-64 bg-neutral-100 dark:bg-slate-900 shadow-lg hover:-translate-y-4 transition">
                        <CardContent className="mb-0 pb-0.5">
                            <div className="w-full h-full border-black dark:border-neutral-400 border-2 text-muted-background items-center">
                                <ImagePlus className="p-34 w-48 h-48" />
                            </div>
                        </CardContent>
                        <CardFooter className="relative mt-0">
                            <div className="flex flex-col w-full overflow-hidden ">
                                <div className="font-bold ">
                                    ADD NEW MEMBER
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    {/* <span className="bg-purple-200  dark:bg-slate-800 p-1  
                                            font-semibold rounded-md text-purple-600 dark:text-purple-300">
                                            <HiOutlineClock size={14} />
                                        </span>
                                        <div className="font-light text-sm">
                                            CreatedAt : {data?.fromYear}
                                        </div> */}
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                }


                {/* Masonry Grid */}
                {[
                    getColumns(0),
                    getColumns(1),
                    getColumns(2),
                    getColumns(3),
                    getColumns(4)
                ].map(column => <div key={column} className="flex flex-col gap-4">
                    {column.map((image: any) => (
                    <UnionBodyCard
                        key={image.id}
                        data={image}
                        // image={image}
                        actionId={image.id}
                        onAction={onVerify}
                        onDeletion={onDelete}
                        disabled={VerifyId === image.id}
                        actionLabel="Verify"
                        currentUser={currentUser}
                    />
                ))}

                </div>)}
            </div>

        </Container>
    );
};

export default UnionClient;