import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faDolly, faArrowsRotate, faMapPin, faPhone, faCaretRight, faAnglesRight, faGauge, faUser, faUsers, faTags, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faComments, faCreditCard, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default () => library.add(
    faMagnifyingGlass, faCreditCard, faDolly,
    faArrowsRotate, faComments, faMapPin,
    faEnvelope, faPhone, faCaretRight,
    faAnglesRight, faTwitter, faFacebook,
    faLinkedin, faInstagram, faYoutube,
    faGauge, faUser, faUsers,
    faTags, faRightFromBracket
)