'use client';

//icons
import { Mail, PhoneCall, Facebook, Youtube } from "lucide-react";
import { FaMapMarkerAlt } from 'react-icons/fa'

// Global import 
import axios from "axios";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';

// types safety
import { SafeUser, SafeContactInfo } from "@/app/types";

//components
import { Input } from "@/app/components/ui/input";
import { Button } from '@/app/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/components/ui/form';
import { Textarea } from "@/app/components/ui/textarea";
import Heading from "@/app/components/ui/Heading";
import { Label } from "../components/ui/label";

const contactSchema = z.object({
    address: z.string().min(10), //.optional().transform(e => e === "" ? undefined : e) , // atleast 3 character is required to properly name our store
    email: z.string().email(),
    contactName1: z.string().min(3),
    PhoneNum1: z.coerce.number().optional(),
    contactName2: z.string().min(3),
    PhoneNum2: z.coerce.number().optional(),
});

const ReviewSchema = z.object({
    Name: z.string().min(3), //.optional().transform(e => e === "" ? undefined : e) , // atleast 3 character is required to properly name our store
    email: z.string().email(),
    message: z.string().min(10)
});

interface ReviewClientProps {
    info: SafeContactInfo | any | null;
    currentUser?: SafeUser | null;
}

const ReviewClient: React.FC<ReviewClientProps> = ({
    currentUser,
    info
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const contactForm = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            address: info?.address || "",
            email: info?.email || "",
            contactName1: info?.contactName1 || "",
            PhoneNum1: Number(info?.PhoneNum1) || 0,
            contactName2: info?.contactName2 || "",
            PhoneNum2: Number(info?.PhoneNum2) || 0
        },
    })

    const onAdminSubmit = async (data: z.infer<typeof contactSchema>) => {
        setIsLoading(true);

        await axios.patch('/api/contact', data)
            .then(() => {
                toast.success('Updated Successful!');
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
        // setIsLoading(false);
    }



    const reviewForm = useForm<z.infer<typeof ReviewSchema>>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: {
            Name: "",
            email: "",
            message: "",
        },
    })



    const onSubmit = async (data: z.infer<typeof ReviewSchema>) => {
        setIsLoading(true);

        await axios.post('/api/contact', data)
            .then(() => {
                toast.success('Your Review Means A Lot to Us!');
                router.refresh();
                reviewForm.reset();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
        setIsLoading(false);
    }

    return (

        <div className="max-w-screen-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-10 md:gap-10 mt-6">

                <div className="col-span-5 flex flex-col gap-3 mr-18 ">
                    <Form {...contactForm} >
                        <form onSubmit={contactForm.handleSubmit(onAdminSubmit)}>
                            <div className="flex flex-row justify-evenly">
                                <Heading
                                    title="OUR INFORMATIONS"
                                />
                                {currentUser?.role === 'admin' &&
                                    <Button className="w-1/3 rounded px-3 py-1.5 overflow-hidden group bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
                                        type="submit" disabled={isLoading} >
                                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease"></span>
                                        Update Details
                                    </Button>
                                }
                            </div>

                            <p className="ml-2 mb-2">
                                GOVERNMENT COLLEGE OF ENGINEERING AND LEATHER TECHNOLOGY
                            </p>
                            <FormField
                                control={contactForm.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="w-full flex flex-col mb-2">
                                        <FormLabel className="w-1/2 flex gap-2 items-center text-cyan-700 text-lg font-extrabold"><FaMapMarkerAlt size={22} />ADDRESS</FormLabel>
                                        <FormControl className="ml-4">
                                            {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                            <Input readOnly={currentUser?.role !== 'admin'} mode={`${currentUser?.role === 'admin' ? 'default' : 'readOnlyMode'}`}
                                                type="text" placeholder="Your Address here" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={contactForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full flex flex-col mb-2">
                                        <FormLabel className="w-1/2 flex gap-2 items-center text-cyan-700 text-lg font-extrabold"><Mail size={18} />EMAIL ID</FormLabel>
                                        <FormControl className="ml-4">
                                            {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                            <Input readOnly={currentUser?.role !== 'admin'} mode={`${currentUser?.role === 'admin' ? 'default' : 'readOnlyMode'}`}
                                                type="email" placeholder="johndoe@email.com" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <span className="flex flex-col gap-2">
                                <Label className="w-1/2 flex gap-2 items-center text-cyan-700 text-lg font-extrabold"><PhoneCall size={18} />PHONE</Label>
                                <div className="flex flex-row gap-2">
                                    <FormField
                                        control={contactForm.control}
                                        name="contactName1"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormControl className="ml-4">
                                                    {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                    <Input readOnly={currentUser?.role !== 'admin'} mode={`${currentUser?.role === 'admin' ? 'default' : 'readOnlyMode'}`}
                                                        type="text" placeholder="Contact Name 1" {...field} disabled={isLoading} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={contactForm.control}
                                        name="PhoneNum1"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormControl className="ml-4">
                                                    {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                    <Input readOnly={currentUser?.role !== 'admin'} mode={`${currentUser?.role === 'admin' ? 'default' : 'readOnlyMode'}`}
                                                        type="number" {...field} disabled={isLoading} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <FormField
                                        control={contactForm.control}
                                        name="contactName2"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormControl className="ml-4">
                                                    {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                    <Input readOnly={currentUser?.role !== 'admin'} mode={`${currentUser?.role === 'admin' ? 'default' : 'readOnlyMode'}`}
                                                        type="text" placeholder="Contact Name 2" {...field} disabled={isLoading} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={contactForm.control}
                                        name="PhoneNum2"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormControl className="ml-4">
                                                    {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                    <Input readOnly={currentUser?.role !== 'admin'} mode={`${currentUser?.role === 'admin' ? 'default' : 'readOnlyMode'}`}
                                                        type="number" {...field} disabled={isLoading} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </span>

                        </form>
                    </Form>
                </div>
                {/* End of Our Information Part */}


                <div className="order-first mb-10 md:order-last md:col-span-5 ">
                    <Form {...reviewForm} >
                        <form className="" onSubmit={reviewForm.handleSubmit(onSubmit)}>
                            {/* Div for Leave a Review Section */}
                            <div className="flex flex-col gap-2">
                                <Heading
                                    title="LEAVE A REVIEW "
                                />
                                <FormField
                                    control={reviewForm.control}
                                    name="Name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex gap-3 items-center">Name *</FormLabel>
                                            <FormControl>
                                                {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                <Input type="text" placeholder="Name" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={reviewForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex gap-3 items-center">Email *</FormLabel>
                                            <FormControl>
                                                {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                <Input type="email" placeholder="johndoe@email.com" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={reviewForm.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex gap-3 items-center">Message *</FormLabel>
                                            <FormControl>
                                                {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                <Textarea placeholder="Type your message here."  {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full rounded px-5 py-2.5 overflow-hidden group bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
                                    type="submit" disabled={isLoading} >
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease"></span>
                                    Submit Review
                                </Button>
                            </div>
                        </form>
                    </Form>

                </div>

                {/*  End of Profile Section */}
            </div>
        </div>
    );
}

export default ReviewClient;