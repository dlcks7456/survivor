function setDate(date){
    const nDate = new Date(date);
    return nDate.toISOString().split('T')[0]
}

export default setDate;