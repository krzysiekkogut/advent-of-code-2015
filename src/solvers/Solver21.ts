import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IStats {
  hp: number;
  damage: number;
  armor: number;
}

interface IShop {
  weapons: IItem[];
  armor: IItem[];
  rings: IItem[];
}

interface IItem {
  cost: number;
  damage: number;
  armor: number;
}

interface IEquipment {
  cost: number;
  items: IItem[];
}

export default class Solver21 extends BaseSolver<IStats> {
  protected filePath = '21.txt';

  protected solvePart1(boss: IStats): number {
    const equipmentCombinations: IEquipment[] = this.generateEquipmentCombinations();
    for (const equipment of equipmentCombinations) {
      const fightResult = this.fight({ ...boss }, equipment);
      if (fightResult) {
        return equipment.cost;
      }
    }

    throw new Error('Boss cannot be defeated, please use cheat codes.');
  }

  protected solvePart2(boss: IStats): number {
    const equipmentCombinations: IEquipment[] = this.generateEquipmentCombinations(false);
    for (const equipment of equipmentCombinations) {
      const fightResult = this.fight({ ...boss }, equipment);
      if (!fightResult) {
        return equipment.cost;
      }
    }

    throw new Error('Boss cannot win, be happy.');
  }

  protected parseInput(textInput: string): IStats {
    const [hp, damage, armor] = textInput.split(EOL).map(line => parseInt(line.split(':')[1].trim()));
    return { armor, damage, hp };
  }

  private generateEquipmentCombinations(fromCheapest = true): IEquipment[] {
    const shopItems: IShop = {
      armor: [
        { cost: 13, damage: 0, armor: 1 },
        { cost: 31, damage: 0, armor: 2 },
        { cost: 53, damage: 0, armor: 3 },
        { cost: 75, damage: 0, armor: 4 },
        { cost: 102, damage: 0, armor: 5 },
      ],
      rings: [
        { cost: 25, damage: 1, armor: 0 },
        { cost: 50, damage: 2, armor: 0 },
        { cost: 100, damage: 3, armor: 0 },
        { cost: 20, damage: 0, armor: 1 },
        { cost: 40, damage: 0, armor: 2 },
        { cost: 80, damage: 0, armor: 3 },
      ],
      weapons: [
        { cost: 8, damage: 4, armor: 0 },
        { cost: 10, damage: 5, armor: 0 },
        { cost: 25, damage: 6, armor: 0 },
        { cost: 40, damage: 7, armor: 0 },
        { cost: 74, damage: 8, armor: 0 },
      ],
    };
    const combinations: IEquipment[] = [];

    shopItems.weapons.forEach(weapon => {
      // 1W 0A 0R
      combinations.push({ items: [weapon], cost: weapon.cost });

      // 1W 0A 1R
      shopItems.rings.forEach(ring => {
        combinations.push({ items: [weapon, ring], cost: weapon.cost + ring.cost });
      });

      // 1W 0A 2R
      for (let i = 0; i < shopItems.rings.length; i++) {
        for (let j = i + 1; j < shopItems.rings.length; j++) {
          combinations.push({
            cost: weapon.cost + shopItems.rings[i].cost + shopItems.rings[j].cost,
            items: [weapon, shopItems.rings[i], shopItems.rings[j]],
          });
        }
      }

      shopItems.armor.forEach(armor => {
        // 1W 1A 0R
        combinations.push({ items: [weapon, armor], cost: weapon.cost + armor.cost });

        // 1W 1A 1R
        shopItems.rings.forEach(ring => {
          combinations.push({ items: [weapon, armor, ring], cost: weapon.cost + armor.cost + ring.cost });
        });

        // 1W 1A 2R
        for (let i = 0; i < shopItems.rings.length; i++) {
          for (let j = i + 1; j < shopItems.rings.length; j++) {
            combinations.push({
              cost: weapon.cost + armor.cost + shopItems.rings[i].cost + shopItems.rings[j].cost,
              items: [weapon, armor, shopItems.rings[i], shopItems.rings[j]],
            });
          }
        }
      });
    });

    return combinations.sort((a, b) => (a.cost - b.cost) * (fromCheapest ? 1 : -1));
  }

  private fight(boss: IStats, equipment: IEquipment): boolean {
    const player: IStats = {
      armor: equipment.items.reduce((prev, curr) => prev + curr.armor, 0),
      damage: equipment.items.reduce((prev, curr) => prev + curr.damage, 0),
      hp: 100,
    };

    let playerTurn = true;
    while (player.hp > 0 && boss.hp > 0) {
      const attacker = playerTurn ? player : boss;
      const defender = playerTurn ? boss : player;
      defender.hp -= Math.max(1, attacker.damage - defender.armor);
      playerTurn = !playerTurn;
    }

    return player.hp > 0;
  }
}
