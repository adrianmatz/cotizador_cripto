import React from 'react'
import styled from '@emotion/styled'

const Texto = styled.div`
    background-color: #b7322c;
    color: #fff;
    font-family: 'Lato', sans-serif;
    padding: 15px;
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    border-radius: 5px;
`

const Error = ({children}) => {
  return (
    <Texto>
        {children}
    </Texto>
  )
}

export default Error