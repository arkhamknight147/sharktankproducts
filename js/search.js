// search.js - Script to implement search functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get the search input and button elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // Function to perform the search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const tableRows = document.querySelectorAll('#productsTable tbody tr');
        
        // Loop through all table rows
        tableRows.forEach(row => {
            // Get text content from brand name (2nd column) and idea (3rd column)
            const brandName = row.cells[1]?.textContent?.toLowerCase() || '';
            const idea = row.cells[2]?.textContent?.toLowerCase() || '';
            const category = row.cells[3]?.textContent?.toLowerCase() || '';
            
            // Check if the search term appears in brand name or idea description
            const isMatch = 
                brandName.includes(searchTerm) || 
                idea.includes(searchTerm) || 
                category.includes(searchTerm);
            
            // Show or hide row based on search match
            row.style.display = isMatch || searchTerm === '' ? '' : 'none';
        });
    }
    
    // Add event listeners
    // 1. Search on button click
    searchButton.addEventListener('click', performSearch);
    
    // 2. Search as you type (keyup event)
    searchInput.addEventListener('keyup', performSearch);
    
    // 3. Search when pressing Enter
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear search and reset display when clearing the search box
    searchInput.addEventListener('search', function() {
        if (searchInput.value === '') {
            performSearch();
        }
    });
});