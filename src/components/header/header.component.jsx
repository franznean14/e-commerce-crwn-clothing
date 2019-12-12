import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import './header.styles.scss'
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { HeaderContainer, LogoCotainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({currentUser, hidden}) => {
    return (
        <HeaderContainer>
            <LogoCotainer to="/">
                <Logo className='logo'/>
            </LogoCotainer>
            <OptionsContainer>
                <OptionLink to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink to="/contact">
                    CONTACT
                </OptionLink>
                {currentUser ? 
                    <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                    :
                    (<OptionLink to="/signin">
                        SIGN IN
                    </OptionLink>)
                    }
                <CartIcon/>
            </OptionsContainer>
            { hidden ? null : 
            <CartDropDown />
            }
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
