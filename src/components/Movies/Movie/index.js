import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop: 10
    },
    media: {
        height: 140,
    },
});
function Movie(props) {
    const styles = useStyles();
    return (
        // <div className="movie">
        //     <h2>{props.title}</h2>
        //     <img src={props.image === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : props.image} alt={props.title}/>
        //     <h3>{props.year}</h3>
        // </div>
        <div style={{flexGrow: 1}}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                    <Card className={styles.root}>
                        <CardActionArea>
                            <CardMedia
                                className={styles.media}
                                image={props.image === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : props.image}
                                title={props.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.year}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Movie;