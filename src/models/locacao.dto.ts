export class LocacaoDTO {
    instanteDevolucao: string
    "@type": string
    desconto?: number
    diasPrevistos?: number
    carro: {id: string}
    cliente: {id: string}
    sede: {id: string} 
}