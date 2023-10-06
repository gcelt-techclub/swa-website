"use client"

//icons
import { Trash } from "lucide-react"
// Global imports
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { UnionMembers } from "@prisma/client"

// Local imports
//components
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form"
import { Separator } from "@/app/components/ui/separator"
import Heading from "@/app/components/ui/Heading"
import { ConfirmationModal } from "@/app/components/modals/confirmationModal"
import ImageUpload from "@/app/components/modals/sqImageUpload"



const currentYear = Number(new Date().getFullYear());

const roleTags = ['GENERAL SECRETARY',
    'ASST. GENERAL SECRETARY',
    'GOVERNING BODY(REP)',
    'TREASURER',
    'ASST. TREASURER',
    'TECHNICAL HEAD',
    'ACADEMICS SECRETARY',
    'ASST. ACADEMICS SECRETARY',
    'ASST. TECHNICAL HEAD',
    'CULTURAL SECRETARY',
    'ASST. CULTURAL SECRETARY',
    'GAMES SECRETARY',
    'ASST. GAMES SECRETARY',
    'ESTABLISHMENT SECRETARY',
    'HOSTEL AFFAIRS SECRETARY',
    'CLUB ADMINISTRATION',
    'CLASS REPRESENTATIVE',

] as const;
type RoleTags = typeof roleTags[number];

const genderType = ['MALE', 'FEMALE', 'OTHER'] as const;
type GenderType = typeof genderType[number];




// Formschema with zord validation
const formSchema = z.object({
    label: z.string().min(1),
    gender: z.enum(genderType),
    imageUrl: z.string().min(1),
    FromYear: z.coerce.number().min(4).lte(currentYear),
    ToYear: z.coerce.number().min(4).lte(currentYear + 1),
    batch: z.string().min(9),
    role: z.enum(roleTags)
});

// Type Specification
type NewPictureFormValues = z.infer<typeof formSchema>

interface NewPictureFormProps {
    initialData: UnionMembers | null;
};

export const NewPictureForm: React.FC<NewPictureFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    //State to handle dialog box openning of delete and loading after submission
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Some toggler variales between new billboard creation or existing billboard updation mode
    const title = initialData ? 'Edit Member uploads' : 'Add New Union Member';
    const description = initialData ? 'Edit members Photos in Union Members Page.' : 'Add a new photos and Details to Union Member Page';
    const toastMessage = initialData ? 'Existing Member updated.' : 'New Member created.';
    const action = initialData ? 'Save changes' : 'Create';

    const form = useForm<NewPictureFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: initialData?.label || '',
            gender: initialData?.gender as GenderType,
            imageUrl: initialData?.imageUrl || '',
            FromYear: initialData?.fromYear || currentYear,
            ToYear: initialData?.toYear || currentYear + 1,
            batch: initialData?.batch || '',
            role: initialData?.role as RoleTags
        }
    });

    // Upload new Billboard details 
    const onSubmit = async (data: NewPictureFormValues) => {
        try {
            setLoading(true);
            console.log(data);
            if (initialData) {
                await axios.patch(`/api/union/${params.memberPicId}`, data);
            } else {
                await axios.post(`/api/union`, data);
            }
            router.refresh();
            router.push(`/union`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };


    // Deletion of existing billboard
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/union/${params.memberPicId}`);
            router.refresh();
            router.push(`/union`);
            toast.success('Union Member deleted.');
        } catch (error: any) {
            toast.error('Make sure you removed all categories using this billboard first.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <ConfirmationModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} subtitle={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Member Name *</FormLabel>
                                    <FormControl>
                                        <Input type='text' required disabled={loading} placeholder="Photo label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="batch"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Batch *</FormLabel>
                                    <FormControl>
                                        <Input type='text' required disabled={loading} placeholder="(Year - Year+4)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Gender *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" {...field} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {genderType.map((gender) => (
                                                <SelectItem key={gender} value={gender}>
                                                    {gender}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="FromYear"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>From Year *</FormLabel>
                                    <FormControl>
                                        <Input type='number' required disabled={loading} placeholder="From Year" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ToYear"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>To Year *</FormLabel>
                                    <FormControl>
                                        <Input type='number' required disabled={loading} placeholder="To Year" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Responsibility *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" {...field} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {roleTags.map((role) => (
                                                <SelectItem key={role} value={role}>
                                                    {role}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="rounded px-5 py-2.5 overflow-hidden group bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
                        type="submit" disabled={loading} >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 group-hover:-translate-x-96 ease"></span>
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};