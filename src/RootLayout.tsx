import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";

export function RootLayout() {
    return <div>
        <AppBar />
        <div>
            <Outlet />
        </div>
    </div>
}