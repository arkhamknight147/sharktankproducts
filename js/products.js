// products.js - Script to load product data from CSV

document.addEventListener('DOMContentLoaded', function() {
    // Path to your CSV file
    const csvFilePath = './data/products.csv';
    
    // Fetch the CSV file
    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csvData => {
            // Parse CSV data using PapaParse (include this library in your HTML)
            const results = Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true
            });
            
            // Get the table body element
            const tableBody = document.querySelector('#productsTable tbody');
            
            // Clear any existing rows
            tableBody.innerHTML = '';
            
            // Loop through the parsed data and create table rows
            results.data.forEach(product => {
                const row = document.createElement('tr');
                
                // Add cells for each column
                row.innerHTML = `
                    <td>${product.Episode || ''}</td>
                    <td>${product.BrandName || ''}</td>
                    <td>${product.Idea || ''}</td>
                    <td>${product.Category || ''}</td>
                    <td>${product.OriginalAsk || ''}</td>
                    <td>${product.Deal || ''}</td>
                    <td>${product.Investors || ''}</td>
                    <td><a href="${product.AmazonLink || '#'}" class="buy-btn" target="_blank">Amazon <i class="fas fa-external-link-alt"></i></a></td>
                `;
                
                // Append the row to the table
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error loading or parsing CSV data:', error);
            document.querySelector('#productsTable tbody').innerHTML = 
                '<tr><td colspan="8">Error loading product data. Please try again later.</td></tr>';
        });
});