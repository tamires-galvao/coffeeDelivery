import styled from 'styled-components'

export const HeaderContainer = styled.header`
    background: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-50']};
    padding: 2rem 0 2rem;
`
export const HeaderContent = styled.div`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
