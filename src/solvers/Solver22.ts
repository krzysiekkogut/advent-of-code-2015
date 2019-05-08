import BaseSolver from './BaseSolver';

interface IGame {
  bossHealth: number;
  bossDamage: number;
  wizardHealth: number;
  wizardMana: number;
  wizardArmorTurns: number;
  manaSpent: number;
  playerTurn: boolean;
  poisonTurns: number;
  rechargeTurns: number;
}

export default class Solver22 extends BaseSolver<IGame> {
  protected filePath = '22.txt';

  protected solvePart1(game: IGame): number {
    return this.simulateFight(game);
  }

  protected solvePart2(game: IGame): number {
    return this.simulateFight(game, true);
  }

  protected parseInput(textInput: string): IGame {
    const [bossHealth, bossDamage] = textInput.match(/(\d+)/gm)!.map(n => parseInt(n));
    return {
      bossDamage,
      bossHealth,
      manaSpent: 0,
      playerTurn: true,
      poisonTurns: 0,
      rechargeTurns: 0,
      wizardArmorTurns: 0,
      wizardHealth: 50,
      wizardMana: 500,
    };
  }

  private simulateFight(game: IGame, levelHard = false) {
    const possibleManaSpendingsToWin: number[] = [];
    const queue = [game];
    const visited = new Set<string>(JSON.stringify(game));
    while (queue.length > 0) {
      const currentGame = queue.shift()!;

      if (levelHard && currentGame.playerTurn) {
        currentGame.wizardHealth--;
        if (currentGame.wizardHealth <= 0) {
          continue;
        }
      }

      const wizardArmor = this.playEffectsAndCalcArmor(currentGame);

      if (currentGame.bossHealth <= 0) {
        possibleManaSpendingsToWin.push(currentGame.manaSpent);
        continue;
      }

      if (currentGame.wizardHealth <= 0 || currentGame.wizardMana < 53) {
        continue;
      }

      const nextGames: Array<IGame | null> = [];
      if (currentGame.playerTurn) {
        nextGames.push(this.playMissile(currentGame));
        nextGames.push(this.playDrain(currentGame));
        nextGames.push(this.playShield(currentGame));
        nextGames.push(this.playPoison(currentGame));
        nextGames.push(this.playRecharge(currentGame));
      } else {
        nextGames.push(this.playBoss(currentGame, wizardArmor));
      }

      this.addGamesToQueue(nextGames, visited, queue);
    }

    return Math.min(...possibleManaSpendingsToWin);
  }

  private hashGame(game: IGame) {
    return JSON.stringify(game);
  }

  private addGamesToQueue(nextGames: Array<IGame | null>, visited: Set<string>, queue: IGame[]): void {
    (nextGames.filter(g => !!g) as IGame[]).forEach(g => {
      const hash = this.hashGame(g);
      if (!visited.has(hash)) {
        visited.add(hash);
        queue.push(g);
      }
    });
  }

  private playMissile(game: IGame): IGame | null {
    if (game.wizardMana < 53) {
      return null;
    }

    const newGame: IGame = { ...game, playerTurn: false };
    newGame.manaSpent += 53;
    newGame.wizardMana -= 53;
    newGame.bossHealth -= 4;
    return newGame;
  }

  private playDrain(game: IGame): IGame | null {
    if (game.wizardMana < 73) {
      return null;
    }

    const newGame: IGame = { ...game, playerTurn: false };
    newGame.manaSpent += 73;
    newGame.wizardMana -= 73;
    newGame.bossHealth -= 2;
    newGame.wizardHealth += 2;
    return newGame;
  }

  private playShield(game: IGame): IGame | null {
    if (game.wizardArmorTurns > 0 || game.wizardMana < 113) {
      return null;
    }

    const newGame: IGame = {
      ...game,
      playerTurn: false,
      wizardArmorTurns: 6,
    };
    newGame.manaSpent += 113;
    newGame.wizardMana -= 113;
    return newGame;
  }

  private playPoison(game: IGame): IGame | null {
    if (game.poisonTurns > 0 || game.wizardMana < 173) {
      return null;
    }

    const newGame: IGame = {
      ...game,
      playerTurn: false,
      poisonTurns: 6,
    };
    newGame.manaSpent += 173;
    newGame.wizardMana -= 173;
    return newGame;
  }

  private playRecharge(game: IGame): IGame | null {
    if (game.rechargeTurns > 0 || game.wizardMana < 229) {
      return null;
    }

    const newGame = {
      ...game,
      playerTurn: false,
      rechargeTurns: 5,
    };
    newGame.manaSpent += 229;
    newGame.wizardMana -= 229;
    return newGame;
  }

  private playBoss(game: IGame, wizardArmor: number): IGame {
    const newGame: IGame = {
      ...game,
      playerTurn: true,
    };
    newGame.wizardHealth -= Math.max(1, game.bossDamage - wizardArmor);
    return newGame;
  }

  private playEffectsAndCalcArmor(game: IGame): number {
    if (game.poisonTurns > 0) {
      game.poisonTurns--;
      game.bossHealth -= 3;
    }

    if (game.rechargeTurns > 0) {
      game.rechargeTurns--;
      game.wizardMana += 101;
    }

    let wizardArmor = 0;
    if (game.wizardArmorTurns > 0) {
      game.wizardArmorTurns--;
      wizardArmor = 7;
    }

    return wizardArmor;
  }
}
