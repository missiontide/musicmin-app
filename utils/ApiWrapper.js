export default class ApiWrapper {
    static url = process.env.NEXT_PUBLIC_MUSICMIN_DB_HOST;

    static async apiCall(route = "", params = "") {
        const response = await fetch(
            this.url + route + params,
            {
                // cache: 'force-cache',
                // next: { revalidate: 600 }
            }
        );
        return response.json();
    }

    static async apiCallNoJson(route = "", params = "") {
        return await fetch(this.url + route + params);
    }

    /**
     * @returns {Promise<any>} json list of all songs with fields: id, title, artist
     */
    static async getAllSongs() {
        const route = "/songs";
        return this.apiCall(route)
    }

    /**
     * @param {int[]} songIds
     * @returns {Promise<any>} json list of songs with all fields: id, title, artist, lyrics, chords, etc.
     */
    static async getLyrics(songIds) {
        const route = "/lyrics";
        const params = "?songs=" + songIds.toString();
        return this.apiCall(route, params)
    }

    /**
     * @param {string} slug
     * @returns {Promise<any>} json of one song data
     */
    static async getSong(slug) {
        const route = "/songs/" + slug;
        return this.apiCall(route)
    }

    /**
     * @param {string} songTitle
     * @param {string} songArtist
     * @param {string} email
     * @returns {Promise<any>} 200 if successful
     */
    static async sendSongRequest(songTitle, songArtist, email) {
        const route = "/request";
        const params = "?"
            + "songTitle=" + songTitle
            + "&songArtist=" + songArtist
            + "&email=" + email
        return await this.apiCallNoJson(route, params);
    }
}
