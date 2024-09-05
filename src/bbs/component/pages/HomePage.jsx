import styled from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import BbsList from "../list/BbsList";
import { useEffect, useState } from "react";
//import axios from "axios";
import api from "../api/axios";


const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 100%;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;
const ButtonContainer = styled.div`
    text-align: right;
`

const HomePage = () => {
    const navigate = useNavigate();

    const [bbs, setBbs] = useState([]);

    useEffect( () => {
        getBbs();
    }, [] );

    //spring 연동
    const getBbs = async() => {
        try {
            const response = await api.get("bbs/index");
            setBbs(response.data);
            console.log("debug >> axios get OK!! ", response.data);
        } catch(err) {
            console.log( err );
        }
    }

    // json-server version
    // const getBbs = async() => {
    //     try {
    //         const response = await api.get("bbs");
    //         setBbs(response.data);
    //         console.log("debug >> axios get OK!! ", response.data);
    //     } catch(err) {
    //         console.log( err );
    //     }
    // }

    return (
        <Wrapper>
            <Container>
                <ButtonContainer>
                <Button 
                    title="글 작성하기"
                    onClick={() => {
                        navigate("bbs-write")
                    }} />
                    &nbsp;&nbsp;&nbsp;
                <Button 
                    title="날씨예보"
                    onClick={() => {
                        navigate("forecast-write")
                    }} />
                </ButtonContainer>
                    <p /> 
                    {/*
                    1.페이지 랜더링 이후 데이터(db.json) 가져오는 구현
                    2. props로 데이터 전달
                    3. BbsList에서 map함수 이용해서 props 데이터 전달 후 BbsItem 화면 구현
                    */}
                <BbsList 
                    data={bbs}
                />

            </Container>
        </Wrapper>
    )
}

export default HomePage;