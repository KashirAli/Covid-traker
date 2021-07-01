import React from 'react'
import "./InfoBox.css"
import {Card,CardContent,Typography} from '@material-ui/core'
import numeral from 'numeral';
function InfoBox({title,cases,total,clicked,classe}) {
  let activeClass ;
  if(classe && title ==='Recovered'){
      activeClass = 'active-success'
  }
  else if(classe && title !== 'Recovered'){
    activeClass = 'active-danger'
  }
  else{
    activeClass = 'infobox'
  }
    return (
        <div >
         <Card  className={activeClass} onClick={()=>clicked(title)} >
      <CardContent className="infobox__content" >
        <Typography color="textSecondary" gutterBottom>
          <p className="infobox__title" >{title}</p>
        </Typography>
        
        <h3 className="infobox__cases" style={title === 'Recovered'?{color:'green'}:null}>  {numeral(cases).format('+0a')} </h3>
        
        <p className="infobox__total"> {numeral(total).format('0a')} Aprox. </p>
       
      </CardContent>
    </Card>    
        </div>
    )
}

export default InfoBox;
