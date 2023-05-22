import Block from '../../core/Block'
import template from './registration.hbs'
import SimpleInput from "../../components/SimpleInput";
import {LinkButton, Button} from "../../components";
import {ERoutes} from "../../ERoutes";
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
        })
        this.children.login = new SimpleInput({
            name: 'login',
            type: 'text',
            label: 'Логин',
            value: '',
        })
        this.children.firstName = new SimpleInput({
            name: 'first_name',
            type: 'text',
            label: 'Имя',
            value: '',
        })
        this.children.secondName = new SimpleInput({
            name: 'second_name',
            type: 'text',
            label: 'Фамилия',
            value: '',
        })
        this.children.secondName = new SimpleInput({
            name: 'phone',
            type: 'tel',
            label: 'Телефон',
            value: '',
        })
        this.children.password = new SimpleInput({
            name: 'password',
            type: 'password',
            label: 'Пароль',
            value: '',
        })
        this.children.submitButton = new Button({
            text: 'Зарегистрироваться',
            link: ERoutes.HOME,
            type: 'button',
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
