export async function getJSON(url) {
    const request = await fetch(url);
    return await request.json();
}