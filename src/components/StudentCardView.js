import React from 'react'
import { NavLink } from 'react-router-dom';
import {  Button } from '@material-ui/core';

const StudentCardView = (props) => {
  let students = props.students
  return (
    students.map((student, index) => {
      return (
        <StudentCard student={student} index={index} toggleMarks={props.toggleMarks} />
      );
    })
  )
}

export default StudentCardView

const StudentCard = ({ student, index, toggleMarks}) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
      <div className="card-container">
        <div className="picture">
          <img
            className="img-fluid"
            src={require('../data/student.png')}
            alt="student"
          />
        </div>
        <div className="card-content">
          {student['name']}
          <h4 className="title">
            Roll Number:
              {student['rollNo']}
          </h4>
          <h4 className="title">
            Total marks:
              {student['totalMarks']}
          </h4>
          <NavLink
            to={`/${student['rollNo']}`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleMarks}
            >
              Details
              </Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}