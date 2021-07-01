import './App.css';
import React,{ useState,useEffect } from 'react';
import {FormControl,Select,MenuItem,Card,CardContent,Typography,IconButton} from '@material-ui/core/';
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import Chart from './Chart'
import axios from 'axios';
// import {ShareIcon} from '@material-ui/icons/';
import {SortDData,SortAData} from './util'
import SortRoundedIcon from '@material-ui/icons/SortRounded';


function App() {
    
    const [country,setCountry] = useState('worldwide');
    const [countries,setCountries]=useState([]);  
    const [countryInfo,setCountryInfo] = useState({});
    const [tableData,setTableData] = useState([]);
    const [filter,setFilter] = useState(false);
    const [GraphLabel,setGraphLabel] = useState([])
    const [GraphData,setGraphData] = useState([])
    const [Center,setCenter]=useState({lat:'33.8547',lng:'35.8623'});
    const [MapCountries,setMapCountries] = useState([]);
    const [recoverActive,setRecoverActive]=useState(false);
    const [deathActive,setDeathActive]=useState(false);
    const [casesActive,setCasesActive]=useState(true);
    const [casetype,setcaseType] = useState('cases');
    const [string,setString]=useState('Covid cases')
    const fetchData = async()=>{
    const response = await axios.get('https://disease.sh/v3/covid-19/countries')
    .catch(err=>console.log(err))
    const countries = response.data.map((curr)=>{
      return{
        name:curr.country,
        value:curr.countryInfo.iso2
      }
    })
    setCountries(countries)
    const tableData = response.data.map((curr)=>{
      return {
        name:curr.country,
        cases:curr.cases
      }
    })
    let sortArr;
     !filter?  sortArr = SortAData(tableData):sortArr = SortDData(tableData)
    setTableData(sortArr);
    setMapCountries(response.data)
  }

  useEffect(()=>{
    fetchData()
  },[filter])



  const fetchCountryInfo = async()=>{
    const response = await axios.get('https://disease.sh/v3/covid-19/all')
    .catch(err=>console.log(err));
    setCountryInfo(response.data)
  }
  useEffect(()=>{
      fetchCountryInfo()
  },[])



  const fetchGraphData = async () =>{
     const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=5')
     .catch(err=>console.log(err,"<===fetchGraphData"))
     const graphLabels = Object.keys(response.data[casetype])
     const graphData = Object.values(response.data[casetype])
     setGraphData(graphData);
     setGraphLabel(graphLabels);
     
  }
  useEffect(()=>{
    fetchGraphData()
  },[casetype])


  const changeCountryHandler = async(event) =>{
    setCountry(event.target.value)
    const url = event.target.value === 'worldwide' ? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${event.target.value}`;
    const response = await axios.get(url)
    .catch(error=>console.log(error))
    
    setCountryInfo(response.data);
    event.target.value === 'worldwide'? setCenter({lat:33.8547, lng:35.8623}): setCenter({lat:response.data.countryInfo.lat,lng:response.data.countryInfo.long})
   
  }
 const filterHandler = ()=>{
  
   setFilter(!filter)
 }
 const clickInfoBox =(data)=>{
   setString(data);
   console.log(data)
   if(data === 'Recovered'){
    setcaseType('recovered')
     setRecoverActive(true)
     setDeathActive(false)
     setCasesActive(false)
   }
   else if(data === 'Deaths'){
    setcaseType('deaths')
    setRecoverActive(false)
    setDeathActive(true)
    setCasesActive(false)
  }if(data === 'Covid Cases'){
    setcaseType('cases')
    setRecoverActive(false)
    setDeathActive(false)
    setCasesActive(true)
  }
 }
  return (

    <div className="app">
      {/* header */}
      <div className="app_left">
      <section className="app__header">
      <h1>COVID 19 TRACKER</h1>
        <FormControl className="app_dropdown">
           <Select
           variant="outlined"
              labelId="country"
              id="country"
              value={country}
              onChange={changeCountryHandler}
           >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((curr)=>{
                  return ( <MenuItem value={curr.value}>{curr.name}</MenuItem>)
                })} 
           </Select>
      </FormControl>
    </section>
    <section className="app__stats">
        <InfoBox
         title="Covid Cases" 
         cases={countryInfo.todayCases} 
         total={countryInfo.cases} 
         clicked={clickInfoBox}
         classe={casesActive}
         />
        <InfoBox 
        title="Recovered" 
        cases={countryInfo.todayRecovered} 
        total={countryInfo.recovered} 
        clicked={clickInfoBox}
        classe={recoverActive}
        />
        <InfoBox title="Deaths" 
        cases={countryInfo.todayDeaths} 
        total={countryInfo.deaths} 
        clicked={clickInfoBox}
        classe={deathActive}
        />
    </section>  
    <section className="app__map">
         <Map caseType={casetype} countries={MapCountries} center={Center}/>
    </section>
  </div>
     
   
      <div className="app__right"  >
      <Card className="infobox" style={{width:'100%',boxShadow:'0px 0px 10px rgba(0,0,0,0.2)'}}>
      <CardContent>
      <section className="app_table">
     
        <div className="app__table__header" style={{display:'grid',gridTemplateColumns:'auto auto',justifyContent:'space-between',alignItems:'center'}}>
         <h3> Live Cases by countries</h3>
         <IconButton style={{marginLeft:'auto'}} aria-label="share" onClick={filterHandler}>
          <SortRoundedIcon />
        </IconButton>
        </div>
        <Table filter = {filter} data={tableData}/>
       
          
      </section>
      <section className="app_graph">
      <h3 style={{marginBottom:'5px'}}>Worldwide {string} {string === 'Covid cases'?null:"cases"}</h3>
          <Chart Data={GraphData} Label={GraphLabel} labelString={string}/> 
      </section>
      </CardContent>
    </Card> 
      </div>

    </div>
  );
}

export default App;
