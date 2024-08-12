import styles from '../styles/ArtworkUpload.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { urlBackend } from '../assets/varGlobal';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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
    fontFamily: '"Khand"',
    fontSize: '14px',
    color: 'rgb(254, 184, 48)',
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
    fontFamily: '"Khand"',
    fontSize: '14px',
    textShadow: '1px 1px 0 #212020, -1px -1px 0 #212020, 1px -1px 0 #212020, -1px 1px 0 #212020',
    '&.Mui-focused': {
        color: 'orange',
    },
}));
 
// - DEMO2 : on init CREATE button is disabled
//   enabled when all required fields are populated and file selected
//   optional fields: all fields including are mandatory for the DEMO
//   close modal when artwork uploaded.
// -TODO:  
//   when artwork uploaded navigate to related collection
//   when file selected display filename 


const ArtworkUpload = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    // DEMO
    //  artworks.uploader will store artist who is currently connected and uploading his artwork
    const username = useSelector((state) => state.user.value.username);
    let uploader=username;

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [collection, setCollection] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [imageToUpload,setimageToUpload] = useState(''); //DEMO2
    const [isCreate,setisCreate] = useState(false);        //DEMO2

    useEffect(() => {
        fetch(`${urlBackend}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data.categories);
            });
    }, []);


    useEffect(() => {
        console.log("enable Create button if all required form fields are populated");
        // DEMO2 enable create button when user finished to fill required fields and selected the file to upload
        //       disable create if user clear one of required field or during test file name cleared (for the moment we are blind no filename displayed)
        if (category && collection && title && description && imageToUpload) // remove description if not required
            setisCreate(true);
        else 
            setisCreate(false);
        }, [imageToUpload,category,collection,title,description,imageToUpload]); // remove description if not required
    
    const listCategory = categories.map(e => {
        return <MenuItem value={e.name}>{e.name}</MenuItem>;
    });
    
    const handleUpload = () => {
        const formData = new FormData();
        console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\", title, description, category, collection, uploader);
        /* DO NOT TRY IT LIKE THIS  (and also do not use header in fetch below it will be added automatically ):
        let formJson = {
            uploader: uploader,
            category: category,
            collection,
            description,
            title,
            tags,
        };
        JSON.stringify(formJson);
        // console.log("\\\\\\\formJson to send to backend:", formJson ) 
        */
        // append to FormData all user inputs:
        // 1. the selected file:
        formData.append('imageFromFront', imageToUpload); // ok req.files
        // 2. form fields values:
        formData.append('uploader', uploader);
        formData.append('category', category);
        formData.append('collection', collection);
        formData.append('description', description);
        formData.append('title', title);
        formData.append('tags', tags);

        fetch('http://localhost:3000/artworks/upload', {
            method: 'POST',
            body: formData,  // do not add any header, simply set body with FormData ... et voilà.
        }).then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    // TODO: if we want to share with other components update reducer:  dispatch(addImage(data.artwork.url));
                    console.log("Uploaded!  data.artwork.url:", data.artwork.url)
                }
                else {
                    console.log("something went wrong", data.error);
                }
            });
            // WIP : currently simply closing modal 
            /// pull last changes and navigate to the collection
            //  passing collectionName of new uploaded artwork
            onClose();
    };

    const getFileToUpload = (e) => {
        // console.log("set imageToUpload to selected file :  e.target.files[0]", e.target.files[0]);
        setimageToUpload(e.target.files[0]);
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <p className="title">My new creation!</p>
                <div className={styles.form}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
                    <div>
                        <input
                            type="text"
                            placeholder="Collection"
                            id="collection"
                            className={styles.inputField}
                            onChange={(e) => setCollection(e.target.value)}
                            value={collection}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Title"
                            id="title"
                            className={styles.inputField}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div>
                        <input
                            type="textarea"
                            placeholder="Description"
                            id="description"
                            className={styles.inputField}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Tags: one anotherOne no_1"
                            id="tags"
                            className={styles.inputField}
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                        />
                    </div>
                    <UploadButton
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file"  onChange={(e) => getFileToUpload(e)} />
                    </UploadButton>
                    { isCreate ?
                        <button id="create"
                            className={`button ${styles.validate}`} onClick={() => handleUpload()}>
                                Create
                        </button>
                        :
                        <button id="create"
                            className={`button ${styles.validate}`}
                            onClick={() => handleUpload()} disabled>
                                Create
                        </button>
                    }
                </div>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    );
};

export default ArtworkUpload;
