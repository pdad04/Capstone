class Movie {
    constructor(name, theaterReleaseDate, trackId, description, artwork, rentable = false){
        this.name = name;
        this.theaterReleaseDate = theaterReleaseDate;
        this.trackId = trackId;
        this.description = description;
        this.artworkUrl = artwork;
        this.isRentable = rentable;
    }
}

export default Movie;