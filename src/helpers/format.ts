export const grabFirstLetters = (name: string) => {
    const nameFormated = name.toUpperCase()
        // Pegar apenas as duas primeiras letras
        .split(' ').map((name) => name[0]).join('').slice(0, 2)
        // Remover characters que não são ASCII
        .replace(/[^a-z0-9]/gi, '')

    return nameFormated;
}