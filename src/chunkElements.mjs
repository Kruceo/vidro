function style(vid = HTMLVideoElement) {
    vid.style.display = 'none'
    vid.style.position = 'absolute'
    vid.style.width = "100%"
    vid.style.height = "100%"
}


export async function genChunksEl(pathsArray, srcOrigin = URL) {
    async function getSources(each) {
        let vid = document.createElement('video')
        vid.preload = 'none'
        const res = await fetch(srcOrigin.origin + each)
        const blob = await res.blob()
        vid.src = URL.createObjectURL(blob)
        vid.muted = true
        style(vid)
        return vid
    }
    let generated = []
    for (let i = 0; i < pathsArray.length; i++) {
        const src = pathsArray[i];

        generated.push( await getSources(src) )
        
    }
   
    
    return generated
}

export function newChunkEl(srcOrigin = URL, path) {
    let vid = document.createElement('video')
    vid.preload = 'none'
    vid.src = srcOrigin.origin + path
    vid.muted = true
    style(vid)
    console.log(vid.src)
    // document.body.appendChild(vid)


    return vid
}
export async function getChunkPlaylist(url = URL) {
    let list = []
    const request = await fetch(url)
    const raw = await request.text()
    raw.split('\n').forEach(each => {
        if (!each.startsWith('#') && each.length > 0)
            list.push(each)
    })
    return list
}