import Block from '../../core/Block'
import template from './authorization.hbs'
import SimpleInput from "../../components/SimpleInput";
import {LinkButton, Button} from "../../components";
import {ERoutes} from "../../ERoutes";
class Authorization extends Block {
    constructor() {
        super('main', {});
        this.element?.classList.add("authorization__wrapper")
    }
    loginValidator(e: PointerEvent, loginElement: Block){
        console.log(e)
        const value = (e.target as HTMLInputElement)?.value
        if(!value || value.length < 3 || value.length > 20) {
            loginElement.setProps({error: 'Допустимая длина от 3 до 20 символов'})
        }
    }
    init(){
        this.children.login = new SimpleInput({
            name: 'login',
            type: 'text',
            label: 'Логин',
            value: 'ffff',
            events: {
                // focusin: (e)=>this.loginValidator(e, this.children.login),
                focusout: (e)=>this.loginValidator(e, this.children.login)
            }
        })
        this.children.password = new SimpleInput({
            name: 'password',
            type: 'password',
            label: 'Пароль',
            value: '',
        })
        this.children.registration = new LinkButton({
            text: 'Нет аккаунта?',
            link: ERoutes.REGISTRATION
        })
        this.children.button = new Button({
            text: 'Войти',
            link: ERoutes.HOME,
            type: 'button',
        })
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default Authorization
