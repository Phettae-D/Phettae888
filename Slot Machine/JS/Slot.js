    {       
        let balance = JSON.parse(localStorage.getItem("balance"));
        let currentBalance = JSON.stringify(balance);
        //localStorage.setItem("balance", currentBalance);
        let coutPerSpin = null;
        const SYMBOLS = ['A', 'B', 'C', 'D'];
        const SYMBOLS_VALUES = { A: 5, B: 4, C: 3, D: 2 };

        const FRIST_SYMVOLS = ['A', 'B', 'C', 'D'];
        const FRIST_SYMVOLS_VALUES = { A: 10, B: 10, C: 10, D: 10 };

        console.log(localStorage.getItem("balance"));

        function CurrentBalance() {
            document.getElementById("balance").innerText = balance;
        }

        function AddMoney() {
            balance += parseInt(document.getElementById("AddMoney").value);
            CurrentBalance();
            let currentBalance = JSON.stringify(balance);
            localStorage.setItem("balance", currentBalance);
            window.location.href = "Slot.html";
        }

        function spinReels() {
            return [
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
            ];
        }

        function fristSpin() {
            return [
                FRIST_SYMVOLS[Math.floor(Math.random() * FRIST_SYMVOLS.length)],
                FRIST_SYMVOLS[Math.floor(Math.random() * FRIST_SYMVOLS.length)],
                FRIST_SYMVOLS[Math.floor(Math.random() * FRIST_SYMVOLS.length)]
            ];
        }

        function startGame() {
            const bet = parseInt(document.getElementById("bet").value);
            if (isNaN(bet) || bet <= 0 || bet > balance) {
                document.getElementById("result").innerText = "Invalid bet amount!";
                return;
            }

            coutPerSpin++;
            let pettySpin = coutPerSpin % 3;
            balance -= bet;
            document.getElementById("balance").innerText = balance;

            if (coutPerSpin < 15) {
                if (pettySpin === 0) {
                    const reels = fristSpin();
                    document.getElementById("reel1").innerText = reels[0];
                    document.getElementById("reel2").innerText = reels[0];
                    document.getElementById("reel3").innerText = reels[0];

                    if (reels[0]) {
                        const winnings = bet * FRIST_SYMVOLS_VALUES[reels[0]];
                        balance += winnings;
                        document.getElementById("result").innerText = `You won $${winnings}!`;
                    } else {
                        document.getElementById("result").innerText = "You lost, try again!";
                    }
                    document.getElementById("balance").innerText = balance;
                } else {
                    const reels = fristSpin();
                    document.getElementById("reel1").innerText = reels[0];
                    document.getElementById("reel2").innerText = reels[1];
                    document.getElementById("reel3").innerText = reels[2];

                    if (reels[0] === reels[1] && reels[1] === reels[2]) {
                        const winnings = bet * SYMBOLS_VALUES[reels[0]];
                        balance += winnings;
                        document.getElementById("result").innerText = `You won $${winnings}!`;
                    } else {
                        document.getElementById("result").innerText = "You lost, try again!";
                    }
                    document.getElementById("balance").innerText = balance;
                }

            }
            else if (coutPerSpin > 15) {
                const reels = spinReels();
                document.getElementById("reel1").innerText = reels[0];
                document.getElementById("reel2").innerText = reels[1];
                document.getElementById("reel3").innerText = reels[2];

                if (reels[0] === reels[1] && reels[1] === reels[2]) {
                    const winnings = bet * SYMBOLS_VALUES[reels[0]];
                    balance += winnings;
                    document.getElementById("result").innerText = `You won $${winnings}!`;
                } else {
                    document.getElementById("result").innerText = "You lost, try again!";
                }
                document.getElementById("balance").innerText = balance;
            }
            let currentBalance = JSON.stringify(balance);
            localStorage.setItem("balance", currentBalance);
        }
        CurrentBalance();
    }