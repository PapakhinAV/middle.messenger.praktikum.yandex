import Block from "../core/Block";
export const validators = {
    login: (e: PointerEvent | string, element: Block): string | undefined => {
        const value = typeof  e ==='string'? e: (e.target as HTMLInputElement)?.value
        const isRequired = element.getProps()?.required

        if(!isRequired && !value) return

        const RegExp = /^(?=.*[a-zA-Z])(?!.*[\s])(?!.*[-_]{2})[a-zA-Z0-9-_]{3,20}$/;
        const errorMessages = []
        if (value.length < 3 || value.length > 20) errorMessages.push('значение должно быть от 3 до 20 символов');

        if (!RegExp.test(value)) {
            if (/\s/.test(value)) errorMessages.push('не должно содержать пробелы');
            if (/[^\w-]/.test(value)) errorMessages.push('допустимы латинские буквы, цифры, "-", "_"');
            if (/^\d+$/.test(value)) errorMessages.push('не может состоять только из цифр');
            if (/[-_]{2}/.test(value)) errorMessages.push('не может содержать два подряд идущих дефиса или нижних подчёркивания');
        }
        let message
        if(errorMessages.length > 0) {
            message = errorMessages.join(', ');
            element.setProps({error: message})
        } else {
            element.setProps({error: ''})
        }
        return message
    },
    password: (e: PointerEvent | string, element: Block): string | undefined => {
        const value =  typeof  e ==='string'? e: (e.target as HTMLInputElement)?.value
        const isRequired = element.getProps()?.required

        if(!isRequired && !value) return

        const errorMessages = []
        if (value.length < 8 || value.length > 40) errorMessages.push('значение должно быть от 8 до 40 символов');
        if (!/[A-Z]/.test(value)) errorMessages.push('должно содержать хотя бы одну заглавную букву');
        if (/\s/.test(value)) errorMessages.push('не должно содержать пробелы');

        let message;
        if(errorMessages.length > 0) {
            message = errorMessages.join(', ');
            element.setProps({error:message})
        } else {
            element.setProps({error:''})
        }
        return message
    },
    name: (e: PointerEvent | string, element: Block) => {
        const value =  typeof  e ==='string'? e: (e.target as HTMLInputElement)?.value
        const isRequired = element.getProps()?.required

        if(!isRequired && !value) return

        const errorMessages = []
        const uppercaseRegExp = /^[A-ZА-ЯЁ]/;
        const alphanumericRegExp = /^[a-zA-ZА-ЯЁа-яё-]*$/;

        if (value.length < 1) errorMessages.push('не должно быть пустым');
        if (!uppercaseRegExp.test(value)) errorMessages.push('должно начинаться с заглавной буквы');
        if (/\s/.test(value)) errorMessages.push('не должно содержать пробелы');
        if (!alphanumericRegExp.test(value)) errorMessages.push('может содержать только латинские или кириллические буквы, а также дефис');

        let message;
        if(errorMessages.length > 0) {
            message = errorMessages.join(', ');
            element.setProps({error:message})
        } else {
            element.setProps({error:''})
        }
        return message
    },
    phone:(e: PointerEvent | string, element: Block) => {
        const value =  typeof  e ==='string'? e: (e.target as HTMLInputElement)?.value
        const isRequired = element.getProps()?.required

        if(!isRequired && !value) return

        const errorMessages = []
        const RegExp = /^\+?\d+$/;

        if  (!RegExp.test(value)) errorMessages.push('может начинаться с +, далее допустимы только цифры');
        if (value.length < 10 || value.length > 15) errorMessages.push('значение должно быть от 10 до 15 символов');

        let message;
        if(errorMessages.length > 0) {
            message = errorMessages.join(', ');
            element.setProps({error:message})
        } else {
            element.setProps({error:''})
        }
        return message
    },
    avatar: (e: PointerEvent | string, element: Block) => {
        const fileName =  typeof  e ==='string'? e: (e.target as HTMLInputElement)?.value
        const isRequired = element.getProps()?.required

        if(!isRequired && !fileName) return

        const errorMessages = []
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = fileName?.split('.')?.pop()?.toLowerCase();


        if (fileExtension && !allowedExtensions.includes(fileExtension)) errorMessages.push(`Допустимые расширения: ${allowedExtensions.join(', ')}`);
        if (fileName.length < 1) errorMessages.push('Необходимо загрузить файл');

        let message;
        if(errorMessages.length > 0) {
            message = errorMessages.join(', ');
            element.setProps({error:message})
        } else {
            element.setProps({error:''})
        }
        return message
    },
    email: (e: PointerEvent | string, element: Block) => {
        const value =  typeof  e ==='string'? e: (e.target as HTMLInputElement)?.value
        const isRequired = element.getProps()?.required

        if(!isRequired && !value) return

        const errorMessages = []
        const RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (value.length < 1) errorMessages.push('не должно быть пустым');
        if (!RegExp.test(value)) errorMessages.push('некорректный адрес электронной почты');

        let message;
        if(errorMessages.length > 0) {
            message = errorMessages.join(', ');
            element.setProps({error:message})
        } else {
            element.setProps({error:''})
        }
        return message
    },
}
