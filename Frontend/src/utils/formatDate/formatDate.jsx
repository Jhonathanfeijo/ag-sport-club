const formatDate = (dateString) =>{
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
};
export const normalizaDataParaInicioDoDia = (date) => {
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Meses são baseados em 0
        const dia = String(date.getDate()).padStart(2, '0');
        
        return `${ano}-${mes}-${dia}`;
    };

export default formatDate;