// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.

// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

    // Step 1: Construct a URL to get movies playing now from TMDB, fetch
    // data and put the Array of movie Objects in a variable called
    // movies. Write the contents of this array to the JavaScript
    // console to ensure you've got good data
    // ⬇️ ⬇️ ⬇️
    // ⬆️ ⬆️ ⬆️ 
    // End Step 1
    
    // Step 2: 
    // - Loop through the Array called movies and insert HTML
    //   into the existing DOM element with the class name .movies
    // - Include a "watched" button to click for each movie
    // - Give each "movie" a unique class name based on its numeric
    //   ID field.
    // Some HTML that would look pretty good... replace with real values :)
    // <div class="w-1/5 p-4 movie-abcdefg1234567">
    //   <img src="https://image.tmdb.org/t/p/w500/moviePosterPath.jpg" class="w-full">
    //   <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
    // </div>
    // ⬇️ ⬇️ ⬇️
    // ⬆️ ⬆️ ⬆️ 
    // End Step 2

    // Step 3: 
    // - Attach an event listener to each "watched button"
    // - Be sure to prevent the default behavior of the button
    // - When the "watched button" is clicked, changed the opacity
    //   of the entire "movie" by using .classList.add('opacity-20')
    // - When done, refresh the page... does the opacity stick?
    // - Bonus challenge: add code to "un-watch" the movie by
    //   using .classList.contains('opacity-20') to check if 
    //   the movie is watched. Use .classList.remove('opacity-20')
    //   to remove the class if the element already contains it.
    // ⬇️ ⬇️ ⬇️
    // ⬆️ ⬆️ ⬆️ 
    // End Step 3
  
    // Step 4: 
    // - Properly configure Firebase and Firebase Cloud Firestore
    // - Inside your "watched button" event listener, you wrote in
    //   step 3, after successfully setting opacity, persist data
    //   for movies watched to Firebase.
    // - The data could be stored in a variety of ways, but the 
    //   easiest approach would be to use the TMDB movie ID as the
    //   document ID in a "watched" Firestore collection.
    // - Hint: you can use .set({}) to create a document with
    //   no data – in this case, the document doesn't need any data;
    //   if a TMDB movie ID is in the "watched" collection, the 
    //   movie has been watched, otherwise it hasn't.
    // - Modify the code you wrote in Step 2 to conditionally
    //   make the movie opaque if it's already watched in the 
    //   database.
    // - Hint: you can use if (document) with no comparison
    //   operator to test for the existence of an object.



window.addEventListener('DOMContentLoaded', async function(event) {

    let db = firebase.firestore()
    let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=03e8e24206878cf11fcfb268243f73df&language=en-US')
    let movies = await response.json()
    console.log(movies)

    let movieList = movies.results
    let outputElement = document.querySelector('.movies')

    for (let i=0; i<movieList.length; i++) {
        
        let movieID = movieList[i].id
        let moviePoster = movieList[i].poster_path
        
        let querySnapshot = await db.collection('TMDB').get()
        let watchedMovies = querySnapshot.docs
        let seenMovie = true

        if(watchedMovies.length > 0){
            let movieData = watchedMovies[0].data()
            seenMovie = movieData.watched
        }
        else{
            seenMovie = false
        }

        if(seenMovie){ 
            outputElement.insertAdjacentHTML('beforeend',`
            <div class="w-1/5 p-4 movie-${movieID}">
                <img id="poster${movieID}" src="https://image.tmdb.org/t/p/w500${moviePoster}" class="w-full">
                <a id="button${movieID}" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
            </div>
            `)


        }


  
        let watchButton = document.querySelector(`#button${movieID}`)
        let uniqueMovie = document.querySelector(`#poster${movieID}`)

        watchButton.addEventListener('click', async function(event){
            event.preventDefault()
            uniqueMovie.classList.add('opacity-20')
            watchButton.classList.add('opacity-20')
            console.log(`${movieList[i].original_title} was watched.`)
        })
        
        

        let watchedMovies = querySnapshot.docs
    
    }
  })