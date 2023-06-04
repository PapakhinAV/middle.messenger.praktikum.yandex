import Block from '../../core/Block'
import template from './contacts.hbs'

export interface IContact {
    name: string
    message: string
    time: string
    photo?: string
    unread?: number
}

export interface IContactsProps {
    contacts: IContact[]
}
 class Contacts extends Block<IContactsProps> {
    constructor(props: IContactsProps) {
        super( props);
    }

    render(){
        return this.compile(template, this.props)
    }
}

export default Contacts
