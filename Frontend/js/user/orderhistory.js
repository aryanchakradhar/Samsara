document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch pending orders data from the API
    function fetchPendingOrders() {
        fetch('http://localhost:4000/api/v1/order/user/orderHistory/PENDING', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            createPendingOrdersTable(data.data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    // Function to create pending orders table
    function createPendingOrdersTable(pendingOrdersData) {
        const pendingOrdersContainer = document.getElementById('pending-orders');

        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';

        const table = document.createElement('table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Order ID', 'Product Name', 'Status', 'Price', 'Cancel'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        pendingOrdersData.forEach(order => {
            order.product.forEach(item => {
                const row = document.createElement('tr');

                const orderIdCell = document.createElement('td');
                orderIdCell.textContent = order._id;
                row.appendChild(orderIdCell);

                const productNameCell = document.createElement('td');
                productNameCell.textContent = item.name;
                row.appendChild(productNameCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = order.status;
                row.appendChild(statusCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = order.orderPrice;
                row.appendChild(priceCell);

                const cancelCell = document.createElement('td');
                const cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.className = 'cancel-button';
                cancelButton.addEventListener('click', () => {
                    cancelOrder(order._id, row); // Pass order ID and row to cancelOrder function
                });
                cancelCell.appendChild(cancelButton);
                row.appendChild(cancelCell);

                tbody.appendChild(row);
            });
        });
        table.appendChild(tbody);

        tableContainer.appendChild(table);
        pendingOrdersContainer.appendChild(tableContainer);
    }

    // Function to fetch delivered orders data from the API
    function fetchDeliveredOrders() {
        fetch('http://localhost:4000/api/v1/order/user/orderHistory/DELIVERED', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            createDeliveredOrdersTable(data.data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    // Function to create delivered orders table
    function createDeliveredOrdersTable(deliveredOrdersData) {
        const deliveredOrdersDiv = document.getElementById('delivered-orders');
    
        const table = document.createElement('table');
    
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Order ID', 'Product Name', 'Delivered', 'Price', 'Date', 'Receipt'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        const tbody = document.createElement('tbody');
        deliveredOrdersData.forEach(order => {
            order.product.forEach(item => {
                const row = document.createElement('tr');
    
                const orderIdCell = document.createElement('td');
                orderIdCell.textContent = order._id;
                row.appendChild(orderIdCell);
    
                const productNameCell = document.createElement('td');
                productNameCell.textContent = item.name;
                row.appendChild(productNameCell);
    
                const statusCell = document.createElement('td');
                statusCell.textContent = 'Delivered';
                row.appendChild(statusCell);
    
                const priceCell = document.createElement('td');
                priceCell.textContent = order.orderPrice;
                row.appendChild(priceCell);
    
                const dateCell = document.createElement('td');
                const date = new Date(order.createdAt); // Convert to Date object
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                dateCell.textContent = formattedDate; // Format date
                row.appendChild(dateCell);
    
                const receiptCell = document.createElement('td');
                const receiptButton = document.createElement('button');
                receiptButton.classList.add('download-receipt-button');
                receiptButton.innerHTML = '<i class="fas fa-download"></i>';
                receiptButton.addEventListener('click', () => {
                    window.location.href = `../../html/user/receipt.html?order=${order._id}`; // Navigate to the receipt HTML page
                });
                receiptCell.appendChild(receiptButton);
                row.appendChild(receiptCell);
    
                tbody.appendChild(row);
            });
        });
        table.appendChild(tbody);
    
        deliveredOrdersDiv.appendChild(table);
    }

    // Function to fetch cancelled orders data from the API
    function fetchCancelledOrders() {
        fetch('http://localhost:4000/api/v1/order/user/orderHistory/CANCELLED', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            createCancelledOrdersTable(data.data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    // Function to create cancelled orders table
    function createCancelledOrdersTable(cancelledOrdersData) {
        const cancelledOrdersDiv = document.getElementById('cancelled-orders');

        const table = document.createElement('table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Order ID', 'Product Name', 'Status', 'Price', 'Date'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        cancelledOrdersData.forEach(order => {
            order.product.forEach(item => {
                const row = document.createElement('tr');

                const orderIdCell = document.createElement('td');
                orderIdCell.textContent = order._id;
                row.appendChild(orderIdCell);

                const productNameCell = document.createElement('td');
                productNameCell.textContent = item.name;
                row.appendChild(productNameCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = order.status;
                row.appendChild(statusCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = order.orderPrice;
                row.appendChild(priceCell);

                const dateCell = document.createElement('td');
                const date = new Date(order.createdAt); // Convert to Date object
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                dateCell.textContent = formattedDate; // Format date
                row.appendChild(dateCell);

                tbody.appendChild(row);
            });
        });
        table.appendChild(tbody);

        cancelledOrdersDiv.appendChild(table);
    }

    function cancelOrder(orderId, row) {
        fetch(`http://localhost:4000/api/v1/order/user/${orderId}`, {
            method: 'PATCH',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }
            console.log('Order cancelled successfully');
            // Remove the row from the pending orders table
            row.remove();
            // Fetch the cancelled order data and add it to the cancelled orders table
            fetchCancelledOrder(orderId);
        })
        .catch(error => {
            console.error('Error canceling order:', error);
        });
    }

    // Function to fetch and add cancelled order to the cancelled orders table
    function fetchCancelledOrder(orderId) {
        fetch(`http://localhost:4000/api/v1/order/user/${orderId}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch cancelled order');
            }
            return response.json();
        })
        .then(data => {
            console.log('Cancelled order data:', data);
            // Create a row for the cancelled order and add it to the cancelled orders table
            createCancelledOrderRow(data);
        })
        .catch(error => {
            console.error('Error fetching cancelled order:', error);
        });
    }

    // Function to create a row for the cancelled order and add it to the cancelled orders table
    function createCancelledOrderRow(cancelledOrderData) {
        const tbody = document.getElementById('cancelled-orders-table-body'); // Get the tbody
        const row = document.createElement('tr');

        const orderIdCell = document.createElement('td');
        orderIdCell.textContent = cancelledOrderData._id;
        row.appendChild(orderIdCell);

        // Add other cells here as needed

        tbody.appendChild(row);
    }

    // Fetch and display all orders when DOM is loaded
    fetchPendingOrders();
    fetchDeliveredOrders();
    fetchCancelledOrders();
});
