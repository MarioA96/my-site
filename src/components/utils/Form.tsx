import { cva, cx } from "styled-system/css";


const formStyles = cva({
    base: {
        display: 'flex',
        order: '2',
        flexDirection: 'column',
        width: {
            xsm: '100%'
        },
        height: {
            xsm: 'fit-content'
        },
        '& button#submit_button': {
            display: 'flex',
            width: {
                xsm: '100%'
            },
            height: '45px',
            rounded: 'sm',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'ubuntu_regular'
        }
    }
});


import { formSchema, formErrors, onSubmit } from '../../handlers/form.handler.ts';
import { ZodError } from 'zod';
import { useState } from "react";


export default function Form() {

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [messageError, setMessageError] = useState("");

    const updateErrorsStatus = () => {
        setNameError(formErrors.name || "");
        setEmailError(formErrors.email || "");
        setMessageError(formErrors.message || "");
    }
    let success = false;

    const formAction = (formData: HTMLFormElement) => {
        
        try {
            const data = new FormData(formData);
            const formDataForm = {
                name: data.get('name') as string,
                email: data.get('email') as string,
                message: data.get('textarea') as string
            };
            
            const validatedData = formSchema.parse(formDataForm);
            success = true;
            
            if (success) {
                formErrors.name = undefined;
                formErrors.email = undefined;
                formErrors.message = undefined;
    
                updateErrorsStatus();
                
                onSubmit(validatedData);
            }
    
        } catch (error) {
            if (error instanceof ZodError) {
                success = false;
                const errors = error.flatten().fieldErrors;
                
                formErrors.name = errors.name?.[0];
                formErrors.email = errors.email?.[0];
                formErrors.message = errors.message?.[0];
    
                updateErrorsStatus();
            }
        }
    }

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); formAction(e.currentTarget); }} id="form_content__box" className={cx( formStyles({}),"tw-form_content__box" )}>
                <label id="label_error_name" htmlFor="name" className="label_error" >{ nameError }</label>
                <input type="text" name="name" id="input_name" className="tw-form_input" placeholder="Nombre" />
                <label id="label_error_email" htmlFor="name" className="label_error" >{ emailError }</label>
                <input type="email" name="email" id="input_email" className="tw-form_input" placeholder="Email"></input>
                <label id="label_error_message" htmlFor="name" className="label_error" >{ messageError }</label>
                <textarea name="textarea" id="textarea_message" rows={7} cols={50} placeholder="Mensaje" />

                <button id="submit_button">
                    Enviar
                </button>
            </form>

            <style>
                {
                `
                    @reference "../../styles/global.css";

                    .tw-form_content__box {
                        margin-top: 20px;
                        & input.tw-form_input {
                            background-color: #121212;
                            padding: 10px;
                            color: #dfdfdf;
                            border: #212121 solid 1px;
                            margin-top: 20px;
                            font-size: 16px;
                            font-family: var(--fonts-ubuntu_regular);
                            @apply rounded-sm;
                        };
                        & label.label_error {
                            color: red;
                            margin-top: calc(var(--spacing) * 6) /* 1.5rem = 24px */;
                            margin-bottom: calc(var(--spacing) * -3) /* -0.75rem = -12px */;
                            font-size: 14px;
                        };
                        & input.tw-form_input:focus {
                            outline: 2px solid #a476ff;
                        };
                        & textarea {
                            background-color: #121212;
                            padding: 10px;
                            color: #dfdfdf;
                            border: #212121 solid 1px;
                            margin-top: 20px;
                            font-size: 16px;
                            font-family: var(--fonts-ubuntu_regular);
                        };
                        & textarea:focus {
                            outline: 2px solid #a476ff;
                        };
                        & button {
                            margin-top: 20px;
                            background-color: #191919;
                            color: #8c8c8c;
                        };
                        & button:hover {
                            background-color: #1f1f1f;
                            color: #dfdfdf;
                        };
                    }
                `
                }
            </style>
        </>
    );
}
