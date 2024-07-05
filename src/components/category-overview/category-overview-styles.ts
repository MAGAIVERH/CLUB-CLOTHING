import styled from 'styled-components'

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`

export const CategoryTitle = styled.p`
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    margin-left: 25px;
  }
`

export const ProductsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    align-items: center; /* Centraliza horizontalmente */
    justify-content: center; /* Centraliza verticalmente */
    grid-row-gap: 20px;
  }
`
