import React from 'react';
import { Link }  from 'react-router-dom';
import './search.css';

const Search = props =>{
  const {val} = props;
   return (
     <div>
        <input className='searching' type="text" placeholder="Search..." value={props.value} onChange={props.getValue}/>
        <Link className='add-user' to='/new-employee'>New Employee +</Link>
        <div>
          <button value='fullname' className={val === 'fullname' ? 'btn active' : 'btn'} 
            onClick={props.select}>Fullname</button>
          <button value='email' className={val === 'email' ? 'btn active' : 'btn'} 
            onClick={props.select}>Email</button>
          <button value='city' className={val === 'city' ? 'btn active' : 'btn'} 
            onClick={props.select}>City</button>
          <button value='state' className={val === 'state' ? 'btn active' : 'btn'} 
            onClick={props.select}>State</button>
        </div>
      </div>
   )
}
export default Search;
