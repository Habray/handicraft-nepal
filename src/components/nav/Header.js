import {useState} from 'react'; //it allow us to create local state
import { Menu, Badge } from 'antd';
import { 
  AppstoreOutlined, 
  UserOutlined, 
  UserAddOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'; // we have to install it. icons & antd and import each icons here.
import {Link} from 'react-router-dom';
import firebase from 'firebase';

// useDispatch is used whenever we want to dispatch some data to redux state so that we can update redux state
// useSelectore is used when we want to get data from the state
import {useDispatch, useSelector} from 'react-redux'; 
import {useHistory} from 'react-router-dom';  // need to import this to use again because we distructure history while using a props
import Search from "../forms/Search";

// make SubMenu and Item shortcut to Menu only
const { SubMenu, Item } = Menu;



const Header = () => {
    // which ever we click in under the navbar below will be available in set state
    const [current, setCurrent] = useState(["home"])
    let dispatch = useDispatch()
    let history = useHistory() // now again it is available to use 

    // Instead of fetching all state we can only fetch data that are defined by use inside our reducers/index.js
    // let state = useSelector((state) => (state)) 
    // Like this
    let {user, cart} = useSelector((state) => ({...state})) 

    // when any of the item is clicked, it will triger event (e) 
    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
      firebase.auth().signOut()
      dispatch({
        type: 'LOGOUT',
        payload: null,
      })
      history.push('/login') // to push user to lonin
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">

        {/* For Home Menu */}
        <Item key="home" icon={<AppstoreOutlined />}>
          {/* 'link' = 'a' of html and 'to' = 'href' of html */}
          {/* we have define this path in our App.js file */}
          <Link to='/'>Home</Link>
        </Item>

        {/* For Shop Page */}
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Item>

        {/* For Cart Page */}
        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            {/* with badge we show no. of products in cart */}
            <Badge count={cart.length} offset={[9, 0]}> 
              Cart
            </Badge>
          </Link>
        </Item>

        {/* show Register Menu if only user is not login */}
        {!user && (
          <Item key="register" icon={<UserAddOutlined />} className='float-right'>
            <Link to='/register'>Register</Link>
          </Item>
        )}

        {/* show Login Menu if only user is not login */}
        {!user && (
        <Item key="login" icon={<UserOutlined />} className='float-right'>
          <Link to='/login'>Login</Link>
        </Item>
        )}
        
        {/* show User Profile Menu if only user is login */}
        {user && (
          <SubMenu
          icon={<SettingOutlined />}
          // take a email of user and split it before and after @ and take only the items before the @ in array
          title = {user.email && user.email.split('@')[0]} 
          className="float-right"
          >
            {/* for users and redirect to history */}
            {user && user.role === 'subscriber' && (
              <Item>
                <Link to='/user/history'>Dashboard</Link>
              </Item>
            )}

            {/* for admins and redirect to dashboard */}
            {user && user.role === 'admin' && (
              <Item>
                <Link to='/admin/dashboard'>Dashboard</Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
        </SubMenu>
        )}

      {/* search bar components */}
      <span className="float-right p-1">
        <Search />
      </span>
      </Menu>
    )
}

export default Header;