import { useEffect, useState } from 'react'
import '../assets/css/home.css'
import '../assets/css/slider.css'
import Button from '../ui/components/Button'
import list_icon from '../assets/icons/list_icon.svg'
import Input from '../ui/components/Input'


const Home = () => {
    const [sliderValue, setSliderValue] = useState<Number>(3)
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")
    const [gamesData, setGamesData] = useState([])
    const [games, setGames] = useState([])
    const [groups, setGroups] = useState([])
    const [providers, setProviders] = useState([])
    const [providerKeywords,setProviderKeywords] = useState<number[]>([])
    const [clickedSort,setClickedSort] = useState("")
    const sorts = ["A-Z","Z-A","Newest"]

    const getAllGames = () => {
        fetch('http://localhost:5500/games')
            .then(res => res.json())
            .then(res => {
                setGamesData(res);
                setGames(res)
            })
    }
    const getAllGroups = () => {
        fetch('http://localhost:5500/game-groups')
            .then(res => res.json())
            .then(res => {
                setGroups(res);
            })
    }
    const getAllProviders = () => {
        fetch('http://localhost:5500/providers')
            .then(res => res.json())
            .then(res => {
                setProviders(res);
            })
    }
    useEffect(() => {
        getAllGames()
        getAllProviders()
        getAllGroups()
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let currentValue = e.target.value
        setSearchValue(currentValue)
        let searchedData = gamesData.filter((game: any) => game.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setGames(searchedData)
    }

    const filterByProvider = (e:number) =>{
        let names = [...providerKeywords]
        if(!names.includes(e)){
            names.push(e)
        }else{
            names.splice(names.indexOf(e), 1);
        }
        setProviderKeywords(names)
        let filteredData = gamesData.filter((g:any)=>names.indexOf(g.provider)!== -1)
        if(names.length !== 0){
            setGames(filteredData)
        }else{
            setGames(gamesData)
        }
    }

    const handleSorting = (by:string) =>{
        setClickedSort(by)
        
        if(by === "A-Z"){
            games.sort((a:any, b:any) => a.name.localeCompare(b.name))
        }
        if(by === "Z-A"){
            games.sort((a:any, b:any) => b.name.localeCompare(a.name))
        }
        if(by === "Newest"){
            games.sort((a:any, b:any) => b.date.localeCompare(a.date))
        }
        setGames(games)
    }
    const onReset = () =>{
        setSearchValue("")
        setProviderKeywords([])
        setClickedSort("")
        setGames(gamesData)
        setSliderValue(3)
    }

    return <div className="home_container">
        <div className={`home_container__games_grid grid-col-${sliderValue}`}>
            {
                games?.map((g: any) => {
                    return <img key={g.id} src={g.cover} alt={g.name} />
                })
            }
        </div>
        <div className="home_container__filter">
            <div className="home_container__filter__search">
                <Input handleChange={handleSearch} value={searchValue} type="text" label="Search" />
            </div>
            <div className={!isFilterOpen ? 'filter-inside-container' : ''}>
                <div className="home_container__filter__section">
                    <p className='filter-subtitle'>Providers</p>
                    <div className='home_container__filter__section__items'>
                        {providers.map((p:any) => {
                            return <span key={p.id} onClick={()=> filterByProvider(p.id)} className={providerKeywords.includes(p.id)? "active":""}>{p.name}</span>
                        })}
                    </div>
                </div>
                <div className="home_container__filter__section">
                    <p className='filter-subtitle'>Game groups</p>
                    <div className='home_container__filter__section__items'>
                        {groups.map((g:any) => {
                            return <span className="" key={g.id}>{g.name}</span>
                        })}
                    </div>
                </div>
                <div className="home_container__filter__section">
                    <p className='filter-subtitle'>Sorting</p>
                    <div className='home_container__filter__section__items'>
                        {
                            sorts.map(s=>{
                                return <span key={s} onClick={()=>handleSorting(s)} className={clickedSort === s ? "active":""}>{s}</span> 
                            })
                        }
                    </div>
                </div>
                <div className="home_container__filter__section columns-section">
                    <p className='filter-subtitle'>Columns</p>
                    <div className='slider'>
                        <div onClick={() => setSliderValue(2)} className='slider-num active-slider'>2</div>
                        <div className={`slider-stick ${sliderValue >= 3 ? "active-slider" : ""}`}>&nbsp;</div>
                        <div onClick={() => setSliderValue(3)} className={`slider-num ${sliderValue >= 3 ? "active-slider" : ""}`}>3</div>
                        <div className={`slider-stick ${sliderValue === 4 ? "active-slider" : ""}`}>&nbsp;</div>
                        <div onClick={() => setSliderValue(4)} className={`slider-num ${sliderValue === 4 ? "active-slider" : ""}`}>4</div>
                    </div>
                    <div className='home_container__filter__section__bottom'>
                        <p className='filter-subtitle'>Games amount: {games.length}</p>
                        <Button onClick={() => onReset()} title='Reset' />
                    </div>
                </div>
            </div>

            <div className="filter-button-container">
                <Button
                    title={`${!isFilterOpen ? 'Show' : 'Hide'} filters`}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    titleStyle={{ color: "#3F53BE" }}
                    startIcon={list_icon}
                    className="btn-no-color"
                />
            </div>
        </div>
    </div>
}

export default Home;

