import React from 'react'

import { Toolbar, AppBar, Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

const FilterBar = ({classes, handlSearchChange, toggleName, nameOpen, handleClose, toggleMarks, marksOpen, toggleMarksflag, toggleNameflag }) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography className={classes.title} variant="h4" color="inherit" noWrap>
          Dashboard
        </Typography>
        <div className={classes.grow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={handlSearchChange}
          />
        </div>
        <Button
            variant="text"
            color="primary"
            className={classes.button}
            onClick={toggleName}
          >
            Sort by name
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={nameOpen}
            autoHideDuration={2000}
            onClose={handleClose}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={
              <span id="message-id">
                {toggleNameflag === false
                  ? 'Sorted by names (Z-A)'
                  : 'Sorted by names (A-Z)'}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
          <Button
            variant="text"
            color="primary"
            className={classes.button}
            onClick={toggleMarks}
          >
            Sort by marks
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={marksOpen}
            autoHideDuration={2000}
            onClose={handleClose}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={
              <span id="message-id">
                {toggleMarksflag === false
                  ? 'Sorted by marks (high-low)'
                  : 'Sorted by names (low-high)'}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
      </Toolbar>
    </AppBar>
  )
}

export default FilterBar;