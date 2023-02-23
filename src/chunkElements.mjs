export function genChunksEl(pathsArray, srcOrigin = URL) {
    let generated = []
    pathsArray.forEach(each => {
        let vid = document.createElement('video')
        vid.src = srcOrigin.origin + each
        vid.muted = true
        vid.controls = true

        console.log(vid.src)
        // document.body.appendChild(vid)
        generated.push(vid)
    })
    return generated
}

export function newChunkEl(srcOrigin = URL,path) {
    let vid = document.createElement('video')
    vid.src = srcOrigin.origin + path
    vid.muted = true
    vid.controls = true

    console.log(vid.src)
    // document.body.appendChild(vid)
  

    return vid
}
export async function getChunkPlaylist(url=URL){
    let list = []
    const request = await fetch(url)
    const raw = await request.text()
    raw.split('\n').forEach(each => {
        if (!each.startsWith('#') && each.length > 0)
            list.push(each)
    })
    return list
}