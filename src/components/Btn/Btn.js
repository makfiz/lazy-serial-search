import { Button } from 'components/Btn/Btn.styled'

const Btn = ({ children, onClick}) => {

    return (
        <Button onClick={()=> onClick()}>
            {children}
        </Button>
    )
}

export default Btn