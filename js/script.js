document.addEventListener('DOMContentLoaded', function() {
    // Get search elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const productsTable = document.getElementById('productsTable');
    
    // Function to filter table based on search input
    function filterTable() {
        const filterValue = searchInput.value.toLowerCase();
        const rows = productsTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        
        // Loop through all table rows
        for (let i = 0; i < rows.length; i++) {
            let found = false;
            const cells = rows[i].getElementsByTagName('td');
            
            // Check each cell in the row
            for (let j = 0; j < cells.length; j++) {
                const cellText = cells[j].textContent || cells[j].innerText;
                
                // If cell text contains the search value
                if (cellText.toLowerCase().indexOf(filterValue) > -1) {
                    found = true;
                    break;
                }
            }
            
            // Show/hide row based on search match
            if (found) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
    
    // Search when button is clicked
    if (searchButton) {
        searchButton.addEventListener('click', filterTable);
    }
    
    // Search as user types (keyup event)
    if (searchInput) {
        searchInput.addEventListener('keyup', filterTable);
    }
    
    // Mobile menu toggle functionality (if needed in the future)
    // This is a placeholder for future mobile navigation implementation
});