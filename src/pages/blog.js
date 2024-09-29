import { useState, useEffect } from "react";
import React from "react";
import "./blog.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

function Blog() {
  let blogdata = localStorage.getItem("blogs");
  const arr = JSON.parse(blogdata).arrblogs;
  const [blogArray, setBlogArray] = useState([...arr]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/seller/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      localStorage.setItem("blogs", JSON.stringify(data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    textAlign: "center",
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddBlog = () => {
    if (title && description) {
      console.log("Blog Added:", { title, description });
      setTitle("");
      setDescription("");
      handleClose();
    } else {
      alert("Please fill out all fields");
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
          >
            Add New Blog
          </Typography>

          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBlog}
            sx={{
              bgcolor: "#1976d2",
              "&:hover": {
                bgcolor: "#155a9c",
              },
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            Add Blog
          </Button>
        </Box>
      </Modal>
      <div className="cards">
        <button className="blogButton" onClick={handleOpen}>
          Add Blog
        </button>

        {blogArray.map((blog)=>{
            return(<div className="card-container">
                <div className="card-content">
                  <h2 className="card-title">{blog.title}</h2>
                  <p className="card-description">{blog.description}</p>
                  <div className="card-email">
                    Email: <a href={`#`}>{blog.user_email}</a>
                  </div>
                </div>
              </div>)
        })}
        
      </div>
    </div>
  );
}

export default Blog;
