import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
    Container,
    FormControl,
    FormHelperText, Grid,
    Input,
    InputLabel, TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/styles";
import {DropzoneArea} from 'material-ui-dropzone'

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100ch',
        },
    },
    btn: {
        marginBottom: 25,
    }
});

export class EditProvider extends Component {

    render() {
        const {edit} = this.props
        const {classes} = this.props

        return (
            <Container>
                <h2>{edit ? 'Edit' : 'New'} Provider </h2>
                <Button variant="outlined" className={classes.btn}>
                    <Link to="/">Home</Link>
                </Button>
                <Grid container>
                    <Grid item>
                        <form className={classes.root}>
                            <img/>
                            <div><TextField id="name" label="name"/></div>
                            <div><TextField id="city" label="city"/></div>
                            <div><TextField id="country" label="country"/></div>
                            <div><TextField fullWidth id="profile" label="profile" multiline rows={5}/></div>
                            <div><Button>Submit</Button></div>
                        </form>
                    </Grid>
                    <Grid item>
                        <DropzoneArea
                            dropzoneText="Drag and drop Logo here or click"
                            filesLimit={1}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']
                            }
                        />
                    </Grid>
                </Grid>

            </Container>
        )
    }
}

export default withStyles(styles)(EditProvider)
