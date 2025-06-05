// src/store/timer.ts
import { defineStore } from 'pinia';

export const useTimerStore = defineStore('timer', {
  state: () => ({
    currentTime: 0,        // 当前时间（单位：秒）
    isRunning: false,
    intervalId: null as number | null,
    isCountdown: false,    // 新增：是否为倒计时模式
    initialTime: 60,       // 新增：倒计时的初始时间（例如，默认60秒）
  }),
  getters: {
    // 格式化时间，例如：00:00:00
    formattedTime(state): string {
      const totalSeconds = state.currentTime;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (num: number) => num.toString().padStart(2, '0');

      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    },
  },
  actions: {
    _tick() {
      if (this.isCountdown) {
        // 倒计时模式
        if (this.currentTime > 0) {
          this.currentTime--;
        } else {
          // 倒计时结束
          this.pauseTimer(); // 自动暂停计时器
          // 这里可以添加一个回调或者事件，通知UI倒计时结束
          console.log('Countdown finished!');
          // 未来可以在这里触发 Notify 或 Dialog
        }
      } else {
        // 正向计时模式
        this.currentTime++;
      }
    },

    startTimer() {
      if (!this.isRunning) {
        // 如果是倒计时模式，且当前时间为0，但初始时间大于0，则重置为初始时间再开始
        if (this.isCountdown && this.currentTime === 0 && this.initialTime > 0) {
          this.currentTime = this.initialTime;
        }
        // 如果是倒计时模式，但初始时间就是0 (或小于0)，并且当前时间也为0，则不应该启动
        if (this.isCountdown && this.initialTime <= 0 && this.currentTime === 0) {
            console.log('Countdown initial time is 0 or less, cannot start countdown from 0.');
            return; // 阻止启动
        }
        // 如果是倒计时模式，当前时间已经是0了（可能上次倒计时结束了），也不再启动
        if (this.isCountdown && this.currentTime === 0 && this.initialTime > 0) {
            // 这种情况理论上被上面的 currentTime = initialTime 覆盖了，但作为额外检查
            // 或者如果用户在0的时候暂停然后又点开始，需要重置到initialTime
             this.currentTime = this.initialTime;
        }


        this.isRunning = true;
        this.intervalId = setInterval(() => {
          this._tick();
        }, 1000);
        console.log('Timer started. Mode:', this.isCountdown ? 'Countdown' : 'Stopwatch', 'ID:', this.intervalId);
      }
    },

    pauseTimer() {
      if (this.isRunning) {
        this.isRunning = false;
        if (this.intervalId !== null) {
          clearInterval(this.intervalId);
          console.log('Timer paused. Interval cleared:', this.intervalId);
          this.intervalId = null;
        }
      }
    },

    resetTimer() {
      this.pauseTimer(); // 先调用 pauseTimer 清除 interval 和设置 isRunning
      if (this.isCountdown) {
        this.currentTime = this.initialTime; // 倒计时模式重置为初始时间
      } else {
        this.currentTime = 0; // 正向计时模式重置为0
      }
      console.log('Timer reset. Mode:', this.isCountdown ? 'Countdown' : 'Stopwatch', 'CurrentTime after reset:', this.currentTime);
    },

    // 新增：设置倒计时的初始时间
    setInitialTime(seconds: number) {
      // 确保传入的是一个非负数
      const newInitialTime = Math.max(0, seconds);
      this.initialTime = newInitialTime;
      // 如果当前是倒计时模式且计时器未运行，则更新 currentTime
      // 并且，如果计时器正在运行，也应该考虑是否重置 currenttime，或者提示用户需要重置。
      // 为简单起见，这里只在非运行状态下更新 currentTime。
      if (this.isCountdown && !this.isRunning) {
        this.currentTime = this.initialTime;
      }
      console.log('Initial countdown time set to:', this.initialTime);
    },

    // 新增：切换计时模式
    toggleMode() {
      this.isCountdown = !this.isCountdown;
      // 切换模式时，总是先暂停计时器（如果正在运行）
      this.pauseTimer();
      // 然后根据新模式重置 currentTime
      if (this.isCountdown) {
        this.currentTime = this.initialTime;
      } else {
        this.currentTime = 0;
      }
      console.log('Timer mode toggled to:', this.isCountdown ? 'Countdown' : 'Stopwatch', 'CurrentTime after toggle:', this.currentTime);
    }
  },
});