import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional React component
// good for displaying props and JSX
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>Edit</Link> | <a href="#" onClick={ () => props.deleteExercise(props.exercise._id) }>Delete</a>
        </td>
    </tr>
)

// class React component
// good for keeping state & lifecycles
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.exerciseList = this.exerciseList.bind(this);

        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        axios.get('https://exertracker-beta.herokuapp.com/exercises')
            .then(res => {
                this.setState({
                    exercises: res.data
                });
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    deleteExercise(id) {
        axios.delete('/exercises/' + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    exercises: this.state.exercises.filter(el => el._id !== id)
                });
            });
    }

    exerciseList() {
        return this.state.exercises.map(curr => {
            return <Exercise exercise={curr} deleteExercise={this.deleteExercise} key={curr._id} />
        })
    }

    render() {
        return (
            <div>
               <h3>Exercises</h3>
               <table className="table">
                   <thead className="thead-light">
                       <tr>
                           <th>Username</th>
                           <th>Description</th>
                           <th>Duration</th>
                           <th>Date</th>
                           <th>Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                       { this.exerciseList() }
                   </tbody>
               </table>
            </div>
        )
    }
}