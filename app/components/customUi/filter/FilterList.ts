// import { getCategories } from "@/app/actions/getUnionMembers";

// let categoryList: { label: string; value: string }[] = [];

// // Function to load and modify category list
// async function loadCategoryList() {
//     categoryList = await getCategories();
//     categoryList.push({ label: 'all', value: 'All' });
// }
  
// loadCategoryList();
// export {categoryList};

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