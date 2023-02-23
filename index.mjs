import { genChunksEl, getChunkPlaylist, newChunkEl } from "./src/chunkElements.mjs"

async function player(element = Element) {
    element.width = element.getAttribute('width')
    element.height = element.getAttribute('height')
    let src = new URL(element.getAttribute('src'))
    let chunkPaths = await getChunkPlaylist(src)
    let chunks = genChunksEl(chunkPaths, src)

    setInterval(async () => {
        (await getChunkPlaylist(src)).forEach(each => {
            if (!chunkPaths.includes(each)) {
                chunkPaths.push(each)
                const newVideo = newChunkEl(src, each)
                chunks.push(newVideo)
                
            }
        })
        console.log('--------------X--------------')
    }, 3000);

    let index = 0
    const canvas = document.createElement('canvas')
    const cpx = canvas.getContext('2d')
    let loading = false

    chunks[index].addEventListener('loadedmetadata',(e)=>{
        canvas.width = chunks[index].videoWidth
        canvas.height = chunks[index].videoHeight
        canvas.style.width = element.width + 'px'
        canvas.style.height = element.height + 'px'
        
       
        element.appendChild(canvas)
        
    
        setInterval(async () => {
            if (loading) return
            if (chunks[index].paused) {
                try {
                    chunks[index].autoplay = true
                    chunks[index].play().catch(err => null)
    
                } catch (error) {
                    error
                }
    
            }
    
            console.log(chunks[index].width)
            chunks[index].setAttribute('width','300')
    
            cpx.drawImage(chunks[index], 0, 0)
           
    
            if (chunks[index].currentTime >= chunks[index].duration - 0.1) {
                console.log('ended')
    
                if (index >= chunkPaths.length - 1) {
                    chunks[index].currentTime -= 0.5
                    element.dispatchEvent(new Event('loading'))
                    loading = true
                }
                else {
                    loading = false
                    index++
                }
                chunks[index].currentTime = 0
                chunks[index].play().catch(err => null)
                element.dispatchEvent(new Event('chunkEnd'))
            }
    
        }, 1000 / 30);
    })
    

}


(document.querySelectorAll('vidro').forEach(each => {
   player(each)
   each.addEventListener('loading',(each)=>{
  (each.target.style.opacity = "0.5")
   })
}))