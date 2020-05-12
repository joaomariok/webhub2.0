$( document ).ready(function() {
    $( ".edit-mode" ).toggle();
});

$("#editSwitch").change(function() {
    if(this.checked) {
        $( ".edit-mode" ).toggle();
        // alert( "Edit mode." );
    }
    else {
        $( ".edit-mode" ).toggle();
        // alert( "Read mode." );
    }
});

function openLinkForm() {
    document.getElementById("popup-form-link").style.display = "block";
}
function closeLinkForm() {
    document.getElementById("popup-form-link").style.display = "none";
}