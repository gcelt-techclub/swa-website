import prismadb from "@/lib/prismadb";
import { YearList } from "@prisma/client";


async function getCategories() {
        // to find the all YearList
        // list for filter
        const categories = await prismadb.yearList.findMany();


        const safeUser =categories.map((category) => ({
            label: `${category.fromYear.toString()}-${category.toYear.toString().slice(-2)}`,
            value: `${category.fromYear.toString()}-${category.toYear.toString().slice(-2)}`
        }));
        return safeUser;
}


// Format the YearList
const categories = await getCategories();
export const formattedFilter = [...categories, {label:'all', value:'All'}];

export const SearchFilter = [
    {
        value: 'label',
        label: 'Label',
    },
    {
        value: 'gender',
        label: 'Gender',
    },
    {
        value: 'batch',
        label: 'Batch',
    },
    {
        value: 'role',
        label: 'Responsibility',
    },
];