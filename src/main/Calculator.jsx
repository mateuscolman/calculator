import React, { Component } from 'react';
import './Calculator.css';
import '../components/Button'
import Display from '../components/Display'
import Button from '../components/Button';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
}

export default class Calculator extends Component {
    state = {...initialState};
    clearMemory(){
        this.setState({...initialState});
        console.log(this.state.clearDisplay);
    };

    mathOperation(value, operation){
        switch(operation){
            case '/' :{
                return (value[0]/value[1]);
            };
            case '*':{
                return (value[0]*value[1]);
            };
            case '+':{
                return (value[0]+value[1]);
            };
            case '-':{
                return (value[0]-value[1]);
            };
    }
};

    setOperation(operation){
        if (this.state.current === 0){
            this.setState({current: 1, clearDisplay: true, operation})}
        else{
            const finish = operation === '=';
            const currentOperation = this.state.operation;
            
            const values = {...this.state.values};
            values[0] = this.mathOperation(values, currentOperation);
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                values: [values[0],0],
                operation: finish ? null : operation,
                current: finish ? 0 : 1,
                clearDisplay: !finish,
            })
            }

    };

    addDigit(d){
        if (d === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + d;
        this.setState({displayValue, clearDisplay: false})

        if (d !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({values});
            console.log(values);
        }
        

    };

    render() {
        const addDigit = n => this.addDigit(n);
        const setOperation = op => this.setOperation(op);
        return (
            <div className="calculator"> 
                < Display value={this.state.displayValue} />
                < Button label='AC' click={() => this.clearMemory()} triple/>
                < Button label='/' click={setOperation} operation/>
                < Button label='7' click={addDigit}/>
                < Button label='8' click={addDigit}/>
                < Button label='9' click={addDigit}/>
                < Button label='*' click={setOperation} operation/>
                < Button label='4' click={addDigit}/>
                < Button label='5' click={addDigit}/>
                < Button label='6' click={addDigit}/>
                < Button label='-' click={setOperation} operation/>
                < Button label='1' click={addDigit}/>
                < Button label='2' click={addDigit}/>
                < Button label='3' click={addDigit}/>
                < Button label='+' click={setOperation} operation/>
                < Button label='0' click={addDigit} double/>
                < Button label='.' click={addDigit}/>
                < Button label='=' click={setOperation} operation/>
            </div>
        )
        
    }
} 