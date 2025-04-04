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
        notes: document.getElementById('notes').value,
        paymentMethod : document.getElementById('paymentMethod').value
    }
    $.ajax({
        type:'POST',
        url:'/transactions/addNew',
        data,
        success:function(data){
            new Noty({
                theme: 'relax',
                text: 'Transaction Success',
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
            document.getElementById('amount').value='',
            document.getElementById('date').value='',
            document.getElementById('paidTo').value='',
            document.getElementById('notes').value='',
            document.getElementById('paymentMethod').value=''
            return;
        },
        error:function(err){
            new Noty({
                theme: 'relax',
                text: 'Transaction Error',
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show();
        }
    })
}
