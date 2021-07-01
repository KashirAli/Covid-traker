import {Map, InfoWindow, Marker, GoogleApiWrapper,Circle} from 'google-maps-react';
import React ,{Component} from 'react'
import numeral from 'numeral';
import './Map.css'
export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: '',
        imgsrc:'',
        deaths: null,
        cases:null,
        recovered:null,
        center:{
            lat: 33.8547,
            lng:35.8623
          },
          zoom:6
      };
    
      onMarkerClick = (obj) =>
     
        this.setState({
          selectedPlace: obj.name,
          activeMarker: {lat:obj.lat,lng:obj.lng},
          showingInfoWindow: true,
          imgsrc:obj.imagesrc,
          deaths:obj.death,
          recovered:obj.recover,
          tcases:obj.cases
        });
    
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: !this.state.showingInfoWindow,
            activeMarker: null
          })
        }
      };
      onInfoWindowClose = ()=>{
          this.setState({showingInfoWindow:false})
      }
      componentDidMount(){
          this.setState({center:this.props.center})
      }
      componentDidUpdate(prevProps,prevState){
          if(prevProps.center!=this.props.center || prevProps.countries!=this.props.countries){
              this.setState({center:this.props.center})
          }
      }
  
    render() {
        const casesType = {
            cases:{
                color:'rgba(255,0,0)',
                multipler:9000
            },
            recovered:{
                color:'rgba(0,255,0)',
                multipler:13000
            },
            deaths:{
                color:'rgba(255,0,0)',
                multipler:13000
            }
        }
        const ShowCircle = (data,caseType = 'cases') =>{
            if(true){    
                return(
                    data.map((data)=>{
                      
                        return(
                            <Circle
                            radius={Math.sqrt(data[caseType]*casesType[caseType].multipler)}
                            center={{lat:data.countryInfo.lat, lng:data.countryInfo.long }}
                            onMouseover={() => console.log('mouseover')}
                            onClick={()=>this.onMarkerClick({lat:data.countryInfo.lat,
                                 lng:data.countryInfo.long,
                                 name:data.country,
                                 cases:data.cases,
                                 recover:data.recovered,
                                 death:data.deaths,
                                 imagesrc:data.countryInfo.flag
                                })}
                            onMouseout={() => console.log('mouseout')}
                            strokeColor={casesType[caseType].color}
                            strokeOpacity={0.7}
                            strokeWeight={2}
                            fillColor={casesType[caseType].color}
                            fillOpacity={0.4}
                          />
                        )}
                        ))                        
                       }
        }
                  
           
            
        
        
    return (
        <div className='map'>
<Map style={{position:'absolute',width:'100%', height:'400px'}} 
    google={this.props.google} 
    zoom={this.state.zoom}
    center={this.state.center}
    >
{this.props.countries ? ShowCircle(this.props.countries,this.props.caseType):null}
<InfoWindow 
        visible={this.state.showingInfoWindow}
        position={this.state.activeMarker}
        
    onClose={this.onInfoWindowClose}>
        <div style={{width:'150px'}}>
            <div className="info__img">
            <img src={this.state.imgsrc}/>
            </div>
            <div className="info__country">
            <h1>{this.state.selectedPlace}</h1>
            </div>
            <div className="info__cases">
                Cases:{numeral(this.state.tcases).format('+0a')}
            </div>
            <div className="info__recovered">
                Recovered:{numeral(this.state.recovered).format('+0a')}
            </div>
            <div className="info__deaths">
                Deaths:{numeral(this.state.deaths).format('+0a')}
            </div>
        </div>
    </InfoWindow>
</Map>
        </div>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB53BSLZtGloTb16zYTvfa9UdFXPpEp2jc')
})(MapContainer)