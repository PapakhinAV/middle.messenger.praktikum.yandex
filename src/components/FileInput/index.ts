import Block from '../../core/Block'
import template from './fileInput.hbs'

interface IFileInputProps {
    text: string
    name: string
}
 class FileInput extends Block<IFileInputProps> {
    constructor(props: IFileInputProps) {
        super('div', props);
        this.element?.classList.add("fileInput")
    }

    render(){
        return this.compile(template, this.props)
    }
}

export default FileInput
