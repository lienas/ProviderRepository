import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Backdrop, CircularProgress, Container, Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {DropzoneArea} from 'material-ui-dropzone'
import {useProviderApi} from "../api/useProviderAPI";
import {useLocation} from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '90ch',
        },
    },
    btn: {
        marginBottom: 25,
    },
    paper: {
        padding: 5,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const EditProvider = (props) => {

    const [{data, isLoading, isError}, doFetch, method, body] = useProviderApi();
    const classes = useStyles();
    const {edit} = props;
    const [provider, setProvider] = useState(
        {
            name: "",
            city: "",
            country: "",
            profile: ""
        });
    let location = useLocation();
    const url = location.state ? location.state.url : "";

    const handleChange = (event) => {
        setProvider({...provider, [event.target.id]: event.target.value});
    };

    const submitHandler = async () => {
        if (edit) {
            method("patch");
        } else {
            method("post");
        }
        body(provider);
        console.log("Submitting data for url " + url);
        await doFetch(url);
        if (isError) {
            console.log("Error patching provider: " + provider.name)
        }
    }

    console.log("location " + JSON.stringify(location));

    useEffect(() => {
        const getdata = async () => {
            method("get");
            await doFetch(url);
            setProvider({...provider, ...data});
            console.log("data = ", JSON.stringify(data));
        }
        if (edit) {
            console.log("url = ", JSON.stringify(url));
            getdata();
        }

    }, [doFetch, data, location])


    return (
        <Container>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <h2>{edit ? 'Edit' : 'New'} Provider </h2>
            <Button variant="outlined" className={classes.btn}>
                <Link to="/">Home</Link>
            </Button>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid>
                        <form className={classes.root}>
                            <img/>
                            <div>
                                <TextField id="name" label="name"
                                           value={provider ? provider.name : ""}
                                           onChange={handleChange}/>
                            </div>
                            <div>
                                <TextField id="city" label="city"
                                           value={provider ? provider.city : ""}
                                           onChange={handleChange}/>
                            </div>
                            <div><TextField id="country" label="country"
                                            value={provider ? provider.country : ""}
                                            onChange={handleChange}/>
                            </div>
                            <div><TextField fullWidth id="profile" label="profile" multiline rows={5}
                                            value={provider ? provider.profile : ""}
                                            onChange={handleChange}/>
                            </div>
                            <div><Button onClick={submitHandler}>Submit</Button></div>
                        </form>
                    </Grid>
                    {edit &&
                    <Grid item>
                        <DropzoneArea
                            dropzoneText="Drag and drop Logo here or click"
                            filesLimit={1}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']
                            }
                        />
                    </Grid>
                    }
                </Grid>
            </Paper>

        </Container>
    )
}
