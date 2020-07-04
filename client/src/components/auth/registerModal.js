import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component{
    state ={
        modal: false,
        name: '',
        email: '',
        password:'',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            //check for register error 
            if(error.id === 'REGISTER_FAIL'){
                this.setState( { msg: error.msg.msg});
            }
            else{
                this.setState({ msg: null});
            }
        }

        if(this.state.modal){
            if(isAuthenticated){
                // close the modal
                this.toggle();
            }
        }
    }

    toggle = () =>{
        // Clear Errors 
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e =>{
        e.preventDefault();
        const {name, email, password} = this.state;

        //create user object
        const newUser ={
            name,
            email,
            password
        };
        
        // attempt to regiser
        this.props.register(newUser);
        
    }

    render(){
        return(
            <div>
                <NavLink onClick = {this.toggle} href='#'>
                    Register
                </NavLink>

                <Modal
                    isOpen = {this.state.modal}
                    toogle = {this.toggle}
                >
                    <ModalHeader
                        toogle = {this.toggle}
                    >Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        )
                        :null }
                        <Form onSubmit = {this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input 
                                    type = 'text'
                                    name = 'name'
                                    id = 'name'
                                    placeholder = 'Name'
                                    className= 'mb-3'
                                    onChange = {this.onChange}
                                />
                                <Label for='email'>Email</Label>
                                <Input 
                                    type = 'text'
                                    name = 'email'
                                    id = 'email'
                                    placeholder = 'Email'
                                    className= 'mb-3'
                                    onChange = {this.onChange}
                                />
                                <Label for='password'>Password</Label>
                                <Input 
                                    type = 'password'
                                    name = 'password'
                                    id = 'password'
                                    placeholder = 'Password'
                                    className= 'mb-3'
                                    onChange = {this.onChange}
                                />
                                <Button
                                    color = "dark"
                                    className = 'addItemModalbtn'
                                    block
                                >
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal);