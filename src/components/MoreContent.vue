<template>
  <div class="more-content"><p>Chỉ còn lại<br/>{{ days }} ngày {{ hours }} giờ {{ minutes }} phút {{ seconds }} giây<br/>là đến Tết gòi á. Cố lên dọn nhà ăn tết hoai </p></div>
</template>

<script>
export default {
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const tetDate = new Date('January 29, 2025 00:00:00').getTime();

      setInterval(() => {
        const now = new Date().getTime();
        const distance = tetDate - now;

        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          clearInterval(this.countdown);
          this.days = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
          console.log("Chúc mừng năm mới!");
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.more-content {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
</style>
