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
            <meta property="og:title" content="Instant Worship Slides" />
            <meta property="og:description" content="Let us take care of the .ppt, you focus on worshipping. 🙏" />
            <meta property="og:image" content="https://www.musicmin.app/social-media.png" />
            <meta property="og:type" content="website" />
        </>
    )
}