import Block from '../../core/Block'
import template from './registration.hbs'
import SimpleInput from "../../components/SimpleInput";
import {LinkButton, Button} from "../../components";
import {ERoutes} from "../../ERoutes";
import {validators} from "../../utils/validators";
import {submitValidator} from "../../utils/submitValidator";
import {getFormValue} from "../../utils/getFormValue";
class Authorization extends Block {
    constructor() {
        super('main', {});
        this.element?.classList.add("registration__wrapper")
    }
    init(){
        this.children.email = new SimpleInput({
            name: 'email',
            type: 'email',
            label: 'E-mail',
            value: '',
            required: true,
            events: {
                focusout: (e)=>validators.email(e, this.children.email),
                change: (e)=> this.children.email.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.login = new SimpleInput({
            name: 'login',
            type: 'text',
            label: 'Логин',
            value: '',
            required: true,
            events: {
                focusout: (e)=>validators.login(e, this.children.login),
                change: (e)=> this.children.login.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.firstName = new SimpleInput({
            name: 'first_name',
            type: 'text',
            label: 'Имя',
            value: '',
            required: true,
            events: {
                focusout: (e)=>validators.name(e, this.children.firstName),
                change: (e)=> this.children.firstName.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.secondName = new SimpleInput({
            name: 'second_name',
            type: 'text',
            label: 'Фамилия',
            value: '',
            required: true,
            events: {
                focusout: (e)=>validators.name(e, this.children.secondName),
                change: (e)=> this.children.secondName.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.phone = new SimpleInput({
            name: 'phone',
            type: 'tel',
            label: 'Телефон',
            value: '',
            required: true,
            events: {
                focusout: (e)=>validators.phone(e, this.children.phone),
                change: (e)=> this.children.phone.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.password = new SimpleInput({
            name: 'password',
            type: 'password',
            label: 'Пароль',
            value: '',
            required: true,
            events: {
                focusout: (e)=>validators.password(e, this.children.password),
                change: (e)=> this.children.password.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.submitButton = new Button({
            text: 'Зарегистрироваться',
            type: 'button',
            events: {
                click: ()=> {
                    const errors = submitValidator(this.children)
                    if(!errors){
                        console.log(getFormValue(this.children))
                        setTimeout(()=> window.location.pathname = ERoutes.LOGIN, 3000)
                    }
                }
            }
        })
        this.children.loginButton = new LinkButton({
            text: 'Войти',
            link: ERoutes.LOGIN,
        })
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default Authorization
