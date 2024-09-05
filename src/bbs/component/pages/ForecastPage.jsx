import styled from "styled-components";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import api from "../api/axios";
import ForecastList from "../list/ForecastList";
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

function ForecastPage() {
    const navigate = useNavigate();

    const [base_time, setBase_time] = useState('');
    const [base_date, setBase_date] = useState('');
    const [beach_num, setBeach_num] = useState('');
    const [forecasts, setForecasts] = useState([]);

    const timeHandler = (e) => {
        setBase_time(e.target.value)
    }

    const dateHandler = (e) => {
        setBase_date(e.target.value)
    }

    const beachHandler = (e) => {
        setBeach_num(e.target.value)
    }

    const cancelHandler = () => {
        navigate("/")
    }

    // spring version
    const bbsSave = async(base_time, base_date, beach_num) => {
        const data = {
            base_time : base_time,
            base_date : base_date,
            beach_num : beach_num
        }
        try{
            // http://ip:port/api/forecast?base_time=xxx&base_date=xxx&beach_num=xxx
            // const response = await api.get(`api/react/forecast?base_time=${base_time}&base_date=${base_date}&beach_num=${beach_num}`);
            const response = await api.get(`api/validate/forecast`, {params : data});
            console.log(response);

            setForecasts(response.data);
        } catch (err) {
            console.log(err)
            setBase_date( err.response.data.base_date );
            setBase_time( err.response.data.base_time );
            setBeach_num( err.response.data.beach_num );
        }
    }
    return (
        <Wrapper>
            <Container>
                <label> 예보시간 :
                <TextInput  height={20}
                            value={base_time}
                            onChange={timeHandler}
                />
                </label>
                <label> 예보날짜 :
                <TextInput  height={20}
                            value={base_date}
                            onChange={dateHandler}
                />
                </label>
                <label> 해변이름 :
                <TextInput  height={20}
                            value={beach_num}
                            onChange={beachHandler}
                />
                </label>
                <ButtonContainer>
                    <Button title="예보정보 요청"
                            onClick={(e) => {bbsSave(base_time,base_date,beach_num)}}
                            >
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button title="예보정보 취소"
                            onClick={cancelHandler}>
                    </Button>
                </ButtonContainer>

                <p/>
                <ForecastList
                    data={forecasts}/>
            </Container>
        </Wrapper>
    )
}

export default ForecastPage;