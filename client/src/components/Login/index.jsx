import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import loginIcon from '../../images/userlogin.png'
import uiImg from '../../images/login.svg';
import '../design.css'
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Button,Container,Col,Row,Form} from "react-bootstrap";
const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:808/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
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
		<> 
		<Container className="mt-5">
			<Row>
				<Col lg={4} md={6} sn={12} className="text-center mt-5 p-3 ">
           <img className="icon-img" src={loginIcon} alt="icon"/>
		<Form onSubmit={handleSubmit}>
		<Form.Group className="mb-3" controlId="formBasicEmail">
		
		  <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="email"/>


		</Form.Group>
  
		<Form.Group className="mb-3" controlId="formBasicPassword">
		  
		  <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
		</Form.Group>
		<Form.Group className="mb-3" controlId="formBasicCheckbox">
		  <Form.Check type="checkbox" label="Check me out"  />
		</Form.Group>
		{error && <div className="error_msg">{error}</div>}
		<Button variant="primary btn-block" type="submit">
		  Login
		</Button>
		
	  </Form>
	  </Col>
	  <Col lg={8} >
		<img  src={uiImg} className ="w-100" alt=''/>
	      </Col>
		  
		  <Link to="/signup">
						<Button type="Button" variant="primary btn-block">
							Sing Up
						</Button>
					</Link>
		  
	  </Row>
	
	  </Container>
	  </>
	);
};

export default Login;
