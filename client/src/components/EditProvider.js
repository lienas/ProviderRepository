import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Backdrop, CircularProgress, Container, Grid, makeStyles, Paper, Snackbar, TextField} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Button from "@material-ui/core/Button";
import {DropzoneArea} from 'material-ui-dropzone'
import {useProviderApi} from "../api/useProviderAPI";
import {useLocation} from "react-router";
import {useAuth0} from "@auth0/auth0-react";
import Typography from "@material-ui/core/Typography";
import {useUploadAPI} from "../api/useUploadAPI";
import {getCompanyIdFromEndpoint} from "../helpers/helperFunctions";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    const [{uploadUrl, isLoadingUploadUrl, isErrorUploadUrl}, doFetchUploadUrl] = useUploadAPI();
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
    const [showInfo, setShowInfo] = useState(false);
    const [companyId, setCompanyId] = useState();
    const [logo, setLogo] = useState();

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
        if (isError) {
            console.log("Error patching provider: " + provider.name)
        } else if (isError === false && editMode === false) {
            //switch to edit Mode
            console.log("switch to edit mode")

            setBlockFetching(true);
            setEditMode(true);
        }
        setShowInfo(true);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowInfo(false);
    }

    const handleFileUploadChange = async (files) => {
        console.log('get Upload Url for the following file:', files);
        setLogo(files[0]);
        await doFetchUploadUrl('logo_' + companyId);
    }

    useEffect(() => {

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
            //do not fetch, if switched to editmode -> data is already returned from post
            setProvider({...provider, ...data})
            console.log("data in effect after switching = ", JSON.stringify(data));
            //set the url from response when switching (put url is different from post url)
            setUrl(data._links.self.href);
        }
        if (!isLoading && editMode) {
            setCompanyId(getCompanyIdFromEndpoint(url));
        }

    }, [doFetch, data, location])

    const message = isError ? 'Something went wrong- Try again ' : 'successfully created/updated data'

    return (
        <Container>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Snackbar open={showInfo} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={isError ? "error" : "success"}>
                    {message}
                </Alert>
            </Snackbar>

            <h2>{editMode ? 'Edit' : 'New'} Provider </h2>
            <Button variant="outlined" className={classes.btn}>
                <Link to="/">Home</Link>
            </Button>

            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item md={6}>
                        <form className={classes.root}>
                            <Typography color="secondary" variant="caption">{provider.ownerId}</Typography>
                            <div>
                                <img alt={provider ? provider.name : ""}
                                     src={provider && provider.logoUrl ? provider.logoUrl : 'images/nologo.png'}/>
                            </div>
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
                            acceptedFiles={
                                ['image/jpeg', 'image/png', 'image/bmp']
                            }
                            onChange={(files) => handleFileUploadChange(files)}
                        />
                    </Grid>
                    }
                </Grid>
            </Paper>

        </Container>
    )
}
