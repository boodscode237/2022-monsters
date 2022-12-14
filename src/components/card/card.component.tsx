import './card.styles.css'
import {Monster} from '../../App'

type CardProps = {
    monster: Monster;
}

const Card = ({monster}: CardProps) => {
    const {id, name, email} = monster
    let set = Math.floor(Math.random() * 11)
    return (
        <div className='card-container' key={id}>
              <img 
              src={`https://robohash.org/${id}?set=set${set}&size=180x180`} 
              alt={`a monster called ${name}`} />
              <h2>{name}</h2>
              <p>{email}</p>
        </div>
    )
}

export default Card