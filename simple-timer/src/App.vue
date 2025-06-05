<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTimerStore } from './store/timer';
import { storeToRefs } from 'pinia';
import {
  Button as VanButton,
  Space as VanSpace,
  Switch as VanSwitch,
  Field as VanField,
  CellGroup as VanCellGroup,
  Toast // 引入 Toast 用于提示
} from 'vant';

const timerStore = useTimerStore();

// 从 store 中解构 state 和 getters (保持响应性)
const { formattedTime, isRunning, isCountdown, initialTime, currentTime } = storeToRefs(timerStore); // 添加 currentTime

// 从 store 中解构 actions
const { startTimer, pauseTimer, resetTimer, toggleMode, setInitialTime } = timerStore;

// 用于绑定 Vant Field 输入的倒计时初始时间 (单位：秒)
const countdownInputSeconds = ref<number>(initialTime.value);

// 监听 Pinia store中的 initialTime 变化，同步到本地的 countdownInputSeconds
watch(initialTime, (newVal) => {
  countdownInputSeconds.value = newVal;
});

// 当用户在输入框中修改时间后，调用 action 更新 store
const handleSetInitialTime = () => {
  const newTime = Number(countdownInputSeconds.value);
  if (!isNaN(newTime) && newTime >= 0) {
    setInitialTime(newTime);
    Toast(`倒计时已设置为 ${newTime} 秒`);
  } else {
    Toast.fail('请输入有效的秒数');
    countdownInputSeconds.value = initialTime.value;
  }
};

const handleToggleMode = () => {
  toggleMode();
  countdownInputSeconds.value = initialTime.value;
}

</script>

<template>
  <div class="timer-container">
    <h1>简易计时器</h1>

    <van-cell-group inset class="mode-switcher">
       <van-field name="switch" label="倒计时模式">
        <template #input>
          <van-switch :model-value="isCountdown" @update:model-value="handleToggleMode" size="20px" />
        </template>
      </van-field>
    </van-cell-group>

    <div v-if="isCountdown" class="countdown-settings">
      <van-cell-group inset>
        <van-field
          v-model="countdownInputSeconds"
          type="number"
          label="倒计时 (秒)"
          placeholder="请输入倒计时秒数"
          @blur="handleSetInitialTime"
          :disabled="isRunning"
        >
          <template #button>
            <van-button size="small" type="primary" @click="handleSetInitialTime" :disabled="isRunning">设定</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <div class="time-display">
      {{ formattedTime }}
    </div>

    <van-space direction="horizontal" :size="10" class="controls">
      <van-button
        type="primary"
        @click="startTimer"
        :disabled="isRunning || (isCountdown && initialTime === 0 && currentTime === 0)"
      >
        {{ isCountdown && currentTime === 0 && initialTime > 0 && !isRunning ? '开始倒计时' : (isRunning ? '运行中' : '启动') }}
      </van-button>
      <van-button
        type="warning"
        @click="pauseTimer"
        :disabled="!isRunning"
      >
        暂停
      </van-button>
      <van-button
        type="default"
        @click="resetTimer"
      >
        重置
      </van-button>
    </van-space>

     <div v-if="isCountdown && currentTime === 0 && initialTime > 0 && !isRunning && timerStore.intervalId === null" class="countdown-finished-text">
      🎉 倒计时结束! 🎉
    </div>

  </div>
</template>

<style scoped>
.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  min-height: 95vh;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  background-color: #f7f8fa;
}

h1 {
  color: #323233;
  margin-bottom: 20px;
}

.mode-switcher, .countdown-settings {
  margin-bottom: 20px;
  width: 90%;
  max-width: 350px;
}

.van-cell-group {
  border-radius: 8px;
}
.van-field__label {
  color: #646566;
}

.time-display {
  font-size: 3.5rem;
  font-weight: bold;
  color: #323233;
  margin: 25px 0;
  padding: 15px 25px;
  border: none;
  border-radius: 12px;
  background-color: #ffffff;
  min-width: 260px;
  letter-spacing: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.controls {
  margin-top: 25px;
}

.van-button {
  min-width: 80px;
  border-radius: 20px !important;
  font-weight: 500;
}
.van-button--primary {
  background-color: #07c160;
  border-color: #07c160;
}
.van-button--warning {
  background-color: #ff976a;
  border-color: #ff976a;
}
.van-button--default {
  color: #323233;
  border: 1px solid #ebedf0;
}

.countdown-finished-text {
  margin-top: 15px;
  color: #07c160; /* Green color for finished countdown */
  font-size: 1.1rem;
  font-weight: bold;
}
</style>