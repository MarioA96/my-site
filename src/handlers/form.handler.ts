import { z } from "zod";
import emailjs from 'emailjs-com';

const serviceId = import.meta.env.MAIL_SERVICE_ID;
const mailTemplateId = import.meta.env.MAIL_TEMPLATE_ID;
const publicKey = import.meta.env.MAIL_PUBLIC_KEY;


export const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    message: z.string().min(10, 'Message must be at least 10 characters')
});


type ContactForm = z.infer<typeof formSchema>;
export let formErrors: { 
    name?: string, 
    email?: string, 
    message?: string 
} = {};


export function onSubmit(values: ContactForm) {
    console.log(values);

    // Configura los parámetros para enviar el correo
    const emailParams = {
        name: values.name,
        email: values.email,
        message: values.message,
    };

    // Usa EmailJS para enviar el correo
    emailjs
        .send(
            '', // Reemplaza con tu Service ID
            '', // Reemplaza con tu Template ID
            emailParams,
            '' // Reemplaza con tu Public Key
        )
        .then(
            (response) => {
                console.log('Correo enviado exitosamente:', response.status, response.text);
                alert('¡Correo enviado exitosamente!');
            },
            (error) => {
                console.error('Error al enviar el correo:', error);
                alert('Hubo un error al enviar el correo. Inténtalo de nuevo.');
            }
        );
};