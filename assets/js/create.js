// Using an object literal for a jQuery feature
var create = {
    init: function( settings ) {
        create.config = {
            form: $( "#addEmployeeForm" ),
            validationConfig: {
                rules: {
                    firstName: {
                      required: true,
                      minlength: 2
                    },
                    lastName: {
                      required: true,
                      minlength: 2
                    },
                    email:{
                      required: true,
                      email:true
                    },
                    homePhone: {
                      phoneUS: true,
                    },
                    cellPhone: {
                      phoneUS: true,
                    },
                    password:{
                      required: true,
                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                    },
                },
                messages: {
                    firstname: "Please enter your First Name",
                    lastName: "Please enter your Last Name",
                    password: "Please provide a valid password",
                    email: "Please enter a valid email address",
                },
                errorClass: "text-danger",
            }
        };
 
        // Allow overriding the default config
        $.extend( create.config, settings );
 
        create.setup();
    },
 
    setup: function() {

    	create.validation();

    },

    validation: function() {

        create.config.form.validate(create.config.validationConfig);

    }
};