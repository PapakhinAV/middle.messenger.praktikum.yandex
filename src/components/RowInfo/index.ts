import Block from '../../core/Block'
import template from './rowInfo.hbs'

interface IRowInfoProps {
    label: string
    value: string
}
 class RowInfo extends Block<IRowInfoProps> {
    constructor(props: IRowInfoProps) {
        super( props);
    }

    render(){
        return this.compile(template, this.props)
    }
}

export default RowInfo
