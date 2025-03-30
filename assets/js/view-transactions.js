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
            showTransactions(data.transactions)
        },
        error:function(err){}
    })
}

function showTransactions(transactions){
    console.log("Transactions");
    console.log(transactions)
    let container = document.getElementById('transactionTableBody');
    container.innerHTML=``;
    for(let i=0;i<transactions.length;i++){
        let item = document.createElement('tr');
        item.innerHTML=
        `
            <td>${i+1}</td>
            <td>${transactions[i].date}</td>
            <td>${transactions[i].from}</td>
            <td>${transactions[i].to}</td>
            <td>${transactions[i].amount}</td>
            <td>${transactions[i].notes}</td>
            <td>${transactions[i].userName}</td>
        `
        container.appendChild(item)
    }
}