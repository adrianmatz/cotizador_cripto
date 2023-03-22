import { useState, useEffect} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas.js'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    

    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }

`

const Formulario = ({setMonedas}) => {

    const [cryptos, setCryptos] =  useState([]);
    const [error, setError] =  useState(false);

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas);
    const [ cryptomonedas, SelectCryptomonedas ] = useSelectMonedas('Elige tu Criptomoneda', cryptos);
    
    useEffect( () => {
      
      const consultarAPI = async () => {
        
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

        
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        const arrayCrypto = resultado.Data.map( crypto => {

          const objeto = {
            id: crypto.CoinInfo.Name,
            nombre: crypto.CoinInfo.FullName
          }
          
          return objeto
        
        })

        setCryptos(arrayCrypto)
      }
      
      consultarAPI();
    }, []);


    const handleSubmit = e => {
      e.preventDefault()

      if([moneda, cryptomonedas].includes('')){
        setError(true)

        return
      }

      setError(false)
      setMonedas({
        moneda,
        cryptomonedas
      })
      
    }
    

    return (
      <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form
            onSubmit={handleSubmit}
        >

            <SelectMonedas />
            <SelectCryptomonedas />
            

            <InputSubmit type='submit' value='Cotizar'/>
        </form>
      </>
    )
}

export default Formulario