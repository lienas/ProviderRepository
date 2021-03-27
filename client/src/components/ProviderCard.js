import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 200,
    },
    media: {
        margin: "auto",
        width: "auto"
    },
    header: {
        height: 100
    }
});

export default function ProviderCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent className={classes.header}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt="placeholder"
                    image="/images/lienas-logo.png"
                    title="logo"
                />
                </CardContent>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.profile}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    <Link to={{
                        pathname: "/edit",
                        state: {url: props.url}
                    }}>edit</Link>
                </Button>
                <Button size="small" color="secondary">
                    delete
                </Button>
            </CardActions>
        </Card>
    );
}
