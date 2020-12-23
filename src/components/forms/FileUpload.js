import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Avatar, Badge} from 'antd'

const FileUpload = ({values, setValues, setLoading}) => {

    // redux for geting user token
    const {user} = useSelector((state) => ({...state}))

    const fileUploadAndResize = (e) => {
        // console.log(e.target.files)

        // resize
        let files = e.target.files

        // saving image in array of images[] in - ProductCreate
        let allUploadedFiles = values.images

        if(files) { 
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i], 
                    720, 
                    720, 
                    'JPEG', 
                    100, 
                    0, 
                    (uri) => {
                    //   console.log(uri)
                      axios
                        .post(
                            `${process.env.REACT_APP_API}/uploadimages`,
                            {image: uri}, 
                            {
                                headers: {
                                    authtoken: user ? user.token : '',
                                },
                            }
                        )
                        .then((res) => {
                            console.log('IMAGE UPLOAD RES DATA', res)
                            setLoading(false)
                            allUploadedFiles.push(res.data)

                            console.log("YOU HIT TEHN RES", res)
                            // pushing all values of image in image property
                            setValues({...values, images: allUploadedFiles})
                        })
                        .catch((err) => {
                            setLoading(false)
                            console.log('CLOUDINARY UPLOAD ERR', err)
                        })
                },
                'base64'
                )
            }
        }
    //     // send back to server to upload to cloudinary
    //     // set url to images[] in parent component state - ProductCreate
    }

    const handleImageRemove = (id) => {
        setLoading(true)
        // console.log('remove image', id)

        // sending remove request to backend
        axios.post(
            `${process.env.REACT_APP_API}/removeimage`, 
            {public_id: id},
            {
                headers: {
                    authtoken: user ? user.token : '',
                },
            }
        )
        .then((res) => {
            setLoading(false)

            // we have to remove image from the state because it will be showing ProductCreate page.
            // destructure
            const {images} = values
            
            // now we have images we put the filter method
            // filter will be applied to each images and search for public_id of image
            let filteredImages = images.filter((item) => {
                // if found matching public_id with removed image public_id, remove that item so that it will not be shown on  ProductCreate page
                return item.public_id !== id
            })

            // reset the state so that it will no longer have the deleted values
            // it also will delete image from cloudinary as we programed in backend
            setValues({...values, images: filteredImages})
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
    

    return(
        <>

        {/* for Previewing the image file */}
        <div className="row">
            {values.images && values.images.map((image) => (
                <Badge 
                  count='X' 
                  key={image.public_id} 
                  onClick={() => handleImageRemove(image.public_id)} // this function will exicute here directly. Beacuse of that we need to use arrow function when we use like this
                  style={{cursor: 'pointer'}}
                >
                    <Avatar  
                        src={image.url} 
                        size={100} 
                        className='ml-3'
                        shape='square'
                    />
                </Badge>
            ))}
        </div>

        <br/>
        {/* for choosing and submitting the image file */}
        <div className="row">
            <label className='btn btn-primary btn-raised'>
                Choose File
                <input 
                  type="file" 
                  multiple 
                  hidden
                  accept='images/*' 
                  onChange={fileUploadAndResize} 
                />
            </label>
        </div>
        </>
    )
}

export default FileUpload