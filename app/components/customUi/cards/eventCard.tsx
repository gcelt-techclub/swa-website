'use client';

//icons
import { HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Trash2, Pencil } from "lucide-react";


// Global imports
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Image from "next/image";

// Local imports
import {
    SafeEvent,
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
import { LinkDialog } from "@/app/components/modals/linkDialog";
import { ConfirmationModal } from "@/app/components/modals/confirmationModal";



interface EventCardProps {
    data: SafeEvent;
    onAction?: (id: string, path: string) => void;
    onDeletion?: (id: string, path: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

const EventCard: React.FC<EventCardProps> = ({
    data,
    onAction,
    onDeletion,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);


    const handleVerify = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }
            onAction?.(actionId, 'teacher')
        }, [disabled, onAction, actionId]);



    const handleDelete = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }
            onDeletion?.(actionId, 'teacher')
        }, [disabled, onDeletion, actionId]);



    return (
        <Card className="select-none w-full bg-neutral-100 dark:bg-slate-900 shadow-sm hover:-translate-y-4 transition">
            <CardContent className="mb-0 pb-0.5">
                <div className="flex flex-row items-center gap-2 w-full overflow-hidden text-2xl mb-2">
                    <div className="font-bold ">
                        {data?.label}
                    </div>
                    <div className="font-semibold text-cyan-900">
                        {data?.date}
                    </div>
                </div>
                <div className="border-amber-500 border-4">
                    <Image
                        onClick={() => router.push('/')}
                        src={data?.Featured}
                        height="700"
                        width="1000"
                        alt="Event"
                    />
                </div>
            </CardContent>
            <CardFooter className="relative mt-1">
                <div className="flex flex-col w-full overflow-hidden ">
                    <div className="font-semibold ">
                        {data?.Description}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <span className="bg-purple-200  dark:bg-slate-800 p-1  
                                            font-semibold rounded-md text-purple-600 dark:text-purple-300">
                            <HiOutlineClock size={14} />
                        </span>
                        <div className="font-light text-sm">
                            UpdatedAt : {data?.updatedAt}
                        </div>
                    </div>
                    <span className="absolute flex flex-col justify-end items-end gap-2 right-3 ">
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={disabled}
                            onClick={() => router.push(data?.Featured)}
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

export default EventCard;