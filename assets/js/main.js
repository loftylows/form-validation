                //Global Vars//
const email = $("#email");
const email_confirmation = $("#email_confirmation");
const password = $("#password");
const password_confirmation = $("#password_confirmation");
const phone_number = $("#phone_number");
const remember_me_checkmark = $("#checkmark");
let checkbox_clicked = false;


                //Validations//

let validations = {
  emailRegEx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  email_validation(email) {
    return validations.emailRegEx.test(email)
  },

  email_confirmation_validation(email, email_confirmation) {
    return email === email_confirmation
  },

  password_validation(password, char_length) {
    return (password.length >= char_length)
  },

  password_confirmation_validation(password, password_confirmation) {
    return password === password_confirmation
  }
}




                //ToolTip Events//
$(".account-info input").on("focus", function() {
  $("#tooltip_required_fields").css("visibility", "visible")
})
$(".account-info input").on("focusout", function() {
  $("#tooltip_required_fields").css("visibility", "hidden")
})
password.on("focus", function() {
  $("#tooltip_password").css("visibility", "visible")
})
password.on("focusout", function() {
  $("#tooltip_password").css("visibility", "hidden")
})
phone_number.on("focus", function() {
  $("#tooltip_phone_number").css("visibility", "visible")
})
phone_number.on("focusout", function() {
  $("#tooltip_phone_number").css("visibility", "hidden")
})
email.on("focus", function() {
  $("#tooltip_email").css("visibility", "visible")
})
email.on("focusout", function() {
  $("#tooltip_email").css("visibility", "hidden")
})

                //Full validation functions//

function email_validation(submit) {
  const email_val = $("#email").val()
  if (submit === true) {
    if (validations.email_validation(email_val)) {
      $(".email p").attr("class", "success_message")
        .html("Valid email entered!")
        return true
    } else {
      $(".email p").attr("class", "error_message")
        .html("An invalid email was entered. Please enter a valid email. Thank you.")
        return false
      }
  } else {
    if (email_val) {
      if (validations.email_validation(email_val)) {
        $(".email p").attr("class", "success_message")
          .html("Valid email entered!")
      } else {
        $(".email p").attr("class", "error_message")
          .html("An invalid email was entered. Please enter a valid email. Thank you.")
      }
    }
  }
}


function email_confirmation_validation(submit) {
  const email_val = email.val()
  const email_confirmation_val = email_confirmation.val()
  if (submit === true) {
    if (validations.email_confirmation_validation(email_val, email_confirmation_val)) {
      $(".email_confirmation p").attr("class", "success_message")
        .html("Email match!")
        return true
    } else {
      $(".email_confirmation p").attr("class", "error_message")
        .html("Your emails do not match. Please correct this.")
        return false
    }
  } else if (email_confirmation_val) {
    if (validations.email_confirmation_validation(email_val, email_confirmation_val)) {
      $(".email_confirmation p").attr("class", "success_message")
        .html("Email match!")
    } else {
      $(".email_confirmation p").attr("class", "error_message")
        .html("Your emails do not match. Please correct this.")
    }
  }
}


function password_validation(submit) {
  const password_val = password.val()
  const length = 6
  if (submit === true) {
    if (validations.password_validation(password_val, length)) {
      $(".password p").attr("class", "success_message")
        .html("Valid password enterd!")
        return true
    } else {
      $(".password p").attr("class", "error_message")
        .html(`Invalip password entered. Please make sure that it is at least ${length} characters long.`)
        return false
    }
  } else if (password_val) {
    if (validations.password_validation(password_val, length)) {
      $(".password p").attr("class", "success_message")
        .html("Valid password enterd!")
    } else {
      $(".password p").attr("class", "error_message")
        .html(`Invalip password entered. Please make sure that it is at least ${length} characters long.`)
    }
  }
}



function password_confirmation_validation(submit) {
  const password_val = password.val()
  const password_confirmation_val = password_confirmation.val()
  if (submit === true) {
    if (validations.password_confirmation_validation(password_val, password_confirmation_val)) {
      $(".password_confirmation p").attr("class", "success_message")
        .html("Passwords match!")
        return true
    } else {
      $(".password_confirmation p").attr("class", "error_message")
        .html("Passwords do not match. Please correct this.")
        return false
    }
  } else if (password_confirmation_val) {
    if (validations.password_confirmation_validation(password_val, password_confirmation_val)) {
      $(".password_confirmation p").attr("class", "success_message")
        .html("Passwords match!")
    } else {
      $(".password_confirmation p").attr("class", "error_message")
        .html("Passwords do not match. Please correct this.")
    }
  }
}

function form_validation(event) {
  var submit = true
  var validations = [email_validation(submit), email_confirmation_validation(submit), password_validation(submit), password_confirmation_validation(submit)]

  var will_submit = validations.every(function(validation) {
    return (validation === true)
  });

  if (!will_submit) {
    event.preventDefault()
  }
}

                //Live validations//

email.on("focusout", email_validation)

email_confirmation.on("focusout", email_confirmation_validation)

password.on("focusout", password_validation)

password_confirmation.on("focusout", password_confirmation_validation)

$("button[type=submit]").on("click", form_validation)




                //Effects//
$(".account-action input[type=checkbox]").on("click", function() {
  if (checkbox_clicked) {
    remember_me_checkmark.css("opacity", 0)
    checkbox_clicked = false
  } else {
    remember_me_checkmark.css("opacity", 1)
    checkbox_clicked = true
  }
})

$(".holder").mouseenter(function() {
  if (!checkbox_clicked) remember_me_checkmark.css("opacity", .3)
}).mouseleave(function() {
  if (!checkbox_clicked) remember_me_checkmark.css("opacity", 0)
})

                //Plugin to limit input to the specified format//
$("#phone_number").mask("(999) 999-9999");
