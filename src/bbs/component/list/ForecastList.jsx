import styled from "styled-components";
import ForecastItem from "./ForecastItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const ForecastList = (props) => {
    return(
        <Wrapper>
            { (props.data.length == 0) ?
                <ForecastItem forecasts="날씨예보가 존재하지 않습니다"/>
                : props.data.map( (forecast, index) => {
                    return (
                        <ForecastItem 
                            key={ index }
                            forecasts = {`${forecast.category} ${forecast.fcstValue}`} />
                    )
                }
            )}
        </Wrapper>
    )
}

export default ForecastList;