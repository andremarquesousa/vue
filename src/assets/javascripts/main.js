if (document.querySelector('#general').classList.contains('kill-monster')) {
    new Vue({
        el: '#general',
        data: {
            playerLife: 100,
            monsterLife: 100,
            init: false,
            logs: []
        },
        computed: {
            hasResult() {
                return this.playerLife == 0 || this.monsterLife == 0
            }
        },
        methods: {
            startGame() {
                this.init = true;
                this.playerLife = 100;
                this.monsterLife = 100;
                this.logs = [];
            },
            attack(special) {
                this.hurt('monsterLife', 5, 10, special, 'Jogador', 'Monstro', 'player');

                if (this.monsterLife > 0) {
                    this.hurt('playerLife', 7, 12, special, 'Monstro', 'Jogador', 'monster');
                }
            },
            hurt(prop, min, max, special, source, target, cls) {
                const plus = special ? 5 : 0;
                const hurt = this.getRandom(min + plus, max + plus);
                this[prop] = Math.max(this[prop] - hurt, 0);
                this.registerLog(`${source} atingiu ${target} com ${hurt}`, cls);
            },
            healingAndHurt() {
                this.healing(10, 15);
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster');
            },
            getRandom(min, max) {
                const value = Math.random() * (max - min) + min;
                return Math.round(value);
            },
            healing(min, max) {
                const healing = this.getRandom(min, max);
                this.playerLife = Math.min(this.playerLife + healing, 100);
                this.registerLog(`O jogador ganhou força de ${healing}`, 'player');
            },
            registerLog(text, cls) {
                this.logs.unshift({ text, cls });
            }
        },
        watch: {
            hasResult(value) {
                if (value) this.init = false;
            }
        }
    })
}