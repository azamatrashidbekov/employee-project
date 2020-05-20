import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link }  from 'react-router-dom';
import { Alert } from 'reactstrap';
import "./employee.css";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors, employee) => {
  let valid = true;
  for(let key in employee){
        if(employee[key] === ''){
            valid = false;
        }
  }
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Employee extends Component {
    constructor(){
        super();
        this.state = {
          employee: {
            id: 201,
            first_name: '',
            last_name: '',
            email: '',
            city: '',
            state: '',
            logins: [
                {
                date: "2019-03-09T05:31:04.652Z"
                },
                {
                date: "2019-05-17T04:17:36.752Z"
                },
                {
                date: "2019-07-06T04:27:46.203Z"
                },
                {
                date: "2019-07-29T04:27:16.098Z"
                },
                {
                date: "2019-08-06T04:25:47.448Z"
                },
                {
                date: "2019-08-27T04:28:12.485Z"
                },
                {
                date: "2019-11-16T05:53:11.416Z"
                },
                {
                date: "2019-12-04T05:01:04.236Z"
                },
                {
                date: "2019-12-24T05:12:19.047Z"
                },
                {
                date: "2020-01-01T05:04:47.346Z"
                },
                {
                date: "2020-01-05T05:54:04.368Z"
                },
                {
                date: "2020-01-25T05:02:38.110Z"
                }
                ]
          },
          alert: false,
          errors: {
            first_name: '',
            last_name: '',
            email: '',
            city: '',
            state: ''
          }
        }
            
    }
    setChange = (e)=>{
      const {employee} = this.state;
      let errors = this.state.errors;
      const { name, value } = e.target;
      employee[e.target.name] = e.target.value;

      switch (name) {
        case 'first_name': 
        errors.first_name = 
          value.length < 3
            ? 'First name must be 3 characters long!'
            : '';
        break;
        case 'last_name': 
        errors.last_name = 
          value.length < 3
            ? 'Last name must be 3 characters long!'
            : '';
        break;
        case 'email': 
          errors.email = 
            validEmailRegex.test(value)
              ? ''
              : 'Email is not valid!';
          break;
        case 'city': 
        errors.city = 
          value.length < 3
            ? 'City must be 3 characters long!'
            : '';
        break;
        case 'state': 
        errors.state = 
          value.length < 3
            ? 'State must be 3 characters long!'
            : '';
        break;
        default:
          break;
      }
      this.setState({errors, employee, alert: false})
    }

    goBack = ()=>{
      this.props.history.goBack();
    }

    addEmployee = e =>{
      const {employee} = this.state;
      
      if(validateForm(this.state.errors, this.state.employee)) {
        console.info('Valid Form');
        this.props.addEmployee(employee);
      }else{
        console.error('Invalid Form');
        e.preventDefault();
        this.setState({alert: true});
      }

      // let valid = true;
      // for(let key in employee){
      //     if(employee[key] === ''){
      //         valid = false;
      //     }
      // }
      // if(valid){
      //   this.props.addEmployee(employee);
      // }else {
      //   e.preventDefault();
      //   this.setState({alert: true});
      // }
      
    }

  render() {
    const {alert, employee, errors} = this.state;
    let message = 'Please fill out the form correctly';
    
    const checkValidation = alert ? <Alert color="danger">{message}</Alert> : null;
    return (
      <div className="employee">
        <button onClick={this.goBack} type="button" className="btn btn-outline-dark">{`<<< Go Back`}</button><br/>
        <h3>Adding New Employee</h3>
        <form className=''>
          {checkValidation}
          <div className="form-row mb-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="First name" name='first_name' onChange={this.setChange} required noValidate/>
              {errors.first_name.length > 0 && 
                <span className='error'>{errors.first_name}</span>}
            </div>
          </div>

          <div className="form-row mb-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Last name" name='last_name' onChange={this.setChange} required noValidate/>
              {errors.last_name.length > 0 && 
                <span className='error'>{errors.last_name}</span>}
            </div>
          </div>

          <div className="form-row mb-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Email" name='email' onChange={this.setChange} required noValidate/>
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
          </div>

          <div className="form-row mb-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="City" name='city' onChange={this.setChange} required noValidate/>
              {errors.city.length > 0 && 
                <span className='error'>{errors.city}</span>}
            </div>
          </div>

          <div className="form-row mb-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="State" name='state' onChange={this.setChange} required noValidate/>
              {errors.state.length > 0 && 
                <span className='error'>{errors.state}</span>}
            </div>
          </div>

        </form>
        <div className="form-row mb-3">
            <div className="col">
              <Link to='/' type="button" className="btn add  btn-dark" onClick={(e)=>this.addEmployee(e)}>Add</Link>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Employee);
