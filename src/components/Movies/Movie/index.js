import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        maxWidth: 300,
        margin: 10
    },
    media: {
        height: 350
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
});
function Movie(props) {
    const styles = useStyles();
    return (
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
    );
}

export default Movie;