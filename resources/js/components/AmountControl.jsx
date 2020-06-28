import React from 'react'

import { Plus, Dash } from 'react-bootstrap-icons';

import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class AmountControl extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            amount: props.amount,
            amountFocused: false,
            skipDerived: false,
        };

        this.debounceTimeout = null;
        this.updateAmountFromState = this.updateAmountFromState.bind(this);
    }

    onPlus() {
        let amount = this.state.amount + 1;
        this.setState({amount: amount, skipDerived: true})
        this.requestAdmountUpdateDebounced();
    }

    onMinus() {
        let amount = this.state.amount - 1;
        if (amount > 0) {
            this.setState({amount: amount, skipDerived: true});
            this.requestAdmountUpdateDebounced();
        } else if (amount == 0) {
            this.setState({amount: amount, skipDerived: true});
            this.requestAdmountUpdateDebounced();
        }
    }

    requestAdmountUpdateDebounced() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }

        this.debounceTimeout = setTimeout(this.updateAmountFromState, 350);
    }

    updateAmountFromState() {
        this.props.onChange(this.state.amount);
    }

    onChange(event) {
        this.setState({amount: parseInt(event.target.value)||"", skipDerived: true})
    }

    onFocus(event) {
        this.setState({amountFocused: true})
    }

    onBlur(event) {
        let amount = parseInt(event.target.value)||0;
        if (amount > 0) {
            this.setState({amount: amount, amountFocused: false, skipDerived: true})
            this.requestAdmountUpdateDebounced();
        } else if (amount == 0) {
            this.setState({amount: amount, amountFocused: false, skipDerived: true})
            this.requestAdmountUpdateDebounced();
        } else {
            this.setState({amountFocused: false})
        }
    }

    render() {
        return (
            <InputGroup size="sm" style={{width: "100px"}} className={this.props.className}>
                <InputGroup.Prepend>
                        <Button variant="success" onClick={this.onMinus.bind(this)}><Dash /></Button>
                </InputGroup.Prepend>
                <FormControl className="amountInput" type="number" value={this.state.amount} onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
                <InputGroup.Append>
                    <Button variant="success" onClick={this.onPlus.bind(this)}><Plus /></Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }

}

export default AmountControl;