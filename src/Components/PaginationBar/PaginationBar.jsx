import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LIMIT, ROUTES } from "../../utils/constants";
import {
    actionGetPlaylistsCount,
    actionPlaylistPageChange,
} from "../../redux/actions/creators/playlists";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const PaginationBar = ({ currentPage, count }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch(actionGetPlaylistsCount());

        const currPage = +searchParams.get("page") || currentPage;
        dispatch(actionPlaylistPageChange(currPage));
    }, []);

    const changeHandler = (e, page) => {
        navigate(`${ROUTES.PLAYLISTS}?page=${page}`);
        dispatch(actionPlaylistPageChange(page));
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ alignSelf: "center" }}>
                <Pagination
                    page={currentPage}
                    count={Math.ceil(count / LIMIT.PLAYLISTS_ON_PAGE) ?? count}
                    variant="outlined"
                    shape="rounded"
                    onChange={changeHandler}
                />
            </div>
        </ThemeProvider>
    );
};

export default PaginationBar;
