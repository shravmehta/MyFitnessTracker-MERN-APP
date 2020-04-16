import React, {Component} from 'react';
import axios from 'axios';

class CreateUser extends Component{
    constructor(props){
        super(props);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);

        this.state ={
            username:''
        }
    }

    onChangeUser = user =>{
        this.setState({
            username: user.target.value
        });
    };


    onSubmit = async data =>{
        data.preventDefault();
        const user = {
            username: this.state.username
        }
        await axios.post('http://localhost:3001/users/add', user).then(res=>console.log(res.data));
        this.setState({username:''});
    };

    render(){
        return(
          <div>
              <h3>Create your profile</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Username: </label>
                      <input type="text" required className="form-control" onChange={this.onChangeUser}/>
                  </div>
                  <div className="form-group">
                  <input type="submit"  className="btn btn-primary" value="Enter"/>
                  </div>
              </form>
          </div>
        )
    }
}

export default CreateUser;