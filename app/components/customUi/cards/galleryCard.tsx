'use client';

//icons
import { HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import { Trash2 ,Pencil } from 'lucide-react';

// Global imports
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Image from "next/image";

// Local imports
import {
    SafeGallery,
    SafeUser
} from "@/app/types";
import getYear from "@/lib/getYear";

//Components
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter
} from "@/app/components/ui/card";



interface GalleryCardProps {
    data: SafeGallery;
    onAction?: (id: string, path: string) => void;
    onDeletion?: (id: string, path: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

const GalleryCard: React.FC<GalleryCardProps> = ({
    data,
    onAction,
    onDeletion,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {

    const [Year, Sem] = getYear(data?.Year)
    const [open, setOpen] = useState(false);
    const router = useRouter();


    const handleVerify = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }
            onAction?.(actionId, 'student')
        }, [disabled, onAction, actionId]);



    const handleDelete = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }
            onDeletion?.(actionId, 'student')
        }, [disabled, onDeletion, actionId]);


    //acronym of Name
    // let acronym = data?.Name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');

    return (
        <Card className="select-none w-full bg-neutral-100 dark:bg-slate-900 shadow-lg hover:-translate-y-4 transition">
            <CardContent className="mb-0 pb-0.5">
                <div className="w-full h-full border-black border-2">
                    <Image
                        onClick={() => router.push('/')}
                        className="xs:block  cursor-pointer w-full h-full"
                        src={data?.imageUrl}
                        height="500"
                        width="150"
                        alt="Logo"
                    />
                </div>
            </CardContent>
            <CardFooter className="relative mt-0">
                <div className="flex flex-col w-full overflow-hidden ">
                    <div className="font-bold ">
                        {data?.label}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <span className="bg-purple-200  dark:bg-slate-800 p-1  
                                            font-semibold rounded-md text-purple-600 dark:text-purple-300">
                            <HiOutlineClock size={14} />
                        </span>
                        <div className="font-light text-sm">
                            CreatedAt : {data?.Year}
                        </div>
                    </div>
                    <span className="flex flex-col absolute gap-2 right-3 ">
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={disabled}
                            onClick={() => router.push(data?.imageUrl)}
                        ><HiOutlineEye size={18} /></Button>
                        {currentUser?.role === 'admin' && <Button
                            variant="ghost"
                            size="icon"
                            disabled={disabled}
                            onClick={() => router.push(`/gallery/${data.id}`)}
                        ><Pencil size={18} /> Edit
                        </Button>
                        }
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}

export default GalleryCard;