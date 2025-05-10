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
            // Parse CSV data using PapaParse
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
                
                // Create URL-friendly brand name for linking
                const brandLink = product.BrandName
                    ? product.BrandName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html'
                    : '#';
                
                // Add cells for each column
                row.innerHTML = `
                    <td>${product.Episode || ''}</td>
                    <td><a href="${brandLink}" class="brand-link">${product.BrandName || ''}</a></td>
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