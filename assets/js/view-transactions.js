function getTransaction(){
    let data = {
        to:document.getElementById('paidTo').value,
        from:document.getElementById('from').value,
        startDate:document.getElementById('startDate').value,
        endDate:document.getElementById('endDate').value
    }
    $.ajax({
        type:'POST',
        data,
        url:'/transactions/getByFilter',
        success:function(data){
            new Noty({
                theme: 'relax',
                text: 'Success',
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
            showTransactions(data.transactions)
        },
        error:function(err){
            new Noty({
                theme: 'relax',
                text: 'Unable to fetch',
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show();
        }
    })
}

function showTransactions(transactions){
    let totalDebit = 0;
    let totalCredit = 0;
    let balance = 0;
    let container = document.getElementById('transactionTableBody');
    container.innerHTML=``;
    if(transactions.length <= 0){
        let item = document.createElement('tr');
        item.innerHTML=`<td colspan= '9'>No transactions found</td>`
        container.appendChild(item);
        return
    }
    
    for(let i=0;i<transactions.length;i++){
        let item = document.createElement('tr');
        if(transactions[i].type == 'debit') {
            item.innerHTML=
        `
            <td>${i+1}</td>
            <td>${transactions[i].date}</td>
            <td>${transactions[i].from}</td>
            <td>${transactions[i].to}</td>
            <td>-</td>
            <td>₹ ${transactions[i].amount}</td>
            <td>${transactions[i].notes}</td>
            <td>${transactions[i].userName}</td>
            <td>₹ ${transactions[i].currentBalance}</td>
        `
        totalDebit = totalDebit + transactions[i].amount
        } else if(transactions[i].type == 'credit') {
            item.innerHTML=
        `
            <td>${i+1}</td>
            <td>${transactions[i].date}</td>
            <td>${transactions[i].from}</td>
            <td>${transactions[i].to}</td>
            <td>₹ ${transactions[i].amount}</td>
            <td>-</td>
            <td>${transactions[i].notes}</td>
            <td>${transactions[i].userName}</td>
            <td>₹ ${transactions[i].currentBalance}</td>
        `
        totalCredit = totalCredit + transactions[i].amount
        }
        container.appendChild(item)
    }

    document.getElementById('totalDebit').innerText="Total Debit : ₹ " + totalDebit
    document.getElementById('totalCredit').innerText="Total Credit : ₹ " + totalCredit
    balance = Number(totalCredit) - Number(totalDebit)
    document.getElementById('balance').innerText="Balance : ₹ " + balance;
}