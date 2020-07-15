export const getWhatsAppLink = (phone = '', type = '', subject = '') => {
    return `http://api.whatsapp.com/send?phone=55${phone}&text=${MESSAGES[type]} - ${subject}`;
}


const MESSAGES = {
    confirmar: 'Olá! Gostaria de confirmar sua reserva para o culto desta semana.'
};