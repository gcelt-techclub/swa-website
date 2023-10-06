//Global imports
import { redirect } from "next/navigation";

// Local imports
import { SafeUser } from "@/app/types";

//components
import ScrollingNavbar from "./customUi/navbar/scrollingNavbar";


interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = async ({
    currentUser,
}) => {
    

    return (
            <ScrollingNavbar currentUser={currentUser} />
    )
}
export default Navbar;