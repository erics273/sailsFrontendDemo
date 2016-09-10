// Using an object literal for a jQuery feature
var read = {
    init: function( settings ) {

        read.config = {
            table: $( "#employeeTable" ),
            dataTableConfig: {
		        "scrollX": true
		    }
        };
 
        // Allow overriding the default config
        $.extend( read.config, settings );
 
        read.setup();

    },
 
    setup: function() {

    	read.config.table.DataTable(read.config.dataTableConfig);

    }
};