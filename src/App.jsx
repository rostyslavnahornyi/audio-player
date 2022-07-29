import React from "react";
import { PrivateRoute } from "./Components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Home,
    Playlists,
    Profile,
    Queue,
    Tracks,
    Login,
    Register,
    Upload,
} from "./Pages";
import { history } from "./utils/history";
import PlaylistItem from "./Pages/PlaylistItem/PlaylistItem";

// history.listen(() => console.log(history.location))

const App = () => {
    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="queue" element={<Queue />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="tracks" element={<Tracks />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="playlists" element={<Playlists />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="playlists/:id" element={<PlaylistItem />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="upload" element={<Upload />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
