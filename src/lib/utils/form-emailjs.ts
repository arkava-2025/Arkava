import emailjs from '@emailjs/browser';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    contactReason: string;
    message: string;
}

// Inicializar EmailJS con tu clave pública
const PUBLIC_KEY = (import.meta as any)?.env?.PUBLIC_EMAILJS_KEY || 'gBy0LlfLY6DImLI6n';
emailjs.init(PUBLIC_KEY);

function setupContactForm() {
    const form = document.getElementById('contactForm') as HTMLFormElement | null;
    if (!form) return; // No hay formulario en esta página

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
        if (submitBtn) submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const data: Partial<ContactFormData> = {};

            formData.forEach((value, key) => {
                (data as any)[key] = value.toString();
            });

            // Validaciones básicas
            if (!data.name || !data.email || !data.message) {
                alert('Por favor completa nombre, correo y mensaje.');
                return;
            }

            // Mapeo amplio de variables para evitar 422 por nombres de plantilla
            const templateParams = {
                // nombres comunes
                from_name: data.name,
                user_name: data.name,
                name: data.name,

                from_email: data.email,
                reply_to: data.email,
                user_email: data.email,
                email: data.email,

                phone: data.phone,
                user_phone: data.phone,

                contact_reason: data.contactReason,
                contactReason: data.contactReason,

                message: data.message,
                message_html: data.message,

                to_name: 'Arkava',
            } as Record<string, string | undefined>;

            const response = await emailjs.send(
                'service_kcgtkly', // Service ID de EmailJS
                'template_o58cc8i', // Template ID de EmailJS
                templateParams,
                PUBLIC_KEY,
            );

            if (response.status === 200) {
                console.log('¡Mensaje enviado con éxito!');
                alert('¡Mensaje enviado con éxito!');
                form.reset();
            }
        } catch (error: any) {
            console.error('EmailJS error:', error);
            const status = error?.status;
            const text = error?.text || error?.message;
            if (status === 422) {
                console.error('422 Unprocessable Content. Verifica Service ID, Template ID y variables requeridas.');
            }
            alert(
                'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.'
            );
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactForm);
} else {
    setupContactForm();
}
