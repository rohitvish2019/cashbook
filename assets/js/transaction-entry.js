document.getElementById("transactionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const transaction = {
        amount: document.getElementById("amount").value,
        date: document.getElementById("date").value,
        category: document.getElementById("category").value,
        paymentMethod: document.getElementById("paymentMethod").value,
        description: document.getElementById("description").value
    };
    console.log("Transaction Submitted:", transaction);
    alert("Transaction Added Successfully!");
    this.reset();
});


function addNewTransaction(){
    let data = {
        Amount: document.getElementById('amount').value,
        Date:document.getElementById('date').value,
        to : document.getElementById('paidTo').value,
        from : document.getElementById('from').value,
        notes: document.getElementById('notes').value,
        paymentMethod : document.getElementById('paymentMethod').value
    }
    $.ajax({
        type:'POST',
        url:'/transactions/addNew',
        data,
        success:function(data){console.log(data)},
        error:function(err){console.log(err)}
    })
    try{
        axios.post('/transactions/addNew', {Amount: document.getElementById('amount').value});
    }catch(err){
        console.log("Unable to save transaction")
    }
}
