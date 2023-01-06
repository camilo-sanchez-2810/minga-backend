import 'dotenv/config.js'
import '../../config/database.js'
import {Chapter} from '../Chapter.js'

 let chapters = [
    {
        comic_id: "63b5c1db823a8ae629f3802e",
        title: "jujutsu kaisen",
        pages: ["https://static.wikia.nocookie.net/jujutsu-kaisen/images/f/f6/JJK_New_Key_Visual.jpg/revision/latest?cb=20200914020414&path-prefix=es","https://static.wikia.nocookie.net/jujutsu-kaisen/images/0/0e/Volume_1.png/revision/latest?cb=20200905220554&path-prefix=es"],
        order: 3
        
    },{
        comic_id: "63b5c1db823a8ae629f3802f",
        title: "Dragon Ball",
        pages: ["https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/35e4ac6339f5fdcc164160a5755790cd.jpe","https://static.wikia.nocookie.net/doblaje/images/4/4a/DragonBall.jpeg/revision/latest?cb=20200915224214&path-prefix=es"],
        order: 5
    }
 ]

 Chapter.insertMany(chapters)