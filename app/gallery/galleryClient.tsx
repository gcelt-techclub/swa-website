"use client";

//icons
import { Trash2, Plus } from "lucide-react";

// Global imports
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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

    const College = imgList.filter((image: any) => { return (image.type === "college") });
    const Students_batch = imgList.filter((image: any) => { return (image.type === "students_batch") });
    const All_program = imgList.filter((image: any) => { return (image.type === "all_program") });

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
                    <ResponsiveMasonry
                        className="mt-10"
                        columnsCountBreakPoints={{ 50:1, 640: 2, 1024: 3, 1280: 4, 1536: 5 }}
                    >
                        <Masonry gutter="2rem">
                            {College.map((image: any) => (
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
                        </Masonry>
                    </ResponsiveMasonry>
                </TabsContent>


                <TabsContent value="students_batch">
                    {/* <div
                        className="mt-10
                            grid grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-2 
                            lg:grid-cols-3
                            xl:grid-cols-4
                            2xl:grid-cols-4
                            gap-8
                        "
                    > */}
                    <ResponsiveMasonry
                        className="mt-10"
                        columnsCountBreakPoints={{ 50:1, 640: 2, 1024: 3, 1280: 4, 1536: 5  }}
                    >
                        <Masonry gutter="2rem">
                            {Students_batch.map((image: any) => (
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
                        </Masonry>
                    </ResponsiveMasonry>
                </TabsContent>


                <TabsContent value="all_program">
                    <div
                        className="mt-10
                            grid grid-cols-1  
                            md:grid-cols-2 
                            gap-6
                            "
                    >
                        {All_program.map((image: any) => (
                                image.type === 'all_program' && (
                                <div  key={image.id} className="w-full">
                                <iframe
                                    width="900"
                                    height="500"
                                    src={image.imageUrl}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                                </div>
                            )
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </Container>
    );
};

export default GalleryClient;