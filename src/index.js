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


class AddTransaction extends React.Component {
    render() {
        <div class="modal fade">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

class BudgetControls extends React.Component {
    addTransaction() {
        alert("ADD")
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