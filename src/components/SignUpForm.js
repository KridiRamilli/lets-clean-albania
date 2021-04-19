import React from "react";
import Input from "./Input";
import "./Form.css";
import {Link} from "react-router-dom";
import Fade from "react-reveal/Fade";
import {auth} from "../../src/firebase";
import SignUpSuccess from "./SignUpSuccess"



class SignUpForm extends React.Component{
    state = { 
        username:'',
        email: '',
        password: '',
        confirmPass: '',
        isSignedUp: false,
        errors:{
            username:{
                result:'',
                message:''
            },
            email: {
                result:'',
                message:''
            },
            password:{
                result: '',
                message: ''
            }
        },
        shouldCheckInput: false
    }

    handleChange = (ev) => {
        const {username} = this.state
      const {name,value} = ev.target;
      this.setState({
          [name]:value
      })
      
    }
    
    handleSubmit = () => {
        const{email, password} = this.state
        this.setState({
            shouldCheckInput: true
        })
        this.validateData()
        //#region Make request to Firebase
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            if(user){
                this.setState({
                    isSignedUp: true
                },this.clearState)
                
         }
        })
        .catch((error) => {
           var errorCode = error.code;
           var errorMessage = error.message;
           console.error(errorCode, errorMessage) 
        });
        //#endregion 
        

    }

    clearState = () => {
        this.setState({
            username:'',
            email: '',
            password: '',
            confirmPass: ''
        })
    }

    //TODO Errors and Validation
    validateData = () => {
     const {username, email, password, confirmPass} = this.state
     this.validateUsername(username)
     this.validateEmail(email)
     this.validatePassword(password,confirmPass)
     

   }

validateUsername = (username) => {
        console.log('called');
        let {errors:{
            username:{
                message,
                result,
            }
        }} = this.state;
       result=''
       message=''
    if(username.trim().length < 3){
        result = 'error'
        message = 'Username is too short or empty!'
        }
    if(!(/^([^0-9]*)$/).test(username)){
        result = 'error'
        message ='Username can not contain numbers!'
    }
    if(result){
            this.setState(prevState => (
                {
                    ...prevState,errors:{...prevState.errors,username:{result,message}}
                }
            ))
            return false
        } else {
            this.setState(prevState => (
                {
                    ...prevState,errors:{...prevState.errors,username:{result:'success',message:''}}
                }
            ))
        return true
    }
   }

   validateEmail = (email) => {
       let {errors:{
           email:{
               message,
               result
           }
       }} = this.state
       let emailTest= new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
       message=''
       result = ''
       if(email.trim() < 4){
            message = 'Email is too short or empty!'
            result = 'error'
       }

       if(!emailTest.test(email)){
        message = 'Email is not valid format!'
        result = 'error'
       }
     if(result){
        this.setState(prevState => (
            {
                ...prevState,errors:{...prevState.errors,email:{result,message}}
            }
        ))
        return false
    } else {
        this.setState(prevState => (
            {
                ...prevState,errors:{...prevState.errors,email:{result:'success',message:''}}
            }
        ))
    return true
}
     
   }

   validatePassword = (password, confirmPass) => {
    let {errors:{
        password:{
            message,
            result
        }
    }} = this.state

    message = '';
    result = '';

    if((!password) && (!confirmPass)){
     message = 'Password && Confirm Password is required!'
     result = 'error'
    }
    if(password !== confirmPass) {
     message = "Your password don't match!"
     result = 'error'
    }

    if(result){
        this.setState(prevState => (
            {
                ...prevState,errors:{...prevState.errors,password:{result,message}}
            }
        ))
        return false
    } else {
        this.setState(prevState => (
            {
                ...prevState,errors:{...prevState.errors,password:{result:'success',message:''}}
            }
        ))
    return true
    }

}

   checkInput = (input) => {
        
       console.log('from Input',input)
        const {result,message} = this.state.errors[input];
        return {result,message};
   }


   removeError = (input) => {
       const {errors} = this.state;
       const filteredErrors = errors.filter(el => (!el.toLowerCase().includes(input)))
       console.log(filteredErrors);
       this.setState({
           errors: filteredErrors
       })
   }


    render(){
        const {username, email, password, confirmPass,isSignedUp,shouldCheckInput} = this.state
        console.log(this.state)
        return (
                <Fade left duration={600} distance="50px">
                    <div className="form">
                    {isSignedUp ? (<SignUpSuccess/>) : 
                        (<>
                            <h1 className="form__title">Welcome!</h1>
                            <p className="form__subtitle">Please Sign Up to start making our country green!</p>
                            <Input validation={shouldCheckInput && this.checkInput('username')} value={username}  handleChange={this.handleChange} type="text" name={'username'} placeholder="Name..."/>
                            <Input validation={shouldCheckInput && this.checkInput('email')} value={email} handleChange={this.handleChange} type="email" name={'email'} placeholder="Email..."/>
                            <Input validation={shouldCheckInput && this.checkInput('password')} value={password} handleChange={this.handleChange} type="password" name={'password'} placeholder="Password..."/>
                            <Input validation={shouldCheckInput && this.checkInput('password')} value={confirmPass} handleChange={this.handleChange} type="password" name={'confirmPass'} placeholder="Confirm Password..."/>
                            <Input handleSubmit={this.handleSubmit} type="button" className={'form__submit'} value="Sign Up"/>
                            <Link to="/signIn" className="form__link">Already signed up?</Link>
                        </>)}
                    </div>
                </Fade>
        )
    }
}

export default SignUpForm