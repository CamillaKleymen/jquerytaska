$(document).ready(function() {

    const products = [
        { name: 'Товар 1', price: 100, color: 'красный' },
        { name: 'Товар 2', price: 150, color: 'синий' },
        { name: 'Товар 3', price: 200, color: 'зеленый' },
        { name: 'Товар 4', price: 250, color: 'черный' }
    ];


    function renderProducts() {
        $('#products').empty();
        products.forEach((product, index) => {
            $('#products').append(`
                <div>
                    <h3>${product.name}</h3>
                    <p>Цена: ${product.price} руб.</p>
                    <p>Цвет: ${product.color}</p>
                    <button class="add-to-cart" data-index="${index}">Добавить в корзину</button>
                </div>
            `);
        });
    }


    function updateCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    $(document).on('click', '.add-to-cart', function() {
        const productIndex = $(this).data('index');
        const product = products[productIndex];
        let cart = getCart();

        const existingProduct = cart.find(item => item.name === product.name && item.color === product.color);
        if (!existingProduct) {
            cart.push(product);
            updateCart(cart);
            alert('Товар добавлен в корзину');
        } else {
            alert('Товар с таким цветом уже в корзине');
        }
    });

    function renderCart() {
        const cart = getCart();
        $('#cart-items').empty();
        let totalPrice = 0;

        cart.forEach((item, index) => {
            $('#cart-items').append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.color}</td>
                    <td>${item.price} руб.</td>
                    <td><button class="remove-from-cart" data-index="${index}">Удалить</button></td>
                </tr>
            `);
            totalPrice += item.price;
        });

        $('#total-price').text(totalPrice);
    }

    $(document).on('click', '.remove-from-cart', function() {
        const itemIndex = $(this).data('index');
        let cart = getCart();
        cart.splice(itemIndex, 1);
        updateCart(cart);
        renderCart();
    });

    if ($('#products').length) {
        renderProducts();
    }

    if ($('#cart-items').length) {
        renderCart();
    }
});
