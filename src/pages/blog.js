import { useState, useEffect, useContext } from "react";
import React from "react";
import "./blog.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

function Blog() {
  // console.log(("Inside Component"));
  // let blogdata = localStorage.getItem("blogs");
  // console.log(blogdata);
  // const arr = JSON.parse(blogdata)?.arrblogs;
  const {user} = useContext(AuthContext);
  const [blogArray, setBlogArray] = useState([]);

  const fetchBlogs = async () => {
    try {
      console.log(("Inside Fetch"));
      const res = await fetch("http://localhost:8000/api/v1/seller/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setBlogArray([...data.arrblogs])

      localStorage.setItem("blogs", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
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

  const handleAddBlog = async() => {
    handleClose();
    if (title && description) {
      console.log("Blog Added:", { title, description });
      try {
        let currentUser = ''
        if(user.type === 'Vendor'){
            currentUser = 'vendor'
        } else{
          currentUser = 'seller'
        }
        const res = await fetch(`http://localhost:8000/api/v1/${currentUser}/add-blog`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
          credentials: "include"
        })

        const data = await res.json();
        console.log(data);
        let existing = [...blogArray];

        setBlogArray([data.blog, ...existing]);
        console.log(blogArray);
      } catch (error) {
          console.log(error);
      }
      setTitle("");
      setDescription("");
      
     
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
              bgcolor: "#f56a58",
              "&:hover": {
                bgcolor: "#ff3b22",
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
          Add Your Blog
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
            </div>
            )
        })}
        
      </div>
    </div>
  );
}

export default Blog;
