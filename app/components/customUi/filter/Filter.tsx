"use client";

// import Category List
import { SearchFilter } from "./FilterList"

// icons
import { BsSliders } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Check } from "lucide-react";

// Global imports
import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import qs from 'query-string';

//Local imports
import Container from "@/app/components/Container";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/app/components/ui/command";
//libs
import getYear from "@/lib/getYear";
import { cn } from "@/lib/utils";

interface FilterProps {
    categoryList: any;
}

const Filter: React.FC<FilterProps> = ({
    categoryList
}) => {
    const router = useRouter();
    // Holds the default path name
    const params = useSearchParams();
    const pathname = usePathname();

    // Category Search 
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");


    const handleClick = useCallback((From: string, To:string) => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            fromYear: From,
            ToYear: To
        }

        if (params?.get('fromYear') === From || params?.get('ToYear') === To) {
            delete updatedQuery.fromYear;
            delete updatedQuery.ToYear;
        }

        const url = qs.stringifyUrl({
            url: '/union/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [router, params]);




    const [inputValue, setInputValue] = useState<string>("");
    const [filterValue, setfilterValue] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>("");
    const [mounted, setMounted] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    //Below functions says if there is debouncedvalue then set Params and if no deboundcedValue then delete params
    const handleSearchParams = useCallback(
        (debouncedValue: string) => {
            let params = new URLSearchParams(window.location.search);
            if (debouncedValue.length > 0) {
                params.set(filterValue, debouncedValue);
            } else {
                params.delete(filterValue);
            }
            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`);
            });
        },
        [pathname, router, filterValue]
    );

    // EFFECT: Set Initial Params `${filterValue}`
    // When Someone Share the link , we need to save the params and save it as input value
    // The whole thing is two way connection: set params with search keyword
    // and then set search key word with search param value
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.forEach((value, key) => {
            console.log(value, key);
            if (SearchFilter.includes({ label: key, value: key })) {
                const searchQuery = params.get(key) ?? "";
                setfilterValue(key);
                setInputValue(searchQuery);
            }
        });
    }, []); // Pass this empty string so that we can run it once for intital stage only
    // when we mounting a component

    // EFFECT: Set Mounted
    //To check whether have debounced value and if mounted component or not , if not then setmounted as true
    useEffect(() => {
        if (debouncedValue.length > 0 && !mounted) {
            setMounted(true);
        }
    }, [debouncedValue, mounted]);

    // EFFECT: Debounce Input Value
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [inputValue]);

    // EFFECT: Search Params
    //if have mounted value true then only run search handlesearchParams
    useEffect(() => {
        if (mounted) handleSearchParams(debouncedValue);
    }, [debouncedValue, handleSearchParams, mounted]);



    return (
        <Container>
            <div className="pt-2 flex flex-row justify-between overflow-x-auto">
                {/* Mapping the yearwise categories  */}
                <div className="flex flex-row flex-wrap gap-2">
                    {categoryList.map((item: { label: string, valueFrom: string, valueTo:string }) => (
                        <div key={item.label}
                            onClick={() => handleClick(item.valueFrom , item.valueTo)}
                            className={`cursor-pointer
                            inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md                             
                        `}
                        //${Year === item.label ? 'border-b-neutral-800  dark:border-b-neutral-200' : 'border-transparent'}
                        //${Year === item.label ? 'text-neutral-800 dark:text-neutral-100' : 'text-neutral-500'}
                        >
                            <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">{item.label}</div>
                        </div>
                    ))}
                </div>
                {/* Search Bar */}
                <div className="w-full md:w-1/2 flex flex-row items-center relative z-100">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline" role="combobox" aria-expanded={open}
                                className="w-[200px] justify-between rounded-l-full"
                            >
                                {value
                                    ? SearchFilter.find((filter) => filter.value === value)?.label
                                    : "Select Filter..."}
                                <BsSliders className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search with Filter..." />
                                <CommandEmpty>No filter found.</CommandEmpty>
                                <CommandGroup heading="All">
                                    {SearchFilter.map((filter) => (
                                        <CommandItem
                                            key={filter.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setfilterValue(filter.label)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check className={cn("mr-2 h-4 w-4", value === filter.value ? "opacity-100" : "opacity-0")} />
                                            {filter.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Input id="Search bar"
                        placeholder="Search Here"
                        type="search"
                        value={inputValue}
                        onChange={(e) => { setInputValue(e.target.value); }}
                        className="rounded-r-full"
                    />

                </div>
            </div>
        </Container>
    )
}


export default Filter;