import { Link } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./navigation-menu.tsx"; // Adjust the path based on your project structure

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-6 bg-gray-200 border-b border-border">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/"
                                className={navigationMenuTriggerStyle()}
                            >
                                Home
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/createmovies"
                                className={navigationMenuTriggerStyle()}
                            >
                                Create Movie
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/movies"
                                className={navigationMenuTriggerStyle()}
                            >
                                All Movies
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/healthcheck"
                                className={navigationMenuTriggerStyle()}
                            >
                                Health Check
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    );
}
