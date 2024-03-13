const currencyParser = (amount) => {
    const parsed = parseFloat(amount)
        .toFixed(2)
        .replace('.', ',')
        //eslint-disable-next-line
        .replace(/(\d)(?=(\d{3})+\,)/g, '$1.') // regex para colocar os pontos nos milhares

    return `R$ ${parsed}`
}

export default currencyParser
