const socket = io();

const form = document.querySelector( '.form-section' );

form.addEventListener( 'submit', async ( e ) => {
  e.preventDefault();

  try {
    const product = {
      title: form.title.value,
      description: form.description.value,
      code: form.code.value,
      price: form.price.value,
      status: form.status.value,
      stock: form.stock.value,
      category: form.category.value,
      thumbnails: form.thumbnails.value,
    };

    // Emit a 'new-product'
    socket.emit( 'new-product', product );

  } catch ( error ) {
    console.error( error );

  } finally {
    form.reset();
  }
} );

socket.on( 'update-products', ( products ) => {
  const productList = document.querySelector( '.products-list' );
  productList.innerHTML = '';

  products.forEach( ( product ) => {
    productList.innerHTML += `
      <li class='product-item' data-id='${product.id}'>
        <div class='product-item__body'>
          <p class='ff-secondary fs-2 ls-1'>${product.title}</p>
          <p>${product.category}</p>
          <p>${product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
        <div class='product-item__buttons'>
          <button class='btn-edit ff-secondary fs-2'>Edit</button>
          <button class='btn-delete ff-secondary fs-2'>Delete</button>
        </div>
      </li>
      `;
  } );

  // Add event listeners to all Delete buttons
  document.querySelectorAll( '.btn-delete' ).forEach( ( button ) => {
    button.addEventListener( 'click', ( event ) => {
      const productItem = event.target.closest( '.product-item' );
      const productId = productItem.dataset.id;

      console.log( 'btn delete clicked' );

      // Emit a 'delete-product' event
      socket.emit( 'delete-product', productId );
    } );
  } );
} );
