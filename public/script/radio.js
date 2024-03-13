const radio = {
    "radioStations": [
        {
            "name": "NPO 1",
            "img_url": "./images/radio-npo-1-radio-luisteren-online.webp",
            "slug": "npo-1-radio",
            "stream_url": "https://icecast.omroep.nl//radio1-bb-mp3",
            "playlist_url": "https://icecast.omroep.nl/radio4-eigentijdsfb-mp3.xspf",
            "description": "NPO 2 is een super groot radio station met alles erop aan"
        },
        {
            "name": "NPO 2",
            "img_url": "./images/radio-npo-1-radio-luisteren-online.webp",
            "slug": "npo-2-radio",
            "stream_url": "https://icecast.omroep.nl:80/radio4-eigentijdsfb-mp3",
            "playlist_url": "https://icecast.omroep.nl/radio4-eigentijdsfb-mp3.xspf",
            "description": "NPO 2 is een super groot radio station met alles erop aan"
        }
    ]
};
document.addEventListener("DOMContentLoaded", function() {
    const radioContainer = document.querySelector(".homepage");
    const audioPlayer = document.getElementById("audioPlayer");
    const playlistContainer = document.getElementById("playlist");
    const radioNameElement = document.getElementById("radioName");
    const currentTrackElement = document.getElementById("currentTrack");

    //play button & stop
    const playButton = document.querySelector('.play-radio--button')
    const stopButton = document.querySelector('.play-radio--stop');

    playButton.addEventListener('click', () => {
        audioPlayer.play();
        playButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
    });

    stopButton.addEventListener('click', () => {
        audioPlayer.pause();
        stopButton.style.display = 'none';
        playButton.style.display = 'inline-block';
    });
    function handleRouting() {
        const path = window.location.pathname.substring(1); // Get the path from the URL
        const station = radio.radioStations.find(station => station.slug === path); // Find the station object based on the path
        if (station) {
            audioPlayer.src = station.stream_url;
            audioPlayer.play(); // Ensure audio starts playing for the new station
            playButton.style.display = audioPlayer.paused ? 'inline-block' : 'none';
            stopButton.style.display = audioPlayer.paused ? 'none' : 'inline-block';
        } else {
            console.log("Invalid or unknown station path:", path);
        }
    }

    handleRouting();
    function fetchAndDisplayPlaylist(playlistUrl, station) {
        fetch(playlistUrl)
            .then(response => response.text())
            .then(data => {
                // Parse XSPF XML data to extract track information
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");

                // Extract track information
                const trackList = xmlDoc.getElementsByTagName("track");
                const playlist = [];

                for (let i = 0; i < trackList.length; i++) {
                    const title = trackList[i].getElementsByTagName("title")[0].textContent;

                    // Split the title at the "-" character
                    const titleParts = title.split(" - ");

                    // Extract artist and track name
                    const artist = titleParts[0];
                    const trackName = titleParts.slice(1).join(" - ");

                    // Add track information to the playlist array
                    playlist.push({
                        artist: artist,
                        trackName: trackName
                    });
                }

                // Update radio name and current track
                if (playlist.length > 0) {
                    radioNameElement.textContent = station.name;
                    currentTrackElement.textContent = `${playlist[0].artist} - ${playlist[0].trackName}`;
                }
            })
            .catch(error => {
                console.error("Error fetching playlist:", error);
            });
    }



    radio.radioStations.forEach(station => {
        const stationHTML = `
            <article class="radio">
                <a href="/${station.slug}">
                    <img src="${station.img_url}" alt="${station.name}" data-stream="${station.stream_url}">
                </a>
            </article>
        `;
        radioContainer.insertAdjacentHTML("beforeend", stationHTML);
    });


    window.addEventListener("popstate", handleRouting);

    radioContainer.addEventListener("click", function(event) {
        const target = event.target;
        if (target.tagName === "IMG") {
            const stationUrl = target.parentElement.getAttribute("href");
            const slug = stationUrl.substring(1); // Get the slug from the link's href attribute
            history.pushState(null, null, stationUrl); // Update the URL
            handleRouting();
            fetchAndDisplayPlaylist(radio.radioStations.find(station => station.slug === slug).playlist_url, radio.radioStations.find(station => station.slug === slug));
            event.preventDefault(); // Prevent default link behavior
        }
    });
});