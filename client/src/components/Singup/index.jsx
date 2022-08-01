import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import loginIcon from '../../images/userlogin.png'
import uiImg from '../../images/login.svg';
import '../design.css'
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Button,Container,Col,Row,Form} from "react-bootstrap";
const Signup = () => {
	const [data, setData] = useState({  firstName: "",      //// States for registration
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");                 ////States for checking the errors   
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {  ///The handleChange() function to set a new state for input
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();  //The preventDefault() method will prevent the link above from following the URL.
		try {
			const url = "http://localhost:808/api/users";
			const { data: res } = await axios.post(url, data);   // send post request and return response
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<Container className="mt-5">
			<Row>
				<Col lg={4} md={6} sn={12} className="text-center mt-5 p-3 ">
           <img className="icon-img" src={loginIcon} alt="icon"/>
	
					<h1>Welcome Back</h1>
					<Link to="/login">
						<Button type="Button"variant="primary btn-block">
							Sing in
						</Button>
					</Link>
				
		
              <Form onSubmit={handleSubmit}>
 <h1>Create Account</h1>
	  		<Form.Group   className="mb-3"  controlId="formBasicName">
		  <Form.Control type="text" placeholder="First Name" onChange={handleChange} name="firstName" value={data.firstName}/>
         </Form.Group>
 
		
		<Form.Group className="mb-3" controlId="formBasiclastName">
         <Form.Control type="text" placeholder="Last Name" onChange={handleChange} name="lastName"value={data.lastName}/>
        </Form.Group>
		<Form.Group className="mb-3" controlId="formBasicEmail">
		 <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="email" value={data.email}/>
         </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
		<Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password}/>
	  </Form.Group>
	 
	  
				   {error && <div className="error_msg">{error}</div>}
					  <Button type="submit"  variant="primary btn-block">
						  Sing Up
					  </Button>
				 
					  </Form>
					</Col>
	  <Col lg={8} >
		<img  src={uiImg} className ="w-100" alt=''/>
	      </Col>
		 
	  </Row>
	 
	  </Container>
	);
};

export default Signup;




