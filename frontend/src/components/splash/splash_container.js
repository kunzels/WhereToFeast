import { connect } from 'react-redux'
import Splash from './splash'
import { login,signup } from '../../actions/session_actions'
const msp = state => ({

})

const mdp = dispatch => ({
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user))
})

export default connect(null, mdp)(Splash); 