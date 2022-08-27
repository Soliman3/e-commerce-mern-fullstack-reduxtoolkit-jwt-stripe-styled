import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// import icons from mui5 library...
import {
    ArrowUpward,
    ArrowDownward
} from '@mui/icons-material'
import { userRequest } from '../requestAxiosMethod'

// Styled...
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`
const FigureItem = styled.div`
    flex: 1;
    cursor: pointer;
    padding: 20px;
    margin:15px 20px 5px 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    &:hover{
        background-color: yellow;
        transform: scale(1.1);
        transition: all 0.25s ease;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
    }
`
const FigureTitle = styled.span`
    font-size: 21px;
`
const FigureAmountContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`
const FigureAmout = styled.span`
    font-size: 30px;
    font-weight: 700;
`
const FigureAmountChange = styled.span`
    display: flex;
    align-items: center;
    margin-left: 5px;
`
const FigureCompare = styled.span`
    font-size: 12px;
`

// Figures React Functional Component...
export default function Figures() {
    // fetch total revenues & total Cost...
    const [totalRevenues, setTotalRevenues] = useState([])
    const [progressRate, setProgressRate] = useState(0)
    const [totalCost, setTotalCost] = useState([])
    const [costProgressRate, setCostProgressRate] = useState(0)
    useEffect(() => {
        const getTotalRevenues = async () => {
            const response = await userRequest.get('/orders/revenues')
            const ids = response.data.map(object => { return object._id })
            const currentMonth = Math.max.apply(null, ids)
            const previousMonth = currentMonth -1
            const indexOfCurrentMonth = response.data.findIndex(object => { return object._id === currentMonth })
            const indexOfPreviousMonth =response.data.findIndex(object => { return object._id === previousMonth })
            
            setTotalRevenues(response.data[indexOfCurrentMonth].total)
            setProgressRate(Math.floor((response.data[indexOfCurrentMonth].total - response.data[indexOfPreviousMonth].total)/ (response.data[indexOfCurrentMonth].total) * 100))
            
            
            setTotalCost(response.data[indexOfCurrentMonth].directCost)
            setCostProgressRate(Math.floor((response.data[indexOfCurrentMonth].directCost - response.data[indexOfPreviousMonth].directCost)/ (response.data[indexOfCurrentMonth].directCost) * 100))
        
        }
        getTotalRevenues()
    }, [])
        console.log(totalCost);
        console.log(costProgressRate);



    
  return (
    <Container>
          <FigureItem>
              <FigureTitle>Gross Margin</FigureTitle>
              <FigureAmountContainer>
                  <FigureAmout>$675,402</FigureAmout>
                  <FigureAmountChange>
                      -10.4
                      <ArrowDownward style={{color: 'red'}}/>
                  </FigureAmountChange>
              </FigureAmountContainer>
              <FigureCompare>Compare to last month</FigureCompare>
          </FigureItem> 
          <FigureItem>
              <FigureTitle>Revenues</FigureTitle>
              <FigureAmountContainer>
                  <FigureAmout>${totalRevenues.toLocaleString()}</FigureAmout>
                  <FigureAmountChange>
                      %{progressRate}
                      {progressRate > 0 ? (<ArrowUpward style={{ color: 'green' }} />)
                          :(<ArrowDownward style={{ color: 'red' }} />)}
                      
                  </FigureAmountChange>
              </FigureAmountContainer>
              <FigureCompare>Compare to last month</FigureCompare>
          </FigureItem>
          <FigureItem>
              <FigureTitle>Total Expenses</FigureTitle>
              <FigureAmountContainer>
                  <FigureAmout>${totalCost.toLocaleString()}</FigureAmout>
                  <FigureAmountChange>
                      %{costProgressRate}
                      {costProgressRate > 0 ? (<ArrowUpward style={{ color: 'green' }} />)
                          :(<ArrowDownward style={{ color: 'red' }} />)}
                  </FigureAmountChange>
              </FigureAmountContainer>
              <FigureCompare>Compare to last month</FigureCompare>
          </FigureItem> 
    </Container>
  )
}
