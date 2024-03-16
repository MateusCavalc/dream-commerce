import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faDolly, faArrowsRotate, faMapPin, faPhone, faCaretRight, faAnglesRight, faGauge, faUser, faUsers, faTags, faRightFromBracket, faCheck, faXmark, faMicrochip, faShirt, faDumbbell, faUtensils, faMusic, faHouse, faSort, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faComments, faCreditCard, faEnvelope, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default () => library.add(
    faMagnifyingGlass, faCreditCard, faDolly,
    faArrowsRotate, faComments, faMapPin,
    faEnvelope, faPhone, faCaretRight, faCaretLeft,
    faAnglesRight, faTwitter, faFacebook,
    faLinkedin, faInstagram, faYoutube,
    faGauge, faUser, faUsers,
    faTags, faRightFromBracket, faCheck,
    faXmark, faPenToSquare, faTrashCan,
    faMicrochip, faShirt, faDumbbell,
    faUtensils, faMusic, faHouse,
    faSort
)