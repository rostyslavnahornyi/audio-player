import styled from "styled-components";

export const Wrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    background: rgba(24,25,29,255);
    padding: 5px 0 0 10px;
`;

export const Navbar = styled.aside`
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: 25px;
`;

export const BtnBack = styled.div`
    color: grey;
    transition: 0.1s;

    &:hover {
        color: #fff;
        cursor: pointer;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
`;

export const Image = styled.img`
    width: 15px;
    height: 15px;
`;

export const Text = styled.p`
    font-size: 14px;
    margin-left: 10px;
`;

export const Line = styled.div`
    margin: 10px 0;
    background: rgb(50, 50, 50);
    height: 1px;
    margin-top: 14px;
    margin-left: -10px;
`;
