import 'dotenv/config.js'
import '../../config/database.js'
import { Comic } from '../comic.models.js'

let comics = [
    {
    author_id: '63b58a81f67ecbbe4fe5d0d4',
    title: 'Superman, arriba en el cielo' ,
    photo: 'https://taylorcomics.cl/wp-content/uploads/2021/10/superman_arriba_en_el_cielo_cov1-00fc87c26069b3aba816287420974121-1024-1024.jpg',
    description: '¡Superman echa a volar en esta emocionante aventura!Unos alienígenas han abducido a una niña llamada Alice, y Superman está decidido a localizarla en algún punto del cielo. El Hombre de Acero hará lo indecible durante la búsqueda y aceptará numerosos desafíos',
    category: '63b43895ad64747abfa80a5b',
    comic_id: '63b5a4c3fc13ae0fff00026c'
    },
    {
    author_id: '63b58a81f67ecbbe4fe5d0d4',
    title: 'Linterna Verde, la noche mas oscursa' ,
    photo: 'https://www.ecccomics.com/content/productos/4334/cubierta_la_noche_mas_oscura_4ed_WEB.jpg',
    description: 'Hal Jordan ya ha vencido a la muerte una vez. Como el mejor Green Lantern, es su deber incuestionable de Hal liderar a los vivos contra este abrumador ejército de muertos. Mientras la Noche Más Oscura consume a los héroes de la Tierra, los siete Corps empoderados por el espectro emocional deben dejar de luchar entre ellos o ser testigos del fin de toda la creación.',
    category: '63b43895ad64747abfa80a5b',
    comic_id: '63b5a4c3fc13ae0fff00026d'
    }
]

Comic.insertMany(comics)