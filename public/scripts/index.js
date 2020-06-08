$( document ).ready(function() {
    // $("#editSwitch").prop('checked', false);
    // $(".edit-mode").hide();
    // $( ".edit-mode" ).toggle();
    // if ($("#editSwitch").checked) {
        // $("#editSwitch").prop("checked", false);
    // }
});

function enterEditMode () {
    if($("#editSwitch").checked) {
        $(".edit-mode").show();
    }
    else {
        $(".edit-mode").hide();
    }
}

// $("#editSwitch").change(function() {
//     if(this.checked) {
//         // var password = prompt("Enter password to go into edit mode", "Password");
//         $(".edit-mode").show();
//         // $( ".edit-mode" ).toggle();
//         // alert( "Edit mode." );
//     }
//     else {
//         $(".edit-mode").hide();
//         // $( ".edit-mode" ).toggle();
//         // alert( "Read mode." );
//     }
// });

function openLinkForm() {
    document.getElementById("popup-form-link").style.display = "block";
}
function closeLinkForm() {
    document.getElementById("popup-form-link").style.display = "none";
}