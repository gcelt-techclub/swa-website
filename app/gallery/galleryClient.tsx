"use client";

//icons
import { Trash2, Plus } from "lucide-react";

// Global imports
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// Local imports
import { SafeStudent, SafeUser } from "@/app/types";
//Components
import Container from "@/app/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";

//card component
import GalleryCard from "@/app/components/customUi/cards/galleryCard";
import FacultyCard from "@/app/components/customUi/cards/eventCard";
import AlumniCard from "@/app/components/customUi/cards/UnionBodyCard";






interface GalleryClientProps {
    imgList: SafeStudent[] | any;
    currentUser?: SafeUser | null;
}

const GalleryClient: React.FC<GalleryClientProps> = ({
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
    const MAX_COLUMNS = 4;

    function getColumns(colIndex: number) {
        return imgList.filter((resource: any, idx: any) =>
            idx % MAX_COLUMNS === colIndex
        );
    }



    return (
        <Container>
            <Tabs defaultValue="college">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="college">COLLEGE</TabsTrigger>
                        <TabsTrigger value="students_batch">STUDENTS &apos; BATCH</TabsTrigger>
                        <TabsTrigger value="all_program">ALL PROGRAM</TabsTrigger>
                    </TabsList>
                    {currentUser?.role === 'admin' &&
                        <Button variant='outline' onClick={() => router.push(`/gallery/new`)}>  {/*64eced1e3dd9f06e8fbd836a */}
                            <Plus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    }
                </div>
                <Separator />


                <TabsContent value="college">
                    <div
                        className="mt-10
                            grid grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-2 
                            lg:grid-cols-3
                            xl:grid-cols-4
                            2xl:grid-cols-5
                            gap-8
                        "
                    >
                        {imgList.map((image: any) => (
                            image.type === 'college' && (
                                <GalleryCard
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
                            )

                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="students_batch">
                    <div
                        className="mt-10
                            grid grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-2 
                            lg:grid-cols-3
                            xl:grid-cols-4
                            2xl:grid-cols-4
                            gap-8
                        "
                    >
                        {/* Masonry Grid */}
                        {[
                            getColumns(0),
                            getColumns(1),
                            getColumns(2),
                            getColumns(3)
                        ].map(column => <div key={column} className="flex flex-col gap-4">
                            {column.map((image: any) => (
                                image.type === 'students_batch' && (
                                    <GalleryCard
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
                                )

                            ))}
                        </div>)}
                    </div>
                </TabsContent>
                <TabsContent value="all_program">
                    <div
                        className="mt-10
                            grid grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-3 
                            lg:grid-cols-3
                            2xl:grid-cols-4
                            gap-6
                            "
                    >
                        {imgList.map((user: any) => (
                            user.role === 'faculty' && (
                                <FacultyCard
                                    key={user.id}
                                    data={user}
                                    // user={user}
                                    actionId={user.id}
                                    onAction={onVerify}
                                    onDeletion={onDelete}
                                    disabled={VerifyId === user.id}
                                    actionLabel="Verify"
                                    currentUser={currentUser}
                                />
                            )
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </Container>
    );
};

export default GalleryClient;