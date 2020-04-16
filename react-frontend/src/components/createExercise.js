import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class CreateExercise extends Component{
    constructor(props){
        super(props);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.state ={
            username:'',
            description:'',
            duration: 0,
            date: new Date(),
            users:[]
        }
    }

    componentDidMount(){
       axios.get('http://localhost:3001/users/').then(res=>{
           if(res.data.length > 0){
               this.setState({
                   users: res.data.map(user=> user.username),
                   username: res.data[0].username
               })
           }
        })
    }

    onChangeUser = user =>{
        this.setState({
            username: user.target.value
        });
    };


    onChangeDesc = desc =>{
        this.setState({
            description: desc.target.value
        });
    };


    onChangeDuration = duration =>{
        this.setState({
            duration: duration.target.value
        });
    };


    onChangeDate = date =>{
        this.setState({
            date: date
        });
    };

    onSubmit = async data =>{
        data.preventDefault();
        const exercise = {
            username: this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }
        await axios.post('http://localhost:3001/exercises/add', exercise).then(res=>console.log(res.data));

        window.location = '/';
    };

    render(){
        return(
            <div>
                <h3>Create a New Record</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUser}>
                            {this.state.users.map(user=>{
                                return <option key={user} value={user}>{user}</option>
                            })};
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDesc}/>
                    </div>
                    <div className="form-group">
                        <label>Duration(Mins): </label>
                        <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit"  className="btn btn-primary" value="Create"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateExercise;