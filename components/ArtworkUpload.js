import styles from '../styles/ArtworkUpload.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

const ArtworkUpload = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [collection, setCollection] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch(`${urlBackend}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data.categories);
            });
    }, []);

    const listCategory = categories.map(e => {
        return <MenuItem value={e.name}>{e.name}</MenuItem>;
    });

    const handleUpload = () => {
        // Handle upload logic here
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
                            placeholder="Tags"
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
                        <VisuallyHiddenInput type="file" />
                    </UploadButton>
                    <button
                        id="create"
                        className={`button ${styles.validate}`}
                        onClick={() => handleUpload()}
                    >
                        Create
                    </button>
                </div>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    );
};

export default ArtworkUpload;