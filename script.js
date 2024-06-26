document.addEventListener('DOMContentLoaded', function() {
    const updateButtons = document.querySelectorAll('.btn-outline-secondary');
    updateButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const input = event.target.closest('.input-group').querySelector('input');
            const currentValue = parseInt(input.value);
            const isIncrement = event.target.textContent === '+';
            
            if (isIncrement) {
                input.value = currentValue + 1;
            } else {
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
            }

            updateTotalPrice();
        });
    });

    function updateTotalPrice() {
        const cartItems = document.querySelectorAll('.card');
        let subtotal = 0;

        cartItems.forEach(item => {
            const priceElement = item.querySelector('.card-text');
            const price = parseFloat(priceElement.textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('input').value);
            const totalPriceElement = item.querySelector('.card-body p:last-child');
            const totalPrice = price * quantity;

            totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
            subtotal += totalPrice;
        });

        document.querySelector('.list-group-item:nth-child(1) .float-right').textContent = `$${subtotal.toFixed(2)}`;
        const discount = parseFloat(document.querySelector('.list-group-item:nth-child(3) .float-right').textContent.replace('-$', ''));
        const total = subtotal - discount;
        document.querySelector('.list-group-item:nth-child(4) .float-right').textContent = `$${total.toFixed(2)}`;
    }

    updateTotalPrice();
});
