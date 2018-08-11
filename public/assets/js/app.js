$( function () {
    console.log("Hello? Is this thing on?");

    $("#add-burger").on("click", event => {
        event.preventDefault();
        console.log("The 'Add a burger!' button was clicked.");
        if ( $("#new-burger").val().trim() == "" ) {
            console.log("Ain't nothin' to add, bruh.");
        }
        else {
            console.log("This adds a burger with the name of " + $("#new-burger").val().trim());

            const newBurger = {
                "name": $("#new-burger").val().trim()
            };

            $.post("/api/burgers", newBurger, function() {
                location.reload();
            });
        }
        // Reset the input form
        document.getElementById("input-form").reset();
    });

    $(".eat-da-burger").on("click", function(event) {

        let thisID = $(this).data("id");
        console.log("ID:", thisID);

        $.ajax("/api/burgers/" + thisID, {
            type: "PUT"
        }).then( function(){
            // TODO: investigate why this doesn't auto-reload the page
            location.reload();
        });
    });
});