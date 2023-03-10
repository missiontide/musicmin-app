import ApiWrapper from "../../../utils/ApiWrapper";

async function getSong(slug) {
    return await ApiWrapper.getSong(slug);
}

export default async function Head({ params }) {
    const songData = await getSong(params.slug);
    const title = songData.title + " - " + songData.artist + " Chords | musicmin.app";
    const url = "https://www.musicmin.app/songs/" + params.slug;

    return (
        <>
            <title>{title}</title>
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content="Instant Worship Slides & Chords" />
            <meta property="og:image" content="https://www.musicmin.app/social-media.png" />
            <meta property="og:type" content="website" />
        </>
    )
}