document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('board');
    const cellak = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const ujrainditasGomb = document.getElementById('restartButton');

    let aktualisJatekos = 'X';
    let jatekTabla = ['', '', '', '', '', '', '', '', ''];
    let jatekAktiv = true;

    const nyeroMintak = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]             
    ];

    const ellenorizNyertest = () => {
        for (const minta of nyeroMintak) {
            const [a, b, c] = minta;
            if (jatekTabla[a] && jatekTabla[a] === jatekTabla[b] && jatekTabla[a] === jatekTabla[c]) {
                return jatekTabla[a];
            }
        }
        return null;
    };

    const ellenorizDontetlent = () => {
        return jatekTabla.every(cella => cella !== '');
    };

    const befejezJatekot = (nyertes) => {
        jatekAktiv = false;
        if (nyertes) {
            status.textContent = `${nyertes} nyerte a játékot!`;
        } else {
            status.textContent = 'Döntetlen!';
        }
    };

    const veletlenszeruLepes = () => {
        const uresCellak = jatekTabla.reduce((acc, cella, index) => {
            if (cella === '') {
                acc.push(index);
            }
            return acc;
        }, []);
        const veletlenszeruIndex = Math.floor(Math.random() * uresCellak.length);
        return uresCellak[veletlenszeruIndex];
    };

    const gepiLepes = () => {
        for (const minta of nyeroMintak) {
            const [a, b, c] = minta;
            const sor = [jatekTabla[a], jatekTabla[b], jatekTabla[c]];
            const jatekosSorban = sor.filter(cella => cella === 'X').length;
            const gepSorban = sor.filter(cella => cella === 'O').length;

            if (gepSorban === 2 && jatekosSorban === 0) {
                const index = sor.findIndex(cella => cella === '');
                return minta[index];
            }
        }

        for (const minta of nyeroMintak) {
            const [a, b, c] = minta;
            const sor = [jatekTabla[a], jatekTabla[b], jatekTabla[c]];
            const jatekosSorban = sor.filter(cella => cella === 'X').length;
            const gepSorban = sor.filter(cella => cella === 'O').length;

            if (jatekosSorban === 2 && gepSorban === 0) {
                const index = sor.findIndex(cella => cella === '');
                return minta[index];
            }
        }

        return veletlenszeruLepes();
    };

    const kezelCellaKattintas = (index) => {
        if (!jatekAktiv || jatekTabla[index] !== '') {
            return;
        }

        jatekTabla[index] = aktualisJatekos;
        cellak[index].textContent = aktualisJatekos;

        const nyertes = ellenorizNyertest();
        if (nyertes) {
            befejezJatekot(nyertes);
        } else if (ellenorizDontetlent()) {
            befejezJatekot();
        } else {
            aktualisJatekos = aktualisJatekos === 'X' ? 'O' : 'X';
            status.textContent = `${aktualisJatekos} következik`;
            
            if (aktualisJatekos === 'O') {
                setTimeout(() => {
                    const gepLepesIndex = gepiLepes();
                    kezelCellaKattintas(gepLepesIndex);
                },);
            }
        }
    };

    const ujraInditJatekot = () => {
        jatekTabla = ['', '', '', '', '', '', '', '', ''];
        jatekAktiv = true;
        aktualisJatekos = 'X';
        status.textContent = `${aktualisJatekos} következik`;

        cellak.forEach((cella) => {
            cella.textContent = '';
        });
    };

    cellak.forEach((cella, index) => {
        cella.addEventListener('click', () => kezelCellaKattintas(index));
    });

    ujrainditasGomb.addEventListener('click', ujraInditJatekot);
});
