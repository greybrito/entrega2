const socket = io();

function updateProductsList ( product ) {
  const productList = document.querySelector( '.products-list' );
    productList.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="agregarProducto({id: {{id}}, title: '{{title}}', description: '{{description}}', code: {{code}}, price: {{price}}, status: {{status}}, stock: {{stock}}, category: '{{category}}', thumbnails: '{{thumbnails}}'  })">Agregar al carrito</button>
                    <button class="btn btn-warning btn-sm" onclick="modificarProducto({{id}})">Modificar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto({{id}})">Eliminar</button>
                </td>
            </tr>
      `;
}
socket.on( 'update-products', updateProductsList );