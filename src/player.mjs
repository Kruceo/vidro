import {getChunkPlaylist,genChunksEl,newChunkEl} from './chunkElements.mjs'

export async function player(element=Element) {
    let src = new URL(element.getAttribute('src'))
    const frame = document.createElement('div')
    element.appendChild(frame)
    const chunkPaths = await getChunkPlaylist(src)
    console.log(chunkPaths) 
    let chunks = await genChunksEl(chunkPaths, src)
    console.log(chunks)

    frame.appendChild(chunks[0])
    chunks[0].style.display = 'block'
    chunks[0].play()
    
    let index = 0

    chunks[index].addEventListener('ended',step)

    chunks[index].addEventListener('loadedmetadata',(e)=>{
        frame.style.background = "orange"
        const w = element.clientWidth
        const h = element.clientHeight ?? w*9/16
        element.style.width =  (element.getAttribute('width')??e.target.videoWidth)    + 'px'
        element.style.height = (element.getAttribute('height')??e.target.videoHeight)  + 'px'
        element.style.display = 'block'
        frame.style.width = "100%"
        frame.style.height = "100%"
        frame.style.display = 'flex'
        frame.style.position = 'relative'
        frame.style.border = 'black 5px solid'

        setInterval(async () => {
            (await getChunkPlaylist(src)).forEach(each => {
                if (!chunkPaths.includes(each)) {
                    chunkPaths.push(each)
                    const newVideo = newChunkEl(src, each)
                    chunks.push(newVideo)
                }
            })
        }, chunks[index].duration * chunks.length * 1000 / 4);
    })
  


    function step(){
        if(index >= chunks.length - 1) return chunks[index].currentTime = 0
        console.log('ended')
        // chunks[index('ended')
        
        index ++
        frame.appendChild(chunks[index])
        chunks[index].style.display = 'block'
        setTimeout(() => {
            chunks[index-1].style.display = 'none'
            chunks[index-1].remove()
            chunks[index-1] = null
        }, 250);
        chunks[index].play()
        chunks[index].addEventListener('ended',step)
        element.video = chunks[index]
    }
}