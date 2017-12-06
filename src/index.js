import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class BudgetTable extends React.Component {
    constructor(props) {
        super(props);
        var t = null;
        if (localStorage.getItem("transactions") != null) {
            t = JSON.parse(localStorage.getItem("transactions"));
        }
        else {
            t = [];
        }

        this.state = {
            transactions: t
        }
    }

    getRows() {
        var r = "";
        for(var i = 0; i < this.state.transactions.length; i++) {
            r += (<TransactionRow description={this.state.transactions[i].description} amount={this.state.transactions[i].amount}/>)
        }

        return r;
    }

    render() {

        return (
            <table class="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        )
    }


}


class TransactionRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.description}</td>
                <td>{this.props.amount}</td>
            </tr>
        )
    }
}

class Button extends React.Component {
    render() {
        return (
            <button className={this.props.style} onClick={this.props.onClick()}>{this.props.text}</button>
        )
    }
}

class BudgetControls extends React.Component {
    addTransaction() {
        alert("Add")
    }

    deleteTransaction() {
        alert("DELETE")
    }

    render() {
        return (
            <div>
                <div class="form-group">
                    {<Button style={"btn btn-primary"} onClick={() => this.addTransaction} text={"Add Transaction"} />}
                </div>
                <div class="form-group">
                    {<Button style={"btn btn-primary"} onClick={() => this.deleteTransaction} text={"Delete Transaction"} />}
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <BudgetTable />,
    document.getElementById('root')
);

ReactDOM.render(
    <BudgetControls />,
    document.getElementById("controls")
);