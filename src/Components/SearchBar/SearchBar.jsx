import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
    actionGetTracks,
    actionRemoveTracks,
} from "../../redux/actions/creators/tracks";
import { removeAudioExtension } from "../../utils/regex";
import { actionAddTrackToPlaylist } from "../../redux/actions/creators/playlists";
import { createSelector } from "reselect";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const tracks = createSelector(
    (store) => store.tracks,
    (tracks) => tracks
);

const SearchBar = ({ playlistId }) => {
    const dispatch = useDispatch();
    const state = useSelector(tracks);
    const [options, setOptions] = useState([]);

    const onOpenHandler = () => {
        dispatch(actionRemoveTracks());
        dispatch(actionGetTracks(null, null, true));
    };

    const onCloseHandler = (e) => {
        dispatch(actionRemoveTracks());
        setOptions([]);
    };

    useEffect(() => {
        setOptions(state.tracks);
    }, [state.tracks]);

    const getTitle = (option) => {
        if (option) {
            return (
                option.id3.title ||
                removeAudioExtension(option.originalFileName)
            );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                onOpen={onOpenHandler}
                onClose={onCloseHandler}
                id="free-solo-demo"
                options={options}
                getOptionLabel={getTitle}
                onChange={(_, value) =>
                    dispatch(actionAddTrackToPlaylist(playlistId, value._id))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search track to add"
                        color="success"
                    />
                )}
            />
        </ThemeProvider>
    );
};

export default SearchBar;
