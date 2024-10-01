import React, { useContext, useEffect, useState } from 'react';
import './Profile.css'
import { AuthContext } from '../contexts/AuthContext';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const Profile = () => {
    console.log("start compo");
    const {user, setUser} = useContext(AuthContext);
    console.log(user);
    const [myRank, setMyRank] = useState(0);
    let userName = user.user.name;
    const [name, setName] = useState(userName? userName : null);

    let con = user.user.contact;
    const [contact, setContact] = useState(con);


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

    

    


    const handleEdit = async()=>{
        try {

            handleClose();
            let myObject={
                name: name,
                contact: contact
            }
            const res = await fetch('http://localhost:8000/api/v1/seller/edituser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  },
                body: JSON.stringify(myObject),
                credentials: "include"
              })

            const data = await res.json();
            
            console.log(data);
            let tempUser = {...data};
            setUser(tempUser);
            localStorage.setItem('currentUser', JSON.stringify(tempUser));
            
        } catch (error) {
             console.log(error);
        }
    }



    const fetchRank = async()=>{
        try {
            console.log(user.user);
            const res = await fetch('http://localhost:8000/api/v1/seller/getrank', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  },
                credentials: "include"
              })

              const data = await res.json();

              setMyRank(data.rank);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        console.log("use effect start");
        fetchRank();
    },[])

    const {logout} = useContext(AuthContext);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false)
         setName(userName)};
  return (
    
    <div className='profile-body'>
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
            Edit
          </Typography>

          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
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

    <div class="profile-container">
        <div class="header">
            <div class="background-img"/>

            <div class="profile-info">
                <div className='img-name'>
                     <div class="profile-img"/>
                         <div className='main-info'>
                             <h1>{name}</h1>
                             <p>{user.type}</p>
                         </div>                    
                     </div>
                </div>  
                           
            </div>

           <div className='rank'>
              <div className='rank-tag'>Waste Crusher Rank</div>
              <p>{myRank}</p>
           </div>  
           

      

            <div className='left-bar'>
                <div class="contact-info">
                    <p><strong>Mobile:</strong> {user.user.contact}</p>
                    <p><strong>Email:</strong> {user.user.email}</p>
                </div>
                <div className='mybuts'>
                   <button class="chat-button" onClick={handleOpen}>Edit</button>
                   <button class="chat-button" onClick={()=>{ logout() }}>Logout</button>
                </div>
                
            </div>
            
     
        </div>

       
    </div>
      
    
  );
};

export default Profile;
