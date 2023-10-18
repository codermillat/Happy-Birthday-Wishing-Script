document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const generateWish = document.getElementById("generateWish");
    const nameSpan = document.getElementById("nameSpan");
    const nameInputContainer = document.getElementById("nameInputContainer");
    const birthdayWish = document.getElementById("birthdayWish");
    const shareButton = document.getElementById("shareButton");

    // Check if a name is provided in the URL parameters
    const params = new URLSearchParams(window.location.search);
    const sharedName = params.get("name");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const playButton = document.getElementById("playButton");

    // Get the div element by its ID
    const myDiv = document.getElementById("myDiv");
    // Get the body element
    const body = document.body;



    if (sharedName) {
        nameSpan.textContent = sharedName;
        nameInputContainer.style.display = "none";
        birthdayWish.classList.remove("hidden");
        
        // Remove the CSS classes from the div
        myDiv.classList.remove("home-container");
        // Remove the CSS class from the body
        body.classList.remove("body-container");
    }else{
            playButton.style.display = "none"; // Hide the play button
        
    }

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} - ${month} - ${year}`;
}

    function updateDate() {
        const dateElement = document.getElementById("date");
        const currentDate = new Date();
        const customLabel = "Today's Date:";
        const formattedDate = formatDate(currentDate);
        dateElement.textContent = `${customLabel} ${formattedDate}`;
        }

    // Call the updateDate function to set the initial date
    updateDate();

    // Update the date every second (you can adjust the interval as needed)
    setInterval(updateDate, 1000);

      
      
    generateWish.addEventListener("click", function () {
        const name = nameInput.value;
        if (name) {
            nameSpan.textContent = name;
            nameInputContainer.style.display = "none";
            birthdayWish.classList.remove("hidden");

            // Remove the CSS classes from the div
            myDiv.classList.remove("home-container");
            // Remove the CSS class from the body
            body.classList.remove("body-container");


            // Update the URL with the name as a query parameter
            history.pushState({}, '', `?name=${encodeURIComponent(name)}`);
            playButton.style.display = "inline";
        }
    });

    shareButton.addEventListener("click", function () {
        const text = `Happy Birthday, ${nameSpan.textContent}! 🎉🍰`;
        const url = encodeURIComponent(window.location.href);
        const whatsappURL = `https://api.whatsapp.com/send?text=${text}%0A${url}`;
        window.open(whatsappURL);
    });

    playButton.addEventListener("click", function () {
        backgroundMusic.play();
        playButton.style.display = "none"; // Hide the play button
    });

});
