"use client"

//icons
import { MdAlternateEmail, MdOutlineCalendarMonth } from "react-icons/md";

// Global imports
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

// Local imports
import { DataTableColumnHeader } from "@/app/components/customUi/dataTable/data-table-column-header";
import { DataTableRowActions } from "@/app/components/customUi/dataTable/data-table-row-actions";

//types
import {SafeComplaint } from "@/app/types";

// Components
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

// We need to specify Coloumns name and also specify how rows renders
export const columns: ColumnDef<SafeComplaint>[] = [
    // checkbox
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // created At 
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="created At" />
        ),
        cell: ({ row }) => {
            return (
                <div className="max-w-64 flex items-center">
                    <MdOutlineCalendarMonth className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>{row.getValue("createdAt")}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

    // Complaint
    {
        accessorKey: "Complaint",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Complaint" />
        ),
        cell: ({ row }) => {
            return (
                <span className="font-medium flex flex-wrap">
                    {row.getValue("Complaint")}
                </span>
            )
        },
    },

    // Feedback
    {
        accessorKey: "Feedback",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Feedback" />
        ),
        cell: ({ row }) => {
            return (
                <span className="font-medium flex flex-wrap">
                    {row.getValue("Feedback")}
                </span>
            )
        },
    },



    // Roles Button 
    {
        id:"Verified",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Verified" />
        ),
        cell: Cell,
        enableSorting: false,
        enableHiding: false,
    },

    // actions
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]

function Cell({ row }: any) {
    const complaint = row.original
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const onAssign = useCallback(
        (id: string, verify: boolean) => {
            setIsLoading(true);
            const data = { verify };
            // Request
            axios
                .patch(`/api/complaint/${id}`, data)
                .then(() => {
                    toast.success("Complaint Verified Successfully");
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.statusText);
                    console.error(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [router]
    );



    return (
        <div className="col-span-3 flex flex-row gap-0 text-base">
            <Button
                disabled={isLoading}
                variant={`${complaint.Verified === false ? "default" : "outline"}`}
                className={`${complaint.Verified === false ? "bg-cyan-800 dark:text-white" : "bg-transparent"}
                    rounded-l-full hover:bg-cyan-800 hover:border-cyan-900`}
                size="sm"
                onClick={() => onAssign(complaint.id, false)}
            >Not Verified</Button>
            <Button
                disabled={isLoading}
                variant={`${complaint.Verified === true ? "default" : "outline"}`}
                className={`${complaint.Verified === true ? "bg-cyan-800 dark:text-white" : "bg-transparent"}
                    rounded-r-full hover:bg-cyan-800 hover:border-cyan-900`}
                size="sm"
                onClick={() => onAssign(complaint.id, true)}
            >{complaint.Verified}</Button>
        </div>
    )
}

