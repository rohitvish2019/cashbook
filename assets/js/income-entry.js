function addNewTransaction(){
    let data = {
        Amount: document.getElementById('amount').value,
        Date:document.getElementById('date').value,
        from : document.getElementById('from').value,
        notes: document.getElementById('notes').value,
        paymentMethod : document.getElementById('paymentMethod').value
    }
    $.ajax({
        type:'POST',
        url:'/transactions/income/add',
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
            document.getElementById('from').value='',
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
            return;
        }
    })
}