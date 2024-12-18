import React from 'react'
import '../styledComponent/menuCard.css'

function MenuCard(props) {
  
  const objj = props.list
  const objArray = [];
  
  for(let key in objj){
    objArray.push(key);
  }

  return (
    <React.Fragment>
        <div className='dropdown' >
                {props.btnName}
            <ul className='dropdown-menu' style={props.right==='true'?{right:0} :{left:0}}>
                {
                  objArray.map((key,index)=> <li key={index} ><a href={objj[key]}>{key}</a></li>)
                }
            </ul>
        </div>
    </React.Fragment>
  )
}

export default MenuCard