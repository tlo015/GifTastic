
    // create an array of animals that will dynamically be displayed on the top of the screen. 
    // array [];
    var animalArr = ["cat", "dog"];

    // render each as a button that on click will display gifs of the animal 
    //     function renderButtons 
    //         for loop through array 
    //         element button 
    //         add class and attr and data-name[i]and text[i]
    //         append to div
    function displayButtons() {
        $("#gif-buttons").empty();
        for (var i=0; i<animalArr.length; i++) {
            console.log ("animals: ", animalArr[i]);
            var animalBtn = $("<button>");
            animalBtn.addClass("animal-btn");
            animalBtn.addClass("btn-block");
            animalBtn.attr("data-name", animalArr[i]);
            animalBtn.text(animalArr[i]);
            $("#gif-buttons").append(animalBtn);
        }
    }

    // allows you to add buttons to the end of the string that will also display gifs when clicked 
    //     on click event 
    //     var storing the user input 
    //     .push to add the movie to the end of the array 
    //     make button 

    $("#add-animal").on("click", function() {
        var newAnimal=$("#animal-input").val().trim();
        animalArr.push(newAnimal);
        displayButtons();
    });



 


    // sign up for an gifphy API 
    // function to display appropriate content 
    //queryURL
    function displayAnimals() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +animal+ "&api_key=Lz8M8QghYuocQVkTxFRQ73XjYNlvmmVP&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            for (var i=0; i<results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("d-inline-block");
                gifDiv.addClass("gif-section")
                
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " +rating);
                
                var animalImg = $("<img>");
                animalImg.attr("src", results[i].images.fixed_height_still.url);
                //when gifs are displayed to screen, they are still - data still, data animate, data state 
                animalImg.attr("data-still", results[i].images.fixed_height_still.url);
                animalImg.attr("data-animate", results[i].images.fixed_height.url);
                animalImg.attr("data-state", "still");
                animalImg.addClass("gifImg")

                gifDiv.append(p);
                gifDiv.append(animalImg);
                $("#gif-pics").prepend(gifDiv);
            }
        });
    }

    $(document).on("click", ".animal-btn", displayAnimals);
    displayButtons();
    
    // upon click, they play 
    //     data-states - still 
    //     if else, 
    $(document).on("click", ".gifImg", function() {
        var state=$(this).attr("data-state");
        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
     


    // each click results prepends the previous results  
    // search bar 
    