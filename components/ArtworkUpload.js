import styles from '../styles/ArtworkUpload.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { urlBackend } from '../assets/varGlobal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { orange } from "@mui/material/colors";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UploadButton = styled(Button)(({ theme }) => ({
    cursor: 'pointer',
    border: '1px solid rgb(255, 255, 255)',
    fontFamily: '"Khand"',
    fontSize: '14px',
    color: 'rgb(254, 184, 48)',
    padding: '5px 15px',
    transition: 'all 327ms ease 0s',
    width: 'auto',
    boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 0px',
    borderRadius: '9px',
    background: 'rgb(66, 65, 65)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        color: 'rgb(255, 255, 255)',
        background: 'rgb(254, 184, 48)',
        borderColor: 'rgb(255, 255, 255)',
    },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
    backgroundColor: 'transparent',
    border: '1px solid rgb(255, 255, 255)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '9px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgb(255, 255, 255)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
    '& .MuiSelect-icon': {
        color: 'rgb(255, 255, 255)',
    },
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    color: 'rgb(254, 184, 48)',
    textShadow: '1px 1px 0 #212020, -1px -1px 0 #212020, 1px -1px 0 #212020, -1px 1px 0 #212020',
    '&.Mui-focused': {
        color: 'orange',
    },
}));

const ArtworkUpload = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    const username = useSelector((state) => state.user.value.username);
    let uploader = username;

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [collection, setCollection] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [imageToUpload, setimageToUpload] = useState('');
    const [isCreate, setisCreate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false); // Ajout de l'état de chargement

    const router = useRouter();

    useEffect(() => {
        fetch(`${urlBackend}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data.categories);
            });
    }, []);

    useEffect(() => {
        console.log("enable Create button if all required form fields are populated");
        if (category && collection && title && description && imageToUpload)
            setisCreate(true);
        else
            setisCreate(false);
    }, [imageToUpload, category, collection, title, description]);

    useEffect(() => {
        if (redirect) {
            console.log("Redirecting to user page");
            router.push(`/user?username=${username}`);
            onClose();
        }
    }, [redirect, router, username, onClose]);

    const listCategory = categories.map(e => {
        return <MenuItem key={e.name} value={e.name}>{e.name}</MenuItem>;
    });

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('imageFromFront', imageToUpload);
        formData.append('uploader', uploader);
        formData.append('category', category);
        formData.append('collection', collection);
        formData.append('description', description);
        formData.append('title', title);
        formData.append('tags', tags);

        setLoading(true); // Début du chargement

        fetch(`${urlBackend}/artworks/upload`, {
            method: 'POST',
            body: formData,
        }).then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    console.log("Uploaded!  data.url:", data.url);
                    setRedirect(true);
                }
                else {
                    console.log("something went wrong", data.error);
                    setErrorMessage(data.error);
                }
                setLoading(false); // Fin du chargement
            });
    };

    const getFileToUpload = (e) => {
        setimageToUpload(e.target.files[0]);
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div className={styles.overlay} onClick={onClose} style={{ zIndex: 1300 }} >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ zIndex: 1301 }}>
                <p className="title">My new creation!</p>
                <div className={styles.form}>
                    <FormControl sx={{ m: 1, width: '50ch' }} >
                        <CustomInputLabel id="demo-select-small-label">Category</CustomInputLabel>
                        <CustomSelect
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                        >
                            {listCategory}
                        </CustomSelect>
                    </FormControl>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'white',
                            '& > :not(style)': { m: 1, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic-collection"
                            label="Collection"
                            variant="outlined"
                            className="customTextField"
                            onChange={(e) => setCollection(e.target.value)}
                            value={collection}
                        />
                        <TextField
                            id="outlined-basic-title"
                            label="Title"
                            variant="outlined"
                            className="customTextField"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <TextField
                            id="outlined-basic-title"
                            label="Description"
                            variant="outlined"
                            className="customTextField"
                            multiline
                            maxRows={4}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <TextField
                            id="outlined-basic-title"
                            label="Tags"
                            variant="outlined"
                            className="customTextField"
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                        />
                    </Box>
                    <div className={styles.upload}>
                        <UploadButton
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '200px',
                                height: '80px',
                                fontSize: '30px',
                                margin: '0 auto',
                                marginTop: '10px',
                            }}
                            startIcon={<CloudUploadIcon className={styles.upload} />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={(e) => getFileToUpload(e)} />
                        </UploadButton>
                    </div>

                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    {loading ? (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <CircularProgress size={68}
                                sx={{

                                    color: orange[400],
                                    margin: '0 auto',
                                    marginTop: '10px'
                                }}
                            />
                        </Box>
                    ) : (
                        <button id="create"
                            className={`button ${styles.validate}`}
                            onClick={() => handleUpload()}
                            disabled={!isCreate}
                        >
                            Create
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ArtworkUpload;
