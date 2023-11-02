const api_url = 'https://enrollment.gameontech.co.uk/customers/send_support_mail';

var customer = {
    full_name: "",
    email:"",
    phone_number:"",
    contact_reason:"",
    message:""
};


if(customer.full_name != null)
{
    console.log(document.getElementById("input_customer_name").value);
}

function GetContactReasonValue(){
    var contactreason_radiobuttons = document.getElementsByName('contactreason_radiobutton');
    var contact_reason_value = "";
    for(var i = 0; i < contactreason_radiobuttons.length; i++){
        if(contactreason_radiobuttons[i].checked){
            contact_reason_value = contactreason_radiobuttons[i].value;
            console.log(contactreason_radiobuttons[i].value + " - " +contact_reason_value);
            return contact_reason_value;
        }
    }
}

async function Send_Support_Mail(){
    try{
        customer.full_name = input_customer_name.value + " " + input_customer_surname.value;
        customer.email = input_customer_email.value;
        customer.phone_number = input_customer_phone.value;
        customer.contact_reason = GetContactReasonValue();
        customer.message = input_customer_message.value;
        document.getElementById("contact_submit_button").disabled = true;
        const params = new URLSearchParams({
            'full_name': customer.full_name,
            'email': customer.email,
            'phone': customer.phone_number,
            'school_name': customer.contact_reason,
            'message': customer.message,
        });
        const headers = {
            'accept': 'application/json',
        };
        const response = await fetch(api_url + '?' + params.toString(), {
            method: 'POST',
            headers: headers,
        });
        if(response.status == "201"){
            setTimeout(() => { alert("Mesajınız başarıyla iletildi!"); location.reload(); }, 2000);
        }
        else{ alert("Please enter valid information!"); }
    }catch(error){ alert("Error! " + error.message); }
}