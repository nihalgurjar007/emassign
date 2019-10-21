import React, { Component } from 'react';
import '../styles/details.css';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadData } from '../redux/actions';


const styles = theme => ({
  progressContainer: {
      display: 'flex',
      justifyContent: 'center'
  },
  progress: {
      margin: theme.spacing.unit * 2,
      textAlign: 'center',
      color: '#000a12'
  },
  button:{
    margin:'2%'
  }
});

class StudentDetails extends Component {
  constructor() {
    super();
    this.state={
        name:'',
        standard:'',
        rollNo:'',
        marks:[],
        subjectNames:[],
        isValid: true,
        isFetching: true
    };
    this.displayMarks=this.displayMarks.bind(this);
  }

  displayMarks(){
      let marksDOM=[];
      this.state.marks.map((mark,index)=>{
          marksDOM.push(<h3 key={index}>{this.state.subjectNames[index].toUpperCase()}:{mark}</h3>)
          return marksDOM;
      });
      return marksDOM;
  }

  showGraph(){
    var returnObj = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Marks obtained per subject'
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Marks'
          }
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        series: [{
            name:this.state.name,
            data:this.state.marks
        }]
      };
      returnObj.xAxis.categories=this.state.subjectNames;
      Highcharts.chart('highchart-container', returnObj);
  }

  componentWillReceiveProps = (nextProps) => {
    let data = nextProps.students
    if(data[this.props.match.params.id]!==undefined){
      let name=data[this.props.match.params.id]["name"];
      let standard=data[this.props.match.params.id]["class"];
      let rollNo=data[this.props.match.params.id]["rollNo"];
      let subjects=data[this.props.match.params.id]["marks"];
      let marks=Object.values(subjects);
      let subjectNames=Object.keys(subjects);
        this.setState({
          name,
          standard,
          rollNo,
          marks,
          subjectNames
        }, () => {
          this.showGraph()
        });
    }
    else{
      this.setState({
        name:'Not found',
        isValid: false
      })
    }
  }

  componentDidMount = () => {
    this.props.loadData()
  }

  render() {
    const { classes } = this.props;
    return (
      this.state.isFetching ?
        <div className="details-container">
          {this.state.name==='' ?
            <div className={classes.progressContainer}>
              <CircularProgress className={classes.progress} size={100} />
            </div>
          :
            this.state.isValid ? (
              <div id="vcard" class="vcard">
                <div className="studentDetails">
                  <h3>Student details</h3>
                  <div className="avatar">
                    <img
                      className="img-fluid"
                      src={require('../data/student.png')}
                      alt="student"
                        />
                  </div>
                  <span className="info">
                    {this.state.name}
                    <br />
                    Class:
                    {this.state.standard}
                    <br />
                    Marks obtained:
                    {this.displayMarks()}
                    <br />
                    <NavLink to="/" style={{ textDecoration: 'none' }}><Button variant="outlined" color="secondary" className={classes.button} onClick={this.showGraph.bind(this)}>
                          Back
                    </Button></NavLink>
                  </span>
                </div>
                <div id="highchart-container" className="highchart-container"></div>
              </div>
            ) : (
              <h1>Roll Number not found</h1>
            )
          }
          </div> : (<h1>This page isn't available</h1>)
      );
  }
}

StudentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => {
  return {
    students: state.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadData()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(StudentDetails);
