import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Backdrop, CircularProgress, Container, Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {DropzoneArea} from 'material-ui-dropzone'
import {useProviderApi} from "../api/useProviderAPI";
import {useLocation} from "react-router";
import {useAuth0} from "@auth0/auth0-react";
import Typography from "@material-ui/core/Typography";

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
    const {user} = useAuth0();
    const classes = useStyles();
    const {edit} = props;
    const [provider, setProvider] = useState(
        {
            ownerId: user.sub,
            name: "",
            city: "",
            country: "",
            profile: ""
        });
    const [editMode, setEditMode] = useState(edit);
    const [blockFetching, setBlockFetching] = useState(false);
    let location = useLocation();
    const [url, setUrl] = useState(location.state ? location.state.url : "")

    const handleChange = (event) => {
        setProvider({...provider, [event.target.id]: event.target.value});
    };

    const submitHandler = async () => {
        console.log("state in submithandler user/editMode = ", user.sub, editMode)
        if (editMode === true) {
            method("patch");
        } else {
            method("post");
            // add user
            console.log("Provider in handler changed to ", JSON.stringify(provider))
        }
        body(provider);
        console.log("Submitting data for url " + url);
        await doFetch(url);
        console.log("state after submitting (iserror/editMode:", isError, editMode)
        if (isError) {
            console.log("Error patching provider: " + provider.name)
        } else if (isError === false && editMode === false) {
            //switch to edit Mode
            console.log("switch to edit mode")

            setBlockFetching(true);
            setEditMode(true);

        }
    }

    console.log("location " + JSON.stringify(location));

    useEffect(() => {
        console.log("User: ", user ? user.sub : "n.a.");
        console.log("state in effect editMode = ", editMode)

        const getdata = async () => {
            method("get");
            await doFetch(url);
            setProvider({...provider, ...data});
            console.log("data fetched in effect = ", JSON.stringify(data));
        }
        if (editMode && !blockFetching) {
            console.log("in edit mode::url = ", editMode, "::", JSON.stringify(url));
            getdata();
        } else if (blockFetching) {
            setProvider({...provider, ...data})
            console.log("data in effect after switching = ", JSON.stringify(data));
            //set the url, so that put is possible
            setUrl(data._links.self.href);
        }

    }, [doFetch, data, location])


    return (
        <Container>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <h2>{editMode === true ? 'Edit' : 'New'} Provider </h2>
            <Button variant="outlined" className={classes.btn}>
                <Link to="/">Home</Link>
            </Button>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item md={8}>
                        <form className={classes.root}>
                            <Typography color="secondary" variant="caption">{provider.ownerId}</Typography>
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
                    {editMode === true &&
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
