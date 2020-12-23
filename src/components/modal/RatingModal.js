import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import {useHistory, useParams} from 'react-router-dom'

// children props is StarRating of cards/SingleProduct and we are going to wrap it with this model
const RatingModal = ({ children }) => {

  // access user from redux
  const { user } = useSelector((state) => ({ ...state }));

  // used for control for the visiblility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // for accessing the history
  let history = useHistory()

  // for accessing the slug as params
  let {slug} = useParams()

  // if user is not login we shouldn't give access to modal
  const handleModal = () => {
    if(user && user.token) {
      setModalVisible(true)
    } else {
      history.push({
        pathname: '/login', // if user is not login then we will redirect them to login page
        // after user login then we redirect them to same product page and "slug" is access with params as we decleared on client/App.js
        // we also make change on Login page
        state: {from: `/product/${slug}`}  
      })
    }
  }

  return (
    <>

      {/* Button to Leave rating or login to leave rating */}
      {/* this will be placed on the side of the Add to Wishlist button */}
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>

      {/* when they clicked on the button this modal will work */}
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        // after leaving the start and user press ok then this will active
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review.");
        }}
        // but if they cancel with out giving rating
        onCancel={() => setModalVisible(false)}
      >
        
        {/* this children is acutally the StarRating of cards/SingleProduct */}
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
