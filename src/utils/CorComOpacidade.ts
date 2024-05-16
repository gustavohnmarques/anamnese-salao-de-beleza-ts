export const CorComOpacidade = (cor: string, opacidade: number) => {
    const stringCor = cor.substring(0, cor.length - 2);
    return `${stringCor} ${String(opacidade)} )`
}