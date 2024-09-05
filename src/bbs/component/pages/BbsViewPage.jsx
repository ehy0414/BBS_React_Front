import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import styled from "styled-components";
//import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextInput from "../ui/TextInput";
import CommentList from "../list/CommentList";
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
const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
    background : #F3E8EB;
`;
const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;
const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;
const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;
const ButtonContainer = styled.div`
    text-align: right;
    
`;


function BbsViewPage(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bbs, setBbs] = useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    //json-server version
    // const getBbs = async() => {
    //     try {
    //         const response = await api.get(`bbs/${id}`)
    //         setBbs(response.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    //spring version
    const getBbs = async() => {
        try {
            const response = await api.get(`bbs/view/${id}`);
            console.log("axios get response data, " , response.data);
            setBbs(response.data);
            setComments(response.data.comments);
        } catch (err) {
            console.log(err);
        }
    }

    // json-server version
    // const getComments = async() => {
    //     try {
    //         const response = await api.get(`comments?bbsId=${id}`);
    //         setComments(response.data);
    //         console.log(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    //spring version
    const getComments = async() => {
        try {
            const response = await api.get(`bbs/comments/getComment/${id}`);
            setComments(response.data);
            console.log(response.data.length);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect( () => {
        getBbs();
        // getComments();
    },[])

    const textHandler = (e) => {
        setComment(e.target.value)
    }

    // json-server version
    // const createTimeline = async(content,bbsId) => {
    //     if(content == '') {
    //         alert("타임라인을 작성해 주세요!!")
    //     } else {
    //         const data = {
    //             id : Date.now(),
    //             content : content,
    //             bbsId : bbsId
    //         }
    //         try {
    //             const response = await api.post(`bbs/comments`,data)
    //             console.log(response.data)
    //             alert("comment 등록 완료!!")
    //             setComment('')
    //             getComments();
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    // }

    // spring version
    const createTimeline = async(content,bbsId) => {
        if(content == '') {
            alert("타임라인을 작성해 주세요!!")
        } else {
            const data = {
                content : content,
                bbsid : bbsId
            }
            try {
                /*
                1. CommentRequestDTO 작성
                2. 컨트롤러에서 매핑
                3. 파라미터로 넘어오는 데이터 확인
                */
                const response = await api.post(`bbs/comments/save`,data)
                console.log("axios comment response data ", response.data)
                console.log("axios comment status", response.status)
                if(response.status == 204) {
                    alert("comment 등록 완료!!");
                    setComment('');
                    getComments();
                } else {
                    alert("타임라인 등록 오류 발생!!!");
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

    // json-ser version
    // const deleteBbs = async(bbsId) => {
    //     try {
    //         api.delete(`/bbs/${bbsId}`);
    //         alert("삭제가 완료 되었습니다");
    //         navigate("/");
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // spring version
    const deleteBbs = async(id) => {
        try {
            console.log(comments.length);
            if(comments.length > 0) {
                alert("커맨트 삭제를 해야합니다")
            } else {
                const response = await api.delete(`/bbs/delete/${id}`);
                alert("삭제가 완료 되었습니다");
                navigate("/");
                console.log(response.data);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const moveUpdate = () => {
        if( window.confirm("수정페이지로 이동하시겠습니까?") ) {
            navigate("/bbs-update", { state : {id : id}} );
        }
    }
    
    return(
        <Wrapper>
            <Container>
                <ButtonContainer>
                    <Button 
                        title="뒤로가기"
                        onClick={() => {
                            navigate("/");
                        }} />
                </ButtonContainer>
                
                    <p />
                <PostContainer>
                    <TitleText>{bbs.title}</TitleText>
                    <ContentText>{bbs.content}</ContentText>
                    {/* 
                    1. 버튼 클릭시 숮ㅇ페이지(BbsUpdatePage.jsx)로 이동 (Route - 'bbs-update')
                    2. 페이지 화면구성은 BbsWritePage와 동일하게 구성하되 데이터가 보여지는 상태
                    3. 데이터 변경이 되었을 때만 수정완료 버튼 활성화 시켜서 수정가능 완료!!
                    4. 수정완료 후에는 HomePage로 이동
                    */}
                    <ButtonContainer>
                        <Button title="게시글 수정하기"
                                onClick={moveUpdate} />
                        &nbsp;&nbsp;
                        <Button title="게시글 삭제하기"
                                onClick={() => deleteBbs(bbs.id)} />
                    </ButtonContainer>
                    
                </PostContainer>

                <CommentLabel>타임라인</CommentLabel>
                <TextInput 
                    height={20}
                    value={comment}
                    onChange={textHandler} />
                <ButtonContainer>
                    <Button 
                        title="타임라인 등록하기" 
                        onClick={() => {createTimeline(comment,bbs.id)}} />
                </ButtonContainer>
                <p />

                <CommentList
                    data={comments} />
            </Container>
        </Wrapper>
        
    )
}

export default BbsViewPage;