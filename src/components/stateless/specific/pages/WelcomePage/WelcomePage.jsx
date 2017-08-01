import React, {Component} from "react";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import { Link } from 'react-router-dom';
import Button from "../../../generic/Button/Button";
import InputField from "../../../generic/InputField/InputField";
import TextField from "../../../generic/TextField/TextField";
import { createBrowserHistory } from "history";


class WelcomePage extends Component {
    
    render() {
        return (
        <div>
            <NavigationBar title="Welcome">        
                <Link className="navigation__link" to="/create-market">
                	<Button className='navigation__create-offer-button'>
                    	Create new market
                    </Button>
                </Link>
            </NavigationBar>        
    		
    		<h1> Enter address of a market: </h1>

    		<TextField label="Market address" inputRef={el => this.addressField = el}/> 
            <br/>
            <br/>
            <Button className='navigation__create-offer-button' onClick={ (e) => this.props.goOnClick(this.addressField.value) }> Go </Button>
        </div>)
    }
}

export default WelcomePage;