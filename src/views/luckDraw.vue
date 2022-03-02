<template>
  <div class="luckDraw">
    <header class="header">
      <img src="@/assets/h_logo.png" alt="医学空间" width="182" height="56" />
    </header>
    <main class="main">
      <div class="left card">
        <p class="title">抽奖活动</p>
        <img
          :src="src"
          alt="转盘"
          width="400"
          height="260"
          style="object-fit: cover"
        />
        <button @click="play()">立即抽奖</button>
      </div>
      <div class="right card">
        <p class="title">中奖名单</p>
        <div class="userList">
          <div class="userItem" v-for="(item, index) in list" :key="index">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.phone }}</span>
          </div>
        </div>
        <div class="isEmpty" v-if="list.length == 0">
          <img src="@/assets/empty.png" width="295" height="147" />
          <p class="desc">暂无中奖名单</p>
        </div>
      </div>
    </main>
    <footer class="footer">
      <img src="@/assets/footer.png" height="131" />
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      src: "",
      isLoading: false,
      list: [],
    };
  },
  methods: {
    play() {
      this.isLoading = true;
      if (this.isLoading) {
        axios
          .get("/api/medical-activity/activity/lottery", {
            params: {
              voId: this.$route.query.voId,
              size: this.$route.query.size,
              // voId: "3f629723-2b6e-11eb-96f3-0242ac110002",
              // size: 10,
            },
          })
          .then((res) => {
            if (res.data.length != 0) {
              this.list = [...this.list, ...res.data];
            } else {
              alert("参与抽奖失败，请重试！");
            }
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
            alert("参与抽奖失败，请重试！");
          });
      } else {
        alert("正在抽奖中，请等待结果！");
      }
    },
  },
  watch: {
    isLoading: {
      handler(newVal) {
        if (newVal) {
          this.src = require("@/assets/luck.gif");
        } else {
          this.src = require("@/assets/luck.png");
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.luckDraw {
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
  min-width: 1100px;
  .header {
    height: 104px;
    background-color: #fff;
    img {
      margin-left: 230px;
    }
  }
  .main {
    min-height: calc(100vh - 275px);
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .card {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      border-radius: 4px;
      box-shadow: 2px 2px 4px 0 rgba($color: #000000, $alpha: 0.04);
      .title {
        margin: 24px 0 16px;
        text-align: center;
        font-size: 18px;
        line-height: 25px;
        font-weight: 700;
        color: #000;
      }
    }
    .left {
      margin-right: 20px;
      button {
        margin: 32px 0 78px;
        width: 156px;
        height: 52px;
        border: none;
        border-radius: 8px;
        box-shadow: 0 2px 8px 0 rgba($color: #ff0400, $alpha: 0.34);
        font-size: 20px;
        line-height: 28px;
        font-weight: 700;
        color: #ffd300;
        cursor: pointer;
        background: linear-gradient(180deg, #ff6322, #eb4120);
        outline: none;
      }
    }
    .right {
      width: 640px;
      min-height: 487px;
      .userList {
        padding: 0 12px 0 40px;
        display: flex;
        flex-wrap: wrap;
        .userItem {
          margin: 0 24px 24px 0;
          width: 172px;
          height: 36px;
          border-radius: 4px;
          background-color: #f9f9f9;
          display: flex;
          justify-content: center;
          align-items: center;
          .name {
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            color: #666;
          }
          .phone {
            margin-left: 8px;
            font-size: 12px;
            line-height: 17px;
            font-weight: 400;
            color: #ccc;
          }
        }
      }
      .isEmpty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .desc {
          margin-top: 12px;
          font-size: 12px;
          line-height: 17px;
          font-weight: 400;
          color: #ccc;
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
