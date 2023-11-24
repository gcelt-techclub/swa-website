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
import { GalleryPic } from "@prisma/client"

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

const categoryTags = ['college', 'students_batch', 'all_program'] as const;
type CategoryTags = typeof categoryTags[number];
// Formschema with zord validation
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
    Year: z.coerce.number().min(4).lte(currentYear),
    type: z.enum(categoryTags)
});

// Type Specification
type NewPictureFormValues = z.infer<typeof formSchema>

interface NewPictureFormProps {
    initialData: GalleryPic | null;
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
    const title = initialData ? 'Edit gallery uploads' : 'Upload New Photos';
    const description = initialData ? 'Edit Your Photos in gallery.' : 'Add a new photos to gallery';
    const toastMessage = initialData ? 'Gallery updated.' : 'Gallery created.';
    const action = initialData ? 'Save changes' : 'Create';

    const form = useForm<NewPictureFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: initialData?.label || '',
            imageUrl: initialData?.imageUrl || '',
            Year: initialData?.Year || currentYear,
            type: initialData?.type as CategoryTags
        }
    });

    // Upload new Billboard details 
    const onSubmit = async (data: NewPictureFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/galleryPic/${params.galleryPicId}`, data);
            } else {
                await axios.post(`/api/galleryPic`, data);
            }
            router.refresh();
            router.push(`/gallery`);
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
            await axios.delete(`/api/galleryPic/${params.galleryPicId}`);
            router.refresh();
            router.push(`/gallery`);
            toast.success('Picture deleted.');
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
                                    <FormLabel>Label *</FormLabel>
                                    <FormControl>
                                        <Input required disabled={loading} placeholder="Photo label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year *</FormLabel>
                                    <FormControl>
                                        <Input type='number' required disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Category *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" {...field} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categoryTags.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
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