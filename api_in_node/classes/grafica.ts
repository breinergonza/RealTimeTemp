

export class GraficaData {

    private minutos: string[] = ['min_5', 'min_15', 'min_25', 'min_35', 'min_45', 'min_55' ];
    private temperaturas: number[] = [0, 0, 0, 0, 0, 0];

    constructor() { }

    getDataGrafica() {
        return [
            { data: this.temperaturas , label: 'Temperatura'}
        ];
    }

    incrementarValor( minuto: string, temperatura: number ) {

        minuto = minuto.toLowerCase().trim();

        for( let i in this.minutos ) {
            if ( this.minutos[i] === minuto ) {
                this.temperaturas[i] = temperatura;
            }
        }

        return this.getDataGrafica();

    }


}