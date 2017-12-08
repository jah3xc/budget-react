import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


class BudgetTable extends React.Component {
    constructor(props) {
        super(props);
        let t = null;
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

    setLocalStorage = () => {
        localStorage.setItem("transactions", JSON.stringify(this.state.transactions));
        window.location.reload(true);
    };

    deleteTransaction = () => {
        let d = document.getElementById("description_to_delete").value;
        let s = [];
        this.state.transactions.forEach(function(t) {
            if (t.description !== d) {
                s.push(t);
            }
        });

        this.state.transactions = s;
        this.setLocalStorage();

    };

    addTransaction = () => {
        let d = document.getElementById("new_d").value;
        let a = document.getElementById("new_a").value;
        let t = {
            "description" : d,
            "amount": a
        };

        this.state.transactions.push(t);
        this.setLocalStorage()

    };

    getDescriptions = () => {
        let d = [];
        this.state.transactions.forEach(function(s) {
            d.push(<option>{s.description}</option>);
        });

        return d;

    };

    getRows = (i) => {
        let r = "";
        let p = [];
        for(let i = 0; i < this.state.transactions.length; i++) {

            let d = this.state.transactions[i].description;
            let a = this.state.transactions[i].amount;
            console.log(d);
            r =  <tr><td> {String(d)} </td><td>{String(a)}</td></tr>;
            p.push(r)
        }

        return p;
    };

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
        console.log("HI" + this.props.transaction);
        return (
            <tr>
                <td>{this.props.transaction.description}</td>
                <td>{this.props.transaction.amount}</td>
            </tr>
        )
    }
}

class Button extends React.Component {
    render() {
        return (
            <button className={this.props.style} onClick={this.props.onClick}>{this.props.text}</button>
        )
    }
}


class AddTransaction extends React.Component {
    render() {
        let bt = new BudgetTable([]);
        return(
            <div>
                <label className="control-label">Description</label>
                <input className="form-control" id={"new_d"}/>
                <label className="control-label">Amount</label>
                <input className="form-control" type="number" id={"new_a"} />
                <Button style={"btn btn-primary"} onClick={bt.addTransaction} text={"Add Transaction"} />

            </div>
        )
    }
}

class DeleteTransaction extends React.Component {
    render() {
        let bt = new BudgetTable([]);
        let d = bt.getDescriptions();
        return(
            <div>
                <label className="control-label">Choose a Transaction: </label>
                <select className="form-control" id={"description_to_delete"}>
                    {d}
                </select>
                <Button style={"btn btn-primary"} onClick={bt.deleteTransaction} text={"Delete Transaction"} />

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