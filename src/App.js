import { Console, MissionUtils } from "@woowacourse/mission-utils";

class App {
  //게임시작
  start() {
    Console.print("숫자 야구 게임을 시작합니다.");
  }

  //랜덤으로 숫자 생성하기
  randomNumber() {
    const computerArr = [];
    while (computerArr.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computerArr.includes(number)) {
        computerArr.push(number);
      }
    }
    //생성한 숫자 문자열로 변환
    const computer = computerArr.join('');
    return computer;
  }

  //사용자로부터 값 입력받기
  async getNumbers() {
    const numbers = await Console.readLineAsync('숫자를 입력해주세요 : ');
    Console.print('');
    return numbers;
  }

  //값이 유효한지 확인, 유효하지 않으면 throw
  exception(numbers) {
    if (numbers.length !== 3) {
      throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
    }
    if (!/^\d+$/.test(numbers)) {
      throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
    }
  }

  //구 판정
  score(computer, numbers) {
    let strikes = 0;
    let balls = 0;
    let answer = "";

    for (let i = 0; i < 3; i++) {
      //같은 수, 같은 자리
      if (computer[i] === numbers[i]) {
        strikes += 1;
      }
      //같은 수, 다른 자리
      if (computer.includes(numbers[i])) {
        balls += 1;
      }
    }

    if (strikes === 0 && balls === 0) {
      answer = "낫싱";
    } else if (strikes === 0 && balls > 0) {
      answer = `${balls}볼`;
    } else if (strikes > 0 && balls === 0) {
      answer = `${strikes}스트라이크`;
    } else {
      answer = `${balls}볼 ${strikes}스트라이크`;
    }
    return answer;
  }

  //판정 결과 출력
  printAnswer(answer) {
    Console.print(answer);
  }

  //게임재시작 여부
  async reStart(strikes) {
    if (strikes === 3) {
      Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
      const choice = await Console.readLineAsync("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.")

      if (choice === "1") {
        this.play();
      } else if (choice === "2") {
        process.exit(0);
      } else {
        throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
      }

    }
  }

  async play() {
    this.start();
    const userNumbers = await this.getNumbers(); //사용자로부터 입력받은 숫자
    try {
      this.exception(userNumbers);
      const computerNumbers = this.randomNumber();//랜덤으로 생성된 숫자
      const answer = this.score(computerNumbers, userNumbers);
      this.printAnswer(answer);
    } catch (error) {
      Console.print(error.message);
      process.exit(1);
    }
  }
}

export default App;