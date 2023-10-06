'use client';

//icons
import { FiAtSign } from "react-icons/fi";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { HiBadgeCheck, HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Trash2, Pencil } from "lucide-react";


// Global imports
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Image from "next/image";

// Local imports
import {
    SafeUnionMember,
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
import { ConfirmationModal } from "@/app/components/modals/confirmationModal";



interface UnionBodyCardProps {
    data: SafeUnionMember;
    onAction?: (id: string, path: string) => void;
    onDeletion?: (id: string, path: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

const UnionBodyCard: React.FC<UnionBodyCardProps> = ({
    data,
    onAction,
    onDeletion,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {

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
                <div className="w-full h-full border-black border-2 mb-1">
                    <Image
                        onClick={() => router.push('/')}
                        className="xs:block  cursor-pointer w-full h-full"
                        src={data?.imageUrl}
                        height="500"
                        width="150"
                        alt="Logo"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full overflow-hidden ">
                    <div className="font-bold ">
                        {data?.gender === 'MALE' ? 'MR' : data?.gender === 'FEMALE' ? 'MISS' : ''} {data?.label}
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <span className="rounded-md text-green-600">
                            < VscVerifiedFilled size={18} />
                        </span>
                        <div className="text-sm">
                            {data?.role}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="relative mt-0">
                <div className="flex flex-col gap-2 w-full overflow-hidden ">
                    <div className="flex flex-row items-center gap-1">
                        <span className="bg-purple-200  dark:bg-slate-800 p-1  
                                            font-semibold rounded-md text-purple-600 dark:text-purple-300">
                            <HiOutlineClock size={14} />
                        </span>
                        <div className="font-light text-sm">
                            {data?.fromYear} - {data?.toYear}
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <span className="bg-purple-200 dark:bg-slate-800 p-1 
                                        font-semibold rounded-md text-purple-600 dark:text-purple-300">
                            <PiGraduationCapDuotone size={14} />
                        </span>
                        <div className="font-light text-sm">
                            Batch: {data?.batch}
                        </div>
                    </div>
                    <span className="absolute flex flex-col justify-end items-end  gap-2 right-3 ">
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
                            onClick={() => router.push(`/union/${data.id}`)}
                        ><Pencil size={18} /> Edit
                        </Button>
                        }
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}

export default UnionBodyCard;