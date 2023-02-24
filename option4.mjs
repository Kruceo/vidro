const el = document.querySelectorAll('vidro').forEach(async each=>{
    const img = document.createElement('img')
    const cvs = document.createElement('canvas')
   
    const ctx = cvs.getContext('2d',{alpha:false})
    img.width = 300
    each.append(img)
    each.appendChild(cvs)
    let array = []
    
    for (let i = 1; i < 2; i++) {
        const response = await fetch('http://localhost:5174/stream/1/10/'+i+'.mp4')
        const data = (await response.blob())
        console.log(data)
    }
    
    
    console.log(array)
    
    //console.log(resolved)
    let i = 1
    setInterval(() => {
        ctx.drawImage(array[i],0,0,cvs.clientWidth,cvs.clientHeight)
        // /img.src = array[i]
        i += 1
        if(i >= array.length){
            i = 0
        }
    }, 1000/60);
    
})

