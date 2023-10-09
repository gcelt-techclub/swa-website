'use client';

//icons
import { ShieldQuestion, Frown, ThumbsUp } from "lucide-react";


// Global import 
import axios from "axios";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';

// types safety
import { SafeUser } from "@/app/types";

//hooks
import { useRegisterModal } from "@/hooks/useRegisterModal";

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


const ComplaintSchema = z.object({
    Name: z.string().min(10), //.optional().transform(e => e === "" ? undefined : e) , // atleast 3 character is required to properly name our store
    Complaint: z.string().min(3),
    Feedback: z.string().min(3),
    PhoneNum2: z.coerce.number().optional(),
});

interface studentClientProps {
    currentUser?: SafeUser | null;
}

const StudentClient: React.FC<studentClientProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isFormAcceptingResponse, setIsFormAcceptingResponse] = useState(true);
    const [coolDownRemainingTime, setCoolDownRemainingTime] = useState(-1);
    let timer: any;

    const complaintForm = useForm<z.infer<typeof ComplaintSchema>>({
        resolver: zodResolver(ComplaintSchema),
        defaultValues: {
            Name: "Anonymous User",
            Complaint: "",
            Feedback: "",
            PhoneNum2: 0
        },
    })

    const onSubmit = async (data: z.infer<typeof ComplaintSchema>) => {
        setIsLoading(true);
        console.log(data);

        await axios.post('/api/complaint', data)
            .then(() => {
                toast.success('Complaint Registered Successful!');
                router.refresh();
                complaintForm.reset();
                setIsFormAcceptingResponse(false);
                setCoolDownRemainingTime(60);
                
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);

            })
        // setIsLoading(false);
    }

    useEffect(() => {
        // console.log(coolDownRemainingTime);
        // if(coolDownRemainingTime === 60){
        //     timer = setInterval(() => {setCoolDownRemainingTime((initState) => { return initState-1;}); 
        //         // console.log('We hit setInterval');
        //     }, 1000);
        // }
        // if (coolDownRemainingTime === 0) {
        //     clearInterval(timer);            
        //     setIsFormAcceptingResponse(true);
        // }
        if (coolDownRemainingTime > 0) {
            const timer = setInterval(() => {
              setCoolDownRemainingTime((prevState) => prevState - 1);
            }, 1000);
        
            return () => {
              clearInterval(timer);
            };
          } else if (coolDownRemainingTime === 0) {
            setIsFormAcceptingResponse(true);
          }
    }, [coolDownRemainingTime])


    return (

        <div className="max-w-screen-lg mx-auto flex flex-col gap-5 justify-center items-center">
            <div className="text-lg  flex flex-row gap-5 justify-center items-center">
                <Button className="w-fit rounded px-10 py-1.5 overflow-hidden group bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
                    onClick={() => registerModal.onOpen('LOGIN')}  >
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    STUDENT LOGIN
                </Button>
                <Button className="w-fit rounded px-10 py-1.5 overflow-hidden group bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
                    onClick={() => registerModal.onOpen('REGISTER')}  >
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    STUDENT REGISTER
                </Button>
            </div>


            <div className="col-span-5 flex flex-col gap-3 mt-10 lg:mt-20 ">
                <Form {...complaintForm} >
                    <form onSubmit={complaintForm.handleSubmit(onSubmit)}>
                        <p className="mx-auto text-3xl font-black">
                            COMPLAINT  / GRIEVANCE
                        </p>
                        <p className="mx-auto mb-7">
                            If Students have any Complaint against the System
                        </p>

                        <FormField
                            control={complaintForm.control}
                            name="Name"
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col mb-2">
                                    <FormLabel className="w-1/2 flex gap-2 items-center text-cyan-700 text-lg font-extrabold"><ShieldQuestion size={22} />NAME</FormLabel>
                                    <FormControl >
                                        {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                        <Input readOnly={currentUser?.role !== 'admin'} mode={`${currentUser?.role === 'admin' ? 'default' : 'readOnlyMode'}`}
                                            type="text" placeholder="Your Address here" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={complaintForm.control}
                            name="Complaint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="w-1/2 flex gap-2 items-center text-cyan-700 text-lg font-extrabold"><Frown size={22} />Complaint</FormLabel>
                                    <FormControl>
                                        {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                        <Textarea placeholder="Type your message here."  {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={complaintForm.control}
                            name="Feedback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="w-1/2 flex gap-2 items-center text-cyan-700 text-lg font-extrabold"><ThumbsUp size={22} />Feedback</FormLabel>
                                    <FormControl>
                                        {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                        <Textarea placeholder="Type your message here."  {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {!isFormAcceptingResponse && <>
                            <p className="mt-3 text-amber-500">You have reached the Message CoolDown Time</p>
                            <p className="text-cyan-900">Waiting Time: {coolDownRemainingTime}</p>
                        </>
                        }

                        <Button className="mt-5 w-full rounded px-3 py-1.5 overflow-hidden group bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
                            type="submit" disabled={!(isLoading === false && isFormAcceptingResponse === true)} >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease"></span>
                            SUBMIT COMPLAINT
                        </Button>
                    </form>
                </Form>
                {/* End of Our Information Part */}
            </div>
        </div>
    );
}

export default StudentClient;