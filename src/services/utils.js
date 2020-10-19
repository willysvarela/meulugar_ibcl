export const getWhatsAppLink = (phone = '', type = '', subject = '') => {
    return `http://api.whatsapp.com/send?phone=55${phone}&text=${MESSAGES[type]} - ${subject}`;
}


const MESSAGES = {
    confirmar: 'Olá! Gostaria de confirmar sua reserva para o culto desta semana.'
};

export const formatDateTime = (dateTime) => {
    console.log({dateTime});
    const data = new Date(dateTime);
    const ano = data.getFullYear();
    const mes = (data.getMonth()+1).length === 1 ? data.getMonth()+1 : '0'+(data.getMonth()+1);
    const dia = data.getDate().toString();
    const hora = data.getUTCHours()+ 'h'+data.getMinutes();
    return dia+'/'+mes+' - ' + hora;
}