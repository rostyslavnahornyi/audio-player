import styled from "styled-components";

const whiteFilter = `invert(100%) sepia(0%) saturate(7500%) hue-rotate(116deg)
brightness(109%) contrast(109%);`;
const darkFilter = `invert(48%) sepia(3%) saturate(4%) hue-rotate(326deg) brightness(110%) contrast(78%);`;

export const Wrapper = styled.div`
    height: ${({ isCollapsed }) => (isCollapsed ? "30px" : "80px")};
    flex-shrink: 0;

    background: #1a1a1a;
    border-top: 3px solid #525252;
    transition: 0.4s;

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 20px 0;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
`;

export const Duration = styled.p`
    font-size: 12px;
`;
export const Audio = styled.input`
    appearance: none;
    -webkit-appearance: none;
    background: #0f0e0e;
    width: 95%;

    &:focus {
        outline: none;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;

        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: rgb(100, 100, 100);
        cursor: pointer;
        margin-top: -2.2px;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        background: rgb(50, 50, 50);
        border-radius: 5px;
    }
`;
export const ButtonCollapse = styled.img`
    width: 15px;
    height: 15px;

    filter: ${({ isCollapsed }) => (isCollapsed ? darkFilter : whiteFilter)}
            
    &:hover {
        cursor: pointer;
    }
`;
export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Info = styled.div`
    width: 150px;
`;
export const PlaylistName = styled.p`
    font-size: 16px;
`;
export const TrackName = styled.p`
    font-size: 12px;
`;
export const MainButtons = styled.div`
    display: flex;
    align-items: center;
`;
export const ShuffleButton = styled.img`
    width: 18px;
    height: 18px;
    transition: 0.3s;
    filter: ${darkFilter}

    &:hover {
        cursor: pointer;
        filter: ${whiteFilter}
    }
`;
export const PreviousButton = styled.img`
    width: 22px;
    height: 22px;
    transition: 0.3s;
    filter: ${darkFilter}

    &:hover {
        cursor: pointer;
        filter: ${whiteFilter}
    }
`;
export const StatusButton = styled.img`
    width: 40px;
    height: 40px;
    filter: invert(98%) sepia(0%) saturate(303%) hue-rotate(143deg) brightness(88%) contrast(84%);
    transition: 1s;

    &:hover {
        cursor: pointer;
        filter: ${whiteFilter}
    }
`;
export const NextButton = styled.img`
    width: 22px;
    height: 22px;
    transition: 0.3s;
    filter: ${darkFilter}

    &:hover {
        cursor: pointer;
        filter: ${whiteFilter}
    }
`;
export const RepeatButton = styled.img`
    width: 18px;
    height: 18px;
    transition: 0.3s;
    filter: ${({ isRepeated }) => (isRepeated ? whiteFilter : darkFilter)}

    &:hover {
        cursor: pointer;
    }
`;
export const VolumeSettings = styled.div`
    width: 150px;
    display: flex;
    align-items: center;
`;
export const ButtonVolume = styled.img`
    width: 22px;
    height: 22px;
    filter: ${darkFilter}
    transition: 0.3s;

    &:hover {
        filter: ${whiteFilter}
        cursor: pointer;
    }
`;
export const Volume = styled.input`
    width: 100%;
`;
