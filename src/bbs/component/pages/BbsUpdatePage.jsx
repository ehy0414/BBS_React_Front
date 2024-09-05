import styled from "styled-components";
import TextInput from "../ui/TextInput";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
//import axios from "axios";
import api from "../api/axios";
import _ from "lodash";

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
`;

function BbsUpdatePage() {
    const location = useLocation();
    console.log("debug >>> update page state, ", location.state.id );
    const bbsId = location.state?.id;
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [bbs, setBbs] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [originalbbs, setOriginalbbs] = useState({});

    const titleHandler = (e) => {
        setTitle(e.target.value);
        // setDisabled(false);
    }

    const contentHandler = (e) => {
        setContent(e.target.value);
        // setDisabled(false);
    }

    const cancelHandler = () => {
        navigate("/")
    }

    useEffect( () => {
        getBbs();
    }, [] );

    useEffect( () => {
        setBbs({
            id : parseInt(bbsId),
            title : title,
            content : content
        })
    }, [title, content]);
    useEffect(() => {
        setDisabled(_.isEqual(bbs, originalbbs));
    })
    const getBbs = async() => {
        try {
            const response = await api.get(`bbs/view/${bbsId}`);
            console.log("debug >> axios get OK!! ", response.data);
            setBbs({...response.data});
            setOriginalbbs({
                id : response.data.id,
                title : response.data.title,
                content : response.data.content
            });
            
            setTitle(response.data.title);
            setContent(response.data.content);
            console.log("bbs title >>> ", bbs.title)
        } catch(err) {
            console.log( err );
        }
    }

    // json-server version
    // const bbsUpdate = async() => {
    //     const data = {
    //         title : title,
    //         content : content
    //     }
    //     try{
    //         const response = await api.patch(`bbs/${bbsId}`, data);
    //         alert("글 수정완료하고 홈으로 이동합니다.")
    //         navigate("/")
    //         console.log(response.data);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // spring version 
    const bbsUpdate = async() => {
        const data = {
            id : bbsId,
            title : title,
            content : content
        }
        try{
            const response = await api.put(`bbs/update`, data);
            alert("글 수정완료하고 홈으로 이동합니다.")
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Wrapper>
            <Container>
                <label> 제목 :
                <TextInput  height={20}
                            value={title}
                            onChange={titleHandler} />
                </label>
                <label> 내용 :
                <TextInput  height={400}
                            value={content}
                            onChange={contentHandler} />
                </label>
                <ButtonContainer>
                    <Button title="글 수정하기"
                            onClick={bbsUpdate}
                            disabled={disabled}
                            >
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button title="글 수정취소"
                            onClick={cancelHandler}>
                    </Button>
                </ButtonContainer>

            </Container>
        </Wrapper>
    )
}

export default BbsUpdatePage;