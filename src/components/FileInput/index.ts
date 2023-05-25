import Block from '../../core/Block'
import template from './fileInput.hbs'

interface IFileInputProps {
    text: string
    name: string
    required?: boolean
    error?: string
    events?: {
        focusout?: (event: PointerEvent)=>void
        change?: (e: InputEvent)=>void
    }
}
 class FileInput extends Block<IFileInputProps> {
    constructor(props: IFileInputProps) {
        super( props);
    }

    render(){
        return this.compile(template, this.props)
    }
}

export default FileInput
