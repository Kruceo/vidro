import { player } from "./src/player.mjs";


document.querySelectorAll('vidro').forEach(each=>{
    player(each)
    const list = []
    list.push(each)
})
