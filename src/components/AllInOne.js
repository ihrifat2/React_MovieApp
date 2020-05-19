import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, makeStyles, createStyles, fade, Card, CardActionArea, CardMedia, CardContent, Grid, Modal } from '@material-ui/core'
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons'

const rand = () => {
    return Math.round(Math.random() * 20) - 10
}

const getModalStyle = () => {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const API_KEY = 'eb7f19c3'

const useStyles = makeStyles((theme) =>
    createStyles({
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
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        modal: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    })
)

function AllInOne(props) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [q, setQuery] = useState('batman')
    const [activateModal, setActivateModal] = useState(false)
    const [detail, setShowDetail] = useState(false)
    const [detailRequest, setDetailRequest] = useState(false)
    const searchHandler = e => {
        setQuery(e.target.value)
    }
    const cardClickHandler = (imdbID) => {
        setActivateModal(true)
        setDetailRequest(true)
        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                setDetailRequest(false)
                setShowDetail(response)
                console.log(response)
            })
            .catch(({ message }) => {
                setDetailRequest(false)
            })
    }
    const handleClose = () => {
        setActivateModal(false)
    }
    const [modalStyle] = useState(getModalStyle)
    const MovieDetail = ({ Title, Poster, imdbRating, Rated, Runtime, Genre, Plot }) => {
        return (
            <Card className={styles.root}>
                <div className={styles.details}>
                    <CardContent className={styles.content}>
                        <Typography component="h5" variant="h5">
                            {Title}
                        </Typography>
                        {/* <Typography variant="subtitle1" color="textSecondary">
                        Mac Miller
                    </Typography> */}
                        <Typography>{Rated}</Typography>
                        <Typography>{Runtime}</Typography>
                        <Typography>{Genre}</Typography>
                    </CardContent>
                </div>
                <CardMedia
                    // className={classes.cover}
                    image={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                    title={Title}
                />
            </Card>
        )
    }

    useEffect(() => {

        setLoading(true)
        setError(null)
        setData(null)

        fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                if (response.Response === 'False') {
                    setError(response.Error)
                }
                else {
                    setData(response.Search)
                }

                setLoading(false)
            })
            .catch(({ message }) => {
                setError(message)
                setLoading(false)
            })

    }, [q])
    // console.log(data)
    const styles = useStyles()
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Movie Store
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <div className={styles.search}>
                        <div className={styles.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: styles.inputRoot,
                                input: styles.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={e => searchHandler(e)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3}>
                {data !== null && data.length > 0 && data.map((movie, index) => (
                    <Grid item xs={6} sm={3} key={movie.imdbID}>
                        <Card className={styles.root} onClick={() => cardClickHandler(movie.imdbID)}>
                            <CardActionArea>
                                <CardMedia
                                    className={styles.media}
                                    image={movie.Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : movie.Poster}
                                    title={movie.Title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {movie.Title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {movie.Year}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={activateModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {
                    detailRequest === false ?
                    (<MovieDetail {...detail} />) :
                    null
                }
                {/* <div style={modalStyle} className={styles.modal}>
                    <h2 id="simple-modal-title">Text in a modal</h2>
                    <p id="simple-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </div> */}
            </Modal>
        </div>
    )
}

export default AllInOne