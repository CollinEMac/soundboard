import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from "@material-ui/core/ListItemText";

class MultiButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null,
      audioPath: ''
    }

    this.text = 'MultiButton'
  }
  
  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleOpen = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }

  render() {
    return (
      <Grid item key={this.props.key}>
        <Button
          className="MultiButton-main"
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onMouseDown={this.handleOpen}
          onMouseUp={() => {
            this.props.onMouseUp(this.state.audioPath);
            this.handleClose()
          }}
          onMouseEnter={
            () => {this.setState(
              {audioPath: (this.props.options.find((o) => o.default)).audioPath})
          }}
        >
          {this.props.text}
        </Button>
        <Menu
          className="MultiButton-menu"
          anchorEl={this.state.anchorEl}
          keepMounted={false}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          elevation={4}
          getContentAnchorEl={null}
          autoFocus={false}
          transitionDuration={0}
          variant="menu"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          {this.props.options.map(option => (
            <Tooltip title={option.description} placement='bottom'>
              <MenuItem
                onMouseEnter={() => {
                  this.setState({ audioPath: option.audioPath });
                }}
                onMouseUp={() => {
                  this.props.onMouseUp(this.state.audioPath);
                  this.handleClose()
                }}
              >
                <ListItemText primary={option.text} />
              </MenuItem>
            </Tooltip>
          ))}
        </Menu>
      </Grid>
    )
  }
}

export default MultiButton