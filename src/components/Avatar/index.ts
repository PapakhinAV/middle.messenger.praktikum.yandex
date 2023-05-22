import Block from '../../core/Block'
import template from './avatar.hbs'

interface IAvatarProps {
    text: string
    iconPath: string
}
 class Avatar extends Block<IAvatarProps> {
    constructor(props: IAvatarProps) {
        super('div', props);
        this.element?.classList.add("avatar__wrapper")
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default Avatar
