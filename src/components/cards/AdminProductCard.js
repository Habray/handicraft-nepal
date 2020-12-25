import React from "react";
import { Card } from "antd";
import defaultImage from '../../images/defaultImage.jpg'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Card

      // this is for showing image
      cover={
        <img
        // if we have imgae then it will be shown if no image is found defaultImage will be shown
          src={images && images.length ? images[0].url : defaultImage}
          style={{ height: "150px", objectFit: "contain" }}
          className="p-1"
        />
      }

      // for edit and delete sections
      actions={[
        // whenever admin click on the edit icon he will be redirect to this link
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className='text-success' />
        </Link>, 

        // we use arrow function on handleRemove because otherwise it will directly execute the function with out waiting for click event
        <DeleteOutlined className='text-danger'onClick={()=>handleRemove(slug)} />
      ]}
    >

      {/* for title and descriptions */}
      {/* we use substing so that our all description will not be shown but only 40 letter from beginning */}
      <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
    </Card>
  );
};

export default AdminProductCard;
