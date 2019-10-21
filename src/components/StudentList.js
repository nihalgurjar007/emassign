import React, { Component } from 'react';
import '../styles/card.css';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { loadData } from '../redux/actions';
import StudentCardView from './StudentCardView';
import FilterBar from './FilterBar';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
    color:'inherit'
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  button: {
    margin: '2%',
    border: '1px solid black',
    color:'white',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2,
    justifyContent: 'center',
    marginLeft: '900px',
    marginTop: '450px',
    color: '#000a12'
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  listContainer: {
    width: '60%',
    margin: '0 auto',
    marginTop: '7%'
  }
});

let toggleNameflag = false;
let toggleMarksflag = false;

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      copyForSearch: [],
      nameOpen: false,
      marksOpen: false,
      searchResult: true,
      isFetching: true
    };
  }

  emptyCard = () => {
    return (
        <div className="our-team-empty">
          No results found
        </div>
    );
  }

  handlSearchChange = (event) => {
    let search = '^' + event.target.value;
    let flag = 'i';
    let reg = new RegExp(search, flag);
    let newStudents = [];
    this.state.copyForSearch.map(student => {
      if (reg.test(student['name'])) {
        newStudents.push(student);
      }
      return newStudents;
    });
    if (newStudents[0] !== undefined) {
      this.setState({
        students: newStudents,
        searchResult: true
      });
    } else {
      this.setState({
        searchResult: false
      });
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      nameOpen: false,
      marksOpen: false
    });
  };

  toggleName = () => {
    this.setState({
      nameOpen: true
    });
    if (toggleNameflag === true) {
      let sortNames = this.state.students.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      let reverse = sortNames.reverse();
      this.setState({
        students: reverse
      });
    }
    if (toggleNameflag === false) {
      let sortNames = this.state.students.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      this.setState({
        student: sortNames
      });
    }
    toggleNameflag = toggleNameflag ? false : true;
  }

  toggleMarks = () => {
    this.setState({
      marksOpen: true
    });
    if (toggleMarksflag === true) {
      let sortMarks = this.state.students.sort(function(a, b) {
        return a.totalMarks - b.totalMarks;
      });
      let reverse = sortMarks.reverse();
      this.setState({
        students: reverse
      });
    }
    if (toggleMarksflag === false) {
      let sortMarks = this.state.students.sort(function(a, b) {
        return a.totalMarks - b.totalMarks;
      });
      this.setState({
        students: sortMarks
      });
    }
    toggleMarksflag = toggleMarksflag ? false : true;
  }

  componentWillReceiveProps(nextProps) {
    let sum = 0;
    let totalMarks = [];
    let students = [];
    let data =  nextProps.students
    Object.keys(data).map(student => {
      Object.values(data[student]['marks']).map(mark => {
        sum = sum + mark;
        return sum;
      });
      totalMarks.push(sum);
      students.push({
        name: data[student]['name'],
        rollNo: data[student]['rollNo'],
        totalMarks: sum
      });
      sum = 0;
      return totalMarks;
    });
    this.setState({
      students,
      copyForSearch: students
    });
  }

  componentDidMount = () => {
    this.props.loadData();
  };

  render() {
    const { classes } = this.props;
    return (
      this.state.isFetching ? 
      <div className="container">
        {this.state.students[0] === undefined  ? (
          <Grid className={classes.progressContainer} container>
            <CircularProgress className={classes.progress} size={100} />
          </Grid>
        ) : (
          <div className={classes.root}>
            <FilterBar classes={classes}
              handlSearchChange={this.handlSearchChange}
              toggleName={this.toggleName}
              nameOpen={this.state.nameOpen}
              handleClose={this.handleClose}
              toggleMarks={this.toggleMarks}
              marksOpen={this.state.marksOpen}
              toggleMarksflag={toggleMarksflag}
              toggleNameflag={toggleNameflag}
            />
        </div>
            )}
          <div className={classes.listContainer}>
            <div className="row">
              {this.state.searchResult ? <StudentCardView students = {this.state.students} toggleMarks ={this.toggleMarks} /> : this.emptyCard()}
          </div>
          </div>
      </div> : (<h1>This page is not available</h1>)
    );
  }
}

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
)(StudentList);
