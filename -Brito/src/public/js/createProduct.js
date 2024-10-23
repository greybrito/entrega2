const socket = io();

function createProduct(product) {
    alert(product);
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto creado');
        // Aquí emitir el evento
        socket.emit('agregar-producto', product);
    })
    .catch(error => console.error('Error:', error))
}

socket.on('agregar-producto', (product) => {
    console.log('socket.on: agregar-producto')
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${product.title} - $${product.price}`;
    ul.appendChild(li);
});

socket.on('nuevo-producto', (product) => {
    console.log('socket.on: nuevo-producto')
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${product.title} - $${product.price}`;
    ul.appendChild(li);
});

socket.on('eliminar-producto', (id) => {
    const ul = document.querySelector('ul');
    const lis = ul.querySelectorAll(`li:nth-child(${id})`);
    lis.forEach(lis => lis.remove());
});

socket.on('modificar-producto', (product) => {
    const ul = document.querySelector('ul');
    const lis = ul.querySelectorAll(`li:nth-child(${product.id})`);
    if (lis.length > 0) {
        lis[0].textContent = `${product.title} - $${product.price}`;
    }
});
