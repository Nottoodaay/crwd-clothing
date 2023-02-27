import './button.styles.scss'

const Button_Type_Classes = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, button_type, ...otherProps}) =>{
    return(
        <button className={`button-container ${Button_Type_Classes[button_type]}`}
        {...otherProps}
        >{children}</button>
    )
}

export default Button