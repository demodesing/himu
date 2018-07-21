Ajax jQuery 
----------------------
$(function() {

// Get the form.
    var form = $('#contact-form'),
        reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3,4})$/,
        inputs = $(".input-field");

    function validateForm() {

      if ($(this).is("#email")) {

          var email = $(this).val(),
              res = reg.test(email);

          if (res) {
            $(".email-error").html("");
          } else {
            $(".email-error").html("please enter a valid email.");
            return false;
          }

      } else {

          var target = ($(this).attr("id")),
              targetMessage = $("."+target+"-error");

          if ($(this).val() === "") {

            targetMessage.html("please enter a valid "+target+".");
            return false;

          } else { 
            targetMessage.html(" ");
          }

      }
    } // End ValidateForm Function

    $.each(inputs, function( i, val ) {
      $(this).on("blur", validateForm);
    });

    // Get the messages div.
    var formMessages = $('#form-message');

    // Set up an event listener for the contact form.
    $(form).on('submit',function(event) {

      // Stop the browser from submitting the form.
      event.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
          type: 'POST',
          url: form.attr('action'),
          data: formData
      }).done(function(response) {

        // Make sure that the formMessages div has the 'success' class.
        formMessages.removeClass('error');
        formMessages.addClass('success');

        // Set the message text.
        formMessages.text(response);

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');

      }).fail(function(data) {

          // Make sure that the formMessages div has the 'error' class.
          formMessages.removeClass('success');
          formMessages.addClass('error');

          // Set the message text.
          if (data.responseText !== '') {
              formMessages.text(data.responseText);
          } else {
              formMessages.text('Sorry! An error occured and your message could not be sent.');
          }

      });
    });

});