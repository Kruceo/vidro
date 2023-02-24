import { genChunksEl, getChunkPlaylist, newChunkEl } from "./src/chunkElements.mjs"

async function player(element = Element) {
    const quality = element.getAttribute('quality') ?? 1
    const fps = element.getAttribute('fps')
    let src = new URL(element.getAttribute('src'))
    let chunkPaths = await getChunkPlaylist(src)
    let chunks = genChunksEl(chunkPaths, src)



    let index = 0
    const canvas = document.createElement('canvas')
    const bufferCanvas = document.createElement('canvas')
    const bcpx = bufferCanvas.getContext('2d', { alpha: false })
    const cpx = canvas.getContext('2d', { alpha: false })
    let loading = false

    chunks[index].addEventListener('loadedmetadata', (e) => {
        canvas.width = (element.clientWidth) / parseFloat(quality)
        canvas.height = ((element.clientWidth * 9) / 16) / parseFloat(quality)
        // bufferCanvas.width = (element.clientWidth) / parseFloat(quality)
        // bufferCanvas.height = ((element.clientWidth * 9) / 16) / parseFloat(quality)
        canvas.style.width = canvas.width
        canvas.style.height = canvas.height
        element.style.width = element.getAttribute('width') ? element.getAttribute('width') + 'px' : '100%'
        element.style.height = element.getAttribute('height') ? element.getAttribute('height') + 'px' : '100%'
        element.style.display = 'block'
        element.style.backgroundColor = "#0f0"
        element.appendChild(canvas)

        // chunks[index].play()

        setInterval(async () => {
            (await getChunkPlaylist(src)).forEach(each => {
                if (!chunkPaths.includes(each)) {
                    chunkPaths.push(each)
                    const newVideo = newChunkEl(src, each)
                    chunks.push(newVideo)
                }
            })
        }, chunks[index].duration * chunks.length * 1000 / 2);
        setInterval(async () => {
            if (loading) return
            // // element.dispatchEvent(new Event('rendered'))
            if (chunks[index].paused) {
                 chunks[index].play().catch(err => null)
            }


            // bcpx.drawImage(chunks[index], 0, 0, chunks[index].videoWidth,chunks[index].videoHeight,0,0,canvas.width,canvas.height)
            // bcpx.fillText(index,5,15)
            // cpx.drawImage(bufferCanvas, 0, 0)
            cpx.drawImage(chunks[index], 0, 0,chunks[index].videoWidth,chunks[index].videoHeight,0,0,canvas.width,canvas.height)

            // if (chunks[index].currentTime >= chunks[index].duration - 0.1) {
            //     console.log('ended')

            //     if (index >= chunkPaths.length - 1) {
            //         chunks[index].currentTime -= 0.5
            //         element.dispatchEvent(new Event('loading'))
            //         loading = true
            //     }
            //     else {
            //         loading = false
            //         index++
            //         chunks[index].currentTime = 0
            //         chunks[index].play().catch(err => null)
            //         element.dispatchEvent(new Event('chunkEnd'))
            //     }

            // }

        }, 1000 / parseFloat(fps));
    })

}


(document.querySelectorAll('vidro').forEach(each => {
    player(each)
    each.addEventListener('loading', (each) => {
        (each.target.style.opacity = "0.5")
    })
}))