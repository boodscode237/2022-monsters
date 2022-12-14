import {useState, useEffect, ChangeEvent} from 'react'
import {getData} from "./utils/fetch.utils";
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component';
import './App.css';

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  console.log('render')
  const [searchField, setSearchField] = useState("")
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then(res => res.json())
    // .then(users => setMonsters(users))
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })
    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  const onSearchChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldstring = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldstring)
  }  

  return(
    <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox 
        className="monsters-search-box"
        placeholder="Search Monsters"
        onChangeHandler={onSearchChanged}/>

        <CardList monsters={filteredMonsters}/>
      </div>
  )
}


// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//     console.log("constructor");
//   }

//   componentDidMount(){
//     console.log("componentDidMount");
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(res => res.json())
//     .then(users => this.setState(() => {
//       return {monsters: users}
//     }
//   ))
//   }

//   onSearchChanged = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase()
//     this.setState(() => {
//       return {searchField}
//     })
//   }

//   render(){
//     console.log("render")

//     const {monsters, searchField} = this.state
//     const {onSearchChanged} = this

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField)
//     })

//     return (
      
//     );
//   }

// }

export default App;
