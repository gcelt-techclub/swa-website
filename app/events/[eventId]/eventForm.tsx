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
import { Event, Image } from "@prisma/client"

// Local imports
//components
import { Avatar, AvatarImage} from "@/app/components/ui/avatar";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import Heading from "@/app/components/ui/Heading";
import { ConfirmationModal } from "@/app/components/modals/confirmationModal";
import ImageUpload from "@/app/components/modals/sqImageUpload";
import { Textarea } from "@/app/components/ui/textarea"


// Formschema with zord validation
const formSchema = z.object({
    label: z.string().min(1),
    images: z.object({ url: z.string().url() }).array(),
    date: z.string().min(3),
    Description: z.string().min(1),
    Featured: z.string().url().optional(),
    // isArchived: z.boolean().default(false).optional(),
});

// Type Specification
type EventFormValues = z.infer<typeof formSchema>

interface EventFormProps {
    initialData: Event & {
        image: Image[]
    } | null | any;
};

export const EventForm: React.FC<EventFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();

    //State to handle dialog box openning of delete and loading after submission
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Some toggler variales between new Event creation or existing Event updation mode
    const title = initialData ? 'Edit Event' : 'Create Event';
    const description = initialData ? 'Edit a Event.' : 'Add a new Event';
    const toastMessage = initialData ? 'Event updated.' : 'Event created.';
    const action = initialData ? 'Save changes' : 'Create';

    const form = useForm<EventFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData
        } : {
            label: '',
            images: [],
            date: '',
            Description: '',
            Featured: '',
        }
    });

    // Upload new Products details 
    const onSubmit = async (data: EventFormValues) => {
        try {
            setLoading(true);
            console.log(data)
            if (initialData) {
                await axios.patch(`/api/events/${params.eventId}`, data);
            } else {
                await axios.post(`/api/events`, data);
            }
            router.refresh();
            router.push(`/events`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };


    // Deletion of existing product
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/events/${params.eventId}`);
            router.refresh();
            router.push(`/events`);
            toast.success('Event deleted.');
        } catch (error: any) {
            toast.error('Something Went Wrong!');
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
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value.map((image) => image.url)} // as this field is a array
                                        disabled={loading}
                                        onChange={(url) => field.onChange([...field.value, { url }])} // add image along side with other images
                                        onRemove={(url) => field.onChange([...field.value.filter((currentImg) => currentImg.url !== url)])} //currentImg.url !== url  only remove particular image not all
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
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={loading} placeholder="Event Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={loading} placeholder="1st January or Name of Event" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Featured"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Featured Photo</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {form.getValues('images').map((image) => (
                                                <SelectItem key={image.url} value={image.url}>
                                                    {/* <Avatar className="w-24 h-24 aspect-square">
                                                        <AvatarImage src={image.url} />
                                                    </Avatar> */}
                                                    {image.url}
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
                            name="Description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your message here."  {...field} disabled={loading} />
                                    </FormControl>
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