import styled, { StyledComponent } from 'styled-components';
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';

export const MainContentContainer: StyledComponent<'div', any, {}> = styled.div`
    width: 40%;
    margin: 0 auto;
    height: 100vh;
    // display: flex;
    // flex-direction: column;
`;

export const NoneBorderButton: StyledComponent<'button', any, {}> = styled.button`
    all: unset;
    cursor: pointer;
    border: none;
    outline: none;
    position: absolute;
    right: 2rem;
    top: 1rem;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: 300ms ease;
    color: #aaa;
    
    &:hover{
        color: #000;
        text-shadow: 4px 4px 2px #aaa
    }

    &:active{  
        text-shadow: none;
    }

`

export const QuoteContainer: StyledComponent<ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>, any, {}> = styled(motion.div)``;

export const Quote: StyledComponent<ForwardRefComponent<HTMLElement, HTMLMotionProps<'blockquote'>>, any, {}> = styled(motion.blockquote)`
    padding-left: 2rem;
    border-left: .25rem solid #F7DF94;
    margin-bottom: 2.5rem;
    font-weight: 500;
`;
export const QuoteAuthorContainer: StyledComponent<ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>, any, {}> = styled(motion.div)`
    width: 93%;
`;
export const QuoteAuthor: StyledComponent<'cite', any, {}> = styled.cite`
    font-style: normal;
    font-weight: 700;
`;
export const QuoteType: StyledComponent<'span', any, {}> = styled.span`
    font-size: .75rem;
    color: #828282;
`;
export const GoToAuthorQuotesButton: StyledComponent<'button', any, {}> = styled.button`
    all: unset;
    cursor: pointer;
    padding: 2rem 1rem;
    transition: 300ms ease-in;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: inherit;
    gap: .5rem;
    margin-left: 2rem;
    
    &:hover{
        background-color: #333333;
        color: white;
    }
    
    &>.gc-r{
        width: fit-content;
    }

`;
export const QuoteDataContainer: StyledComponent<'div', any, {}> = styled.div`
    display: grid;
    gap: .25rem;
    grid-template-rows: repeat(2, 1fr);
`

export const QuotesList: StyledComponent<'ul', any, {}> = styled.ul`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    list-style: none;
    padding-block: 1rem;
`;