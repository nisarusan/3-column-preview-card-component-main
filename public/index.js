
function IndexPage() {
    return (`
        <>
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon.png">
                            <title>Radiostation.nl - Luister nu online naar radio</title>
                            <link rel="stylesheet" type="text/css" href="style.css" />
            </head>
            <body>
            <header>
                <div class="logo-img">
                    <img src="images/luisteren.nl_-1.png" alt="">
                </div>
                <nav>
                    <ul>
                        <li>Landelijk</li>
                        <li>Regio</li>
                        <li>Alfabetisch</li>
                        <li>Muziekstijlen</li>
                    </ul>
                </nav>
            </header>
            <div class="main-wrapper">
                <main>
                    <div class="sidebar">
                        <img src="../images/banner.png" alt="">
                    </div>
                    <!-- Your main content including radio stations -->
                    <section class="homepage">
                    </section>
                    <div class="sidebar">
                        <img src="../images/banner.png" alt="">
                    </div>
                </main>
                <section>
                    <!-- Your radio player section -->
                    <div class="play-radio">
                        <div class="play-radio-img">
                            <img src="images/radio-npo-1-radio-luisteren-online.webp" alt="">
                        </div>
                        <div class="play-radio-description">
                            <h1 id="radioName">Sky Radio</h1>
                            <p id="currentTrack">Dermot Kennedy - Better Days</p>
                        </div>
                        <div class="play-radio--buttons">
                            <audio id="audioPlayer" controls></audio>
                            <button type="button" class="play-radio--button">
                                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0L16.1852 9.5L1.88952e-07 19L0 0Z"></path></svg>
                            </button>
                        </div>
                        <div class="play-radio-buttons">
                        <button type="button" class="play-radio--stop">
                        <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6.54013e-07H4.75V19H0V6.54013e-07Z"></path> <path d="M11.4 0H16.15V19H11.4V0Z"></path></svg>
                        </button>
                    </div>
                </section>
            </div>
            <script defer src="script/radio.js"></script>
            </body>
            </html>
        </>
    `)
}

// Inject the HTML content into the document
document.body.innerHTML = IndexPage();