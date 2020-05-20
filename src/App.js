import React, {Component} from 'react';
import './App.css';
import List from './components/List'
import Search from './components/Search';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Single from './components/Single';
import Employee from './components/Employee';

const apiUrl = 'http://localhost:5000/'

class App extends Component {
  constructor(){
    super();
    this.state = {
      employees: [],
      isLoading: false,
      value: '',
      category: 'fullname',
      sortBy: '',
      sorted: false,
      toggle: false,
    }
  }
  getData = ()=>{
    this.setState({isLoading: true})
    fetch(`${apiUrl}api/employees`)
    .then(response => response.json())
    .then(employees => this.setState({employees, isLoading: false}))
  }
  componentDidMount(){
    this.getData();
  }

  // getting input value and setting to state
  getValue = e =>this.setState({value: e.target.value});

  // selecting a category
  select = e => this.setState({category: e.target.value});

  // deleting a list by id 
  delete = (e, _id) =>{
    e.preventDefault(); // ignoring link
    
    fetch(`${apiUrl}api/employee/${_id}`, {
      method: 'DELETE',
    })
    .then(response => {
      const {employees} = this.state;
    let allEmployees = employees.filter(el => el._id !== _id)
    this.setState({employees: allEmployees});

    })
  }

  //toggle dark mode
  toggle = ()=>{
    const {toggle} = this.state;
    this.setState({toggle: !toggle})
  }

  // saving changed employee
  onSave = employee =>{
    

    fetch(`${apiUrl}api/employee/${employee._id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(employee)
    })
    .then(response => {
      const employees = this.state.employees.map(el=>{
      if(el.id === employee.id){
        return employee
      }
      return el
    });
    this.setState({employees});
    })
  }

  // sorting 
  sort = sortBy =>{
    const {employees, sorted} = this.state;
    this.setState({sortBy, sorted: !sorted})
   employees.sort((a, b)=>{
     if(!sorted){
      return a[sortBy] > b[sortBy] ? 1 : -1;
     }else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
     }
   })
  }

  //adding a new employee
  addEmployee = employee =>{

    

    fetch(`${apiUrl}api/employees`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(employee)
    })
    .then(response => {
      const {employees} = this.state;
      employees.unshift(employee);
      this.setState({employees})
    })
    
  }

  render(){
    const {employees, isLoading, value, category, sortBy, sorted, toggle} = this.state;
    let filtered;

    filtered = employees.filter(el =>{
      if(category === 'fullname'){
        const firstName =  el.first_name.toLowerCase().includes(value.toLowerCase());
        const lastName =  el.last_name.toLowerCase().includes(value.toLowerCase());
        return firstName || lastName;
      }
      return el[category] && el[category].toLowerCase().includes(value.toLowerCase());
    })
    
    const loader = <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
    let content = isLoading ? loader : <List employees={filtered} delete={this.delete} sort={this.sort} sortBy={sortBy} sorted={sorted} onSave={this.onSave}/>;
    if(!isLoading && !filtered.length){
      content = <div className="not-found">Data Not Found</div>
    }

    return (
      <Router>
        <Switch>
          <div className={this.state.toggle ? 'contain black' : 'contain'}>
            <div className='dark-mode'><i className={this.state.toggle ? 'fa fa-toggle-on' : 'fa fa-toggle-off'} aria-hidden="true" onClick={this.toggle}></i></div>
            <Route path='/' exact>
              <Search employees={this.state.raw} value={value} getValue={this.getValue} val={category} select={this.select} toggle={toggle}></Search>
             {content}
            </Route>
            <Route path='/page/:page'>
              <Search employees={this.state.raw} value={value} getValue={this.getValue} val={category} select={this.select} toggle={toggle}></Search>
              {content}
            </Route>
            <Route path='/employee/:id'>
              {!isLoading && employees.length > 0 && <Single employees={employees}/>}
            </Route>
            <Route path='/new-employee/'>
              <Employee  addEmployee={this.addEmployee}/>
            </Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
