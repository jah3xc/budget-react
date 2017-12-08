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

    getDescriptions() {
        var d = [];
        this.state.transactions.forEach(function(s) {
            d.push("<option>" + s.description + "</option>");
        });

        return d.join("");

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
            <table className="table">
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
        return(
            <div>
                <label className="control-label">Description</label>
                <input className="form-control" />
                <label className="control-label">Amount</label>
                <input className="form-control" type="number" />
                <button className="btn btn-primary">Add Transaction</button>

            </div>
        )
    }
}

class DeleteTransaction extends React.Component {
    render() {
        var bt = new BudgetTable([]);
        var d = bt.getDescriptions();
        return(
            <div>
                <label className="control-label">Choose a Transaction: </label>
                <select className="form-control">
                    {d}
                </select>
                <button className="btn btn-primary">Delete Transaction</button>

            </div>
        )
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
                <div className="form-group">
                    {<Button style={"btn btn-primary"} onClick={() => this.addTransaction} text={"Add Transaction"} />}
                </div>
                <div className="form-group">
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
    <AddTransaction />,
    document.getElementById("add_form")
);

ReactDOM.render(
    <DeleteTransaction />,
    document.getElementById("delete_form")
);