import DataTable from 'datatables.net-dt';


// Initialize the DataTable
 $('#browserByUsers').DataTable({
    responsive: true,
    language: {
        searchPlaceholder: 'Search...',
        sSearch: ''
    }
});