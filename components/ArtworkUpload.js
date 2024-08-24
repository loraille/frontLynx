import styles from "../styles/ArtworkUpload.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { urlBackend } from "../assets/varGlobal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { orange } from "@mui/material/colors";

const ArtworkUpload = ({ isOpen, onClose, intoCollection }) => {
  if (!isOpen) return null;
  //////////////////////////setup///////////////////////////////////////////
  const username = useSelector((state) => state.user.value.username);
  let uploader = username;
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [imageToUpload, setimageToUpload] = useState("");
  const [isCreate, setisCreate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  ////////////////////////get categories//////////////////////////////////////
  useEffect(() => {
    setCollection(intoCollection);
    fetch(`${urlBackend}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);
  /////set iscreate depending category && collection && title && description && imageToUpload/////////////////
  useEffect(() => {
    console.log(
      "enable Create button if all required form fields are populated"
    );
    if (category && collection && title && description && imageToUpload)
      setisCreate(true);
    else setisCreate(false);
  }, [imageToUpload, category, collection, title, description]);
  /////////////redirection to user profile/////////////////////////////////////
  useEffect(() => {
    if (redirect) {
      console.log("Redirecting to user page");
      router.push(`/user?username=${username}`);
      onClose();
    }
  }, [redirect, router, username, onClose]);

  const listCategory = categories.map((e) => {
    return (
      <MenuItem key={e.name} value={e.name}>
        {e.name}
      </MenuItem>
    );
  });
  //////////////////add an artwork with his porperties/////////////////////////////
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("imageFromFront", imageToUpload);
    formData.append("uploader", uploader);
    formData.append("category", category);
    formData.append("collection", collection);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("tags", tags);

    setLoading(true); // loading start

    fetch(`${urlBackend}/artworks/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Uploaded!  data.url:", data.url);
          setRedirect(true);
        } else {
          console.log("something went wrong", data.error);
          setErrorMessage(data.error);
        }
        setLoading(false); // loading end
      });
  };
  ////////////get file to upload file///////////////////////////
  const getFileToUpload = (e) => {
    setimageToUpload(e.target.files[0]);
  };
  ////////////get change on textfield//////////////////////////
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className={styles.overlay} onClick={onClose} >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="title">My new creation!</p>
        <div className={styles.form}>
          <FormControl sx={{ m: 1, width: "50ch" }}>
            <InputLabel
              id="demo-select-small-label"
              className={styles.customInputLabel}
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={category}
              label="Category"
              onChange={handleChange}
              className={styles.customSelect}
            >
              {listCategory}
            </Select>
          </FormControl>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              "& > :not(style)": { m: 1, width: "50ch" },
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
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              className={styles.uploadButton}
              startIcon={<CloudUploadIcon className={styles.upload} />}
            >
              Upload file
              <input
                type="file"
                onChange={(e) => getFileToUpload(e)}
                style={{ display: "none" }}
              />
            </Button>
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CircularProgress
                size={68}
                sx={{
                  color: orange[400],
                  margin: "0 auto",
                  marginTop: "10px",
                }}
              />
            </Box>
          ) : (
            <button
              id="create"
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
