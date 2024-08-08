
let tbody = document.getElementById("tbody");



//fetch function
fetch("http://localhost:3000/product")
    .then(res => res.json())
    .then(json => {
        json.map(data =>{
            console.log(data);
            tbody.append(tableData(data));
        })
    })



// create table data

function tableData({product_name, image, id, amount, quantity, available_color, color_quantity, size_quantity}){
    let td = document.createElement('tr');
    td.innerHTML = `
    
<td>
    <div>${product_name}</div>
</td>
<td>
    <div>
        <img src="${image}">
    </div>
</td>
<td>
    <div>&#8358;${amount}</div>
</td>
<td>
    <div>${quantity}</div>
</td>
<td>
    <div class="content-box">
        <div class="color-box">
            <div>
                <div>${available_color[0]}</div>
                <div class="number">${color_quantity[0]}</div>
            </div>
            <div>
                <div>${available_color[1]}</div>
                <div class="number">${color_quantity[1]}</div>
            </div>
            <div>
                <div>${available_color[2]}</div>
                <div class="number">${color_quantity[2]}</div>
            </div>
            <div>
                <div>${available_color[3]}</div>
                <div class="number">${color_quantity[3]}</div>
            </div>
        
        </div>
        <div class="size-box">
            <div>
                <div>6(40)</div>
                <div class="number">${size_quantity[0]}</div>
            </div>
            <div>
                <div>7(41)</div>
                <div class="number">${size_quantity[1]}</div>
            </div>
            <div>
                <div>8(42)</div>
                <div class="number">${size_quantity[2]}</div>
            </div>
            <div>
                <div>9(43)</div>
                <div class="number">${size_quantity[3]}</div>
            </div>
            <div>
                <div>10(44)</div>
                <div class="number">${size_quantity[4]}</div>
            </div>
            <div>
                <div>11(45)</div>
                <div class="number">${size_quantity[5]}</div>
            </div>
            <div>
                <div>12(46)</div>
                <div class="number">${size_quantity[6]}</div>
            </div>
        
        </div>
        
    </div>
</td>
<td>
    <div class="action-box">
        <button id="edit" onclick="editData('${id}')"><i class="fa fa-cog" aria-hidden="true" ></i> Edit</button>
        <button id="notification"><i class="fa fa-bell-o" aria-hidden="true" ></i> </button>
        <button id="visible"><i class="fa fa-eye" aria-hidden="true" id="eye"></i> <i class="fa fa-eye-slash" aria-hidden="true" id="eye-slash"></i> </button>
        <button id="delete" onclick="deleteData('${id}')"><i class="fa fa-trash-o" aria-hidden="true" ></i> Delete</button>
    </div>
</td>
    `;

    return td


    
}


// push data function for the ADD BUTTON (for adding new data)

const formEl = document.querySelector('#add_form');
formEl.addEventListener('submit', event => {
    event.preventDefault();
    

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    // const dataInput = JSON.stringify(data)
    const dataEntries = {
        "product_name": data.product_name,
        "image": data.image,
        "amount": data.amount,
        "quantity": data.quantity,
        "available_color": data.available_color.split(","),
        "color_quantity": data.color_quantity.split(","),
        "size_quantity": data.size_quantity.split(","),
    }

    fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
       body:  JSON.stringify(dataEntries)
    }).then(res => res.json())
      .then(dataEntries => console.log(dataEntries))

});


//delete data function for the DELETE BUTTON (for deleting already existing data in the JSON server)

function deleteData(product_id){
     fetch('http://localhost:3000/product/' + product_id, {
        method: 'DELETE',
    }).then(res => res.json())
}   



//edit data function for the EDIT BUTTON (for editing already existing data in the JSON server) 

function editData(product_id){

    const formEl = document.querySelector('#edit-form');
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    const payload = {
        "product_name": data.product_name,
        "image": data.image,
        "amount": data.amount,
        "quantity": data.quantity,
        "available_color": data.available_color.split(","),
        "color_quantity": data.color_quantity.split(","),
        "size_quantity": data.size_quantity.split(","),
   };

    fetch('http://localhost:3000/product/' + product_id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(payload)
    }).then(res => res.json());

}





