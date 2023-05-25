import Block from '../../core/Block'
import template from './avatar.hbs'

interface IAvatarProps {
    text: string
    iconPath: string
}
 class Avatar extends Block<IAvatarProps> {
    constructor(props: IAvatarProps) {
        super(props);
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default Avatar
