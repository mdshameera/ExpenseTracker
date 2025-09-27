import React from "react";
import { Balance } from "../components/Balance";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { TransactionList } from "../components/TransactionList";
import { AddTransaction } from "../components/AddTransaction";
import { Header } from "../components/Header";

const Default = () => {
    return (
        <>
            <Header/>
				<div className='maincontainer'>
					<div className='container'>
						<Balance />
						<IncomeExpenses />
						<TransactionList />
						<AddTransaction />
					</div>
					<div>
						<img className='imageclass' src='/expense_pic.png'></img>
					</div>
				</div>
			</>
		);
};

export default Default;
