const check = require('check')

export default class Oeuvre {

    constructor(mediaDefinition) {
        
        // Validation des intrans
        check(mediaDefinition)
            // .hasNumber('mediaId')
            .hasString('title')
            .hasString('album')
            .hasString('artist')
            .hasString('genre')
            .hasString('secondaryGenre')
            .hasString('lyrics')
            .hasString('creationDate')
            .hasString('modificationDate')
            .hasString('publishDate')
            .hasString('publisher')
            .hasString('isrc')
            .hasString('upc')
            .hasString('msDuration')
            .hasString('cover')
            .hasArray('inLanguages')
            .hasObject('socialMediaLinks')
            .hasObject('streamingServiceLinks')
            .hasObject('pressArticleLinks')
            .hasObject('playlistLinks')
            .hasObject('s3Etag')
            .assert()

        // Construction
        // this.mediaId = mediaDefinition.mediaId
        this.title = mediaDefinition.title !== "" ? mediaDefinition.title : "Vierge"
        this.album = mediaDefinition.album !== "" ? mediaDefinition.album : "Vierge"
        this.artist = mediaDefinition.artist !== "" ? mediaDefinition.artist : "Vierge"
        this.cover = mediaDefinition.cover
        this.genre = mediaDefinition.genre
        this.secondaryGenre = mediaDefinition.secondaryGenre
        this.lyrics = mediaDefinition.lyrics
        this.inLanguages = mediaDefinition.inLanguages
        this.isrc = mediaDefinition.isrc
        this.upc = mediaDefinition.upc
        this.msDuration = mediaDefinition.msDuration
        this.socialMediaLinks = mediaDefinition.socialMediaLinks
        this.streamingServiceLinks = mediaDefinition.streamingServiceLinks
        this.pressArticleLinks = mediaDefinition.pressArticleLinks
        this.playlistLinks = mediaDefinition.playlistLinks
        this.creationDate = mediaDefinition.creationDate
        this.modificationDate = mediaDefinition.modificationDate
        this.publishDate = mediaDefinition.publishDate
        this.publisher = mediaDefinition.publisher
        this.s3Etag = mediaDefinition.s3Etag
    }

    get = function() {
        return [{
            // mediaId: this.mediaId,
            title: this.title,
            album: this.album,
            artist: this.artist,
            cover: this.cover,
            genre: this.genre,
            secondaryGenre: this.secondaryGenre,
            lyrics: this.lyrics,
            inLanguages: this.inLanguages,
            isrc: this.isrc,
            upc: this.upc,
            msDuration: this.msDuration,
            socialMediaLinks: this.socialMediaLinks,
            streamingServiceLinks: this.streamingServiceLinks,
            pressArticleLinks: this.pressArticleLinks,
            playlistLinks: this.playlistLinks,
            creationDate: this.creationDate,
            modificationDate: this.modificationDate,
            publishDate: this.publishDate,
            publisher: this.publisher,
            s3Etag: this.s3Etag
        }]
    }

}