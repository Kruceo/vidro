const el = document.querySelectorAll('vidro').forEach(async each=>{
    const img = document.createElement('img')
    const cvs = document.createElement('canvas')
   
    const ctx = cvs.getContext('2d',{alpha:false})
    img.width = 300
    each.append(img)
    each.appendChild(cvs)
    let array = []
    
    for (let i = 1; i < 250; i++) {
        const response = await fetch('http://localhost:5174/footage/2/'+i+'.jpg')
        const data = await response.blob()
       console.log(data)
       const image = new Image(URL.createObjectURL(data))
       image.onload = ()=>{
        array.push(image)
       }
       console.log(image)
       image.src = URL.createObjectURL(data)
    }
    
    
    console.log(array)
    
    //console.log(resolved)
    let i = 1
    setInterval(() => {
        ctx.drawImage(array[i],0,0,cvs.clientWidth,cvs.clientHeight)
        // /img.src = array[i]
        i += 2
        if(i >= array.length){
            i = 0
        }
    }, 1000/30);
    
})

