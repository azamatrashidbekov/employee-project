import React, {Component} from 'react';
import { withRouter } from "react-router";
import './list.css';
import { Link }  from 'react-router-dom';
import Edit from './Edit';

class List extends Component {
  constructor(props){
    super(props);
    const currentPage = Number(this.props.match.params.page)
    const page = !isNaN(currentPage) ? currentPage : 1;
    this.state = {
      limit: 20,
      page,
      editMode: false,
      employee: {}
    }
    
  }
  next = ()=>{
    const {employees} = this.props;
    const {page, limit} = this.state;
    if(page < Math.ceil(employees.length / limit))
    this.setState({page: page + 1});
  }
  prev = ()=>{
    const {page} = this.state;
    if(page > 1){
      this.setState({page: page - 1});
    }
  }
  // getting current page and setting it into state
  setPage = page =>{
    this.setState({page})
  }

  onClose = ()=>{
    this.setState({editMode: !this.state.editMode});
  }
  // opening and closing modal
  toggle = (e, employee) =>{
    e.preventDefault();
    this.setState({editMode: !this.state.editMode, employee})
  }
  render(){
      const {employees} = this.props;
      const {limit, page, editMode, employee} = this.state;
      //counting total pages & pushing to an array all total pages
      const totalPages = Math.ceil(employees.length / limit);
      const pages = [];
      for(let i = 1; i <= totalPages; i++){
        pages.push(i);
      }

      // some condition for prev & next button/links to show right page
      const next = page < Math.ceil(employees.length / limit) ? page + 1 : page;
      const prev = page > 1 ? page - 1 : 1;

    return (
      <div className="list">
        <Edit editMode={editMode}  employee={employee} onSave={this.props.onSave} onClose={this.onClose}/>
          <div className="row header">
            <div className='cell sm'>#</div>
            <div className='cell' onClick={()=>{this.props.sort('first_name')}}>Full Name 
            <i className={this.props.sorted && this.props.sortBy === 'first_name' ? "fa fa-sort-asc" : "fa fa-sort-desc"} aria-hidden="true"></i></div>
            <div className='cell lg' onClick={()=>{this.props.sort('email')}}>Email
            <i className={this.props.sorted && this.props.sortBy === 'email' ? "fa fa-sort-asc" : "fa fa-sort-desc"} aria-hidden="true"></i></div>
            <div className='cell' onClick={()=>{this.props.sort('city')}}>City
            <i className={this.props.sorted && this.props.sortBy === 'city' ? "fa fa-sort-asc" : "fa fa-sort-desc"} aria-hidden="true"></i></div>
            <div className='cell' onClick={()=>{this.props.sort('state')}}>State
            <i className={this.props.sorted && this.props.sortBy === 'state' ? "fa fa-sort-asc" : "fa fa-sort-desc"} aria-hidden="true"></i></div> 
            <div className='cell sm' onClick={()=>{this.props.sort('state')}}>Actions
            </div>
            {/* {
              ['first_name','email','city','state'].map((el) => {
                return  <div className='cell' onClick={()=>{this.props.sort(el)}}>{el.toUpperCase()}</div>
              })
            } */}
          </div>
          
          <div className="content">
            {
                employees.slice(limit*(page-1), limit*page).map((employee, ind)=> {
                  const { _id, id, first_name, last_name, email, city, state } = employee;
                    return (
                        <Link key={_id} className='row' to={`/employee/${_id}`} >
                            <div className='cell sm'>{ind+1}</div>
                            <div className='cell'>{first_name} {last_name}</div>
                            <div title={email} className='cell lg'>{email}</div>
                            <div className='cell'>{city}</div>
                            <div className='cell'>{state}</div>
                            <div className='edit' onClick={(e)=>this.toggle(e, employee)}>Edit</div>
                            <div className='trash'  
                              onClick={(e)=>{this.props.delete(e,_id)}}>Delete</div>
                        </Link>
                    )
                })
            }
            <div className='some-info'>{`${limit*(page-1)} - ${limit* page > 200 ? 201 : limit*page}`}</div>
            <div className='footer'>
              <Link to={`/page/${prev}`} className='left' onClick={this.prev}></Link>
              {
                pages.map((el, ind)=>{
                  return <Link key={ind} className={el === page ? 'page active' : 'page'} to={`/page/${ind+1}`} onClick={()=>this.setPage(el)}>{el}</Link>
                })
              }
              <Link to={`/page/${next}`} className='right' onClick={this.next}></Link>
            </div>
          </div>
     </div>
    );
  }
  
}

export default withRouter(List);
