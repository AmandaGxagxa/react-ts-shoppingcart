import Button from '@material-ui/core/Button'

// type
import { CartItermType } from '../App'

import { Wrapper } from './Item.styles'

type Props = {
    item: CartItermType;
    handleAddToCart: (clickedItem: CartItermType) => void
}

const Item:React.FC<Props> = ({item, handleAddToCart})=> (
    <Wrapper>
        <img src={item.image} alt="{item.title}" />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>R{item.price}</h3>
<Button onClick={()=> handleAddToCart(item)}>Add To Cart</Button>
    </Wrapper>
)

export default Item;