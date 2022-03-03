<template>
  <div class="svg-wrp">
    <!-- <div class="container">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="yellowgreen"
          transform="translate(10,10) scale(1.5) skew(10deg)"
        ></rect>
      </svg>
    </div> -->
    <!-- <div class="container">
      <svg width="200" height="200" viewBox="0 0 400 400">
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#ccc"
          stroke-width="10"
        ></circle>
        <circle
          class="circle"
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="red"
          stroke-width="10"
        ></circle>
      </svg>
    </div> -->
    <!-- 解决开始旋转的 位置不是顶部的 -->
    <!-- transform="matrix(0 -1 1 0 0 400)" 旋转角度 -->
    <!-- <div class="container">
      <svg width="200" height="200" viewBox="0 0 400 400">
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#ccc"
          stroke-width="10"
        ></circle>
        <circle
          class="circle"
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="red"
          stroke-width="10"
          transform="matrix(0 -1 1 0 0 400)"
        ></circle>
      </svg>
    </div> -->
    <!-- 矩形进度条 -->
    <!-- <div class="container">
      <svg width="200" height="200" viewBox="0 0 400 400">
        <rect
          x="0"
          y="0"
          width="400"
          height="400"
          fill="none"
          stroke="#ccc"
          stroke-width="20"
        ></rect>
        <rect
          class="rect"
          x="0"
          y="0"
          width="400"
          height="400"
          fill="none"
          stroke="red"
          stroke-width="20"
          transform="matrix(0 -1 1 0 0 400)"
        ></rect>
      </svg>
    </div> -->

    <!-- 重写iconfont icon -->
    <div class="container">
      <h4>原始</h4>
      <svg viewBox="0 0 1024 1024" width="200" height="200">
        <path
          d="M751.36 883.2H272.64c-97.28 0-176.64-79.36-176.64-176.64 0-72.96 46.08-139.52 113.92-165.12v-6.4c0-58.88 39.68-110.08 96-125.44-7.68-14.08-11.52-28.16-11.52-43.52 0-52.48 43.52-96 96-96h47.36c8.96-1.28 75.52-15.36 97.28-53.76 8.96-16.64 10.24-34.56 1.28-56.32-2.56-5.12 0-11.52 3.84-14.08 3.84-3.84 10.24-5.12 15.36-2.56 2.56 1.28 74.24 38.4 90.88 128 47.36 6.4 84.48 46.08 84.48 96 0 15.36-3.84 30.72-11.52 43.52 56.32 15.36 96 66.56 96 125.44v6.4c67.84 25.6 113.92 92.16 113.92 165.12 0 96-79.36 175.36-177.92 175.36zM390.4 295.68c-38.4 0-69.12 30.72-69.12 69.12 0 16.64 6.4 32 16.64 44.8 2.56 3.84 3.84 8.96 2.56 14.08-1.28 5.12-6.4 7.68-11.52 8.96-52.48 5.12-93.44 49.92-93.44 102.4 0 3.84 0 7.68 1.28 11.52v2.56c1.28 6.4-2.56 12.8-8.96 14.08-62.72 19.2-106.24 78.08-106.24 143.36 0 83.2 67.84 149.76 149.76 149.76h480c83.2 0 149.76-67.84 149.76-149.76 0-65.28-43.52-124.16-106.24-143.36-6.4-2.56-10.24-7.68-8.96-14.08v-2.56c0-3.84 1.28-7.68 1.28-11.52 0-52.48-39.68-97.28-93.44-102.4-5.12 0-8.96-3.84-11.52-8.96-1.28-5.12-1.28-10.24 2.56-14.08 11.52-12.8 16.64-28.16 16.64-44.8 0-38.4-30.72-69.12-69.12-69.12-6.4 0-12.8-5.12-12.8-11.52-5.12-48.64-30.72-80.64-51.2-98.56 0 15.36-3.84 29.44-11.52 43.52-30.72 52.48-113.92 66.56-117.76 67.84H390.4z"
          p-id="1697"
        ></path>
        <path
          d="M162.56 757.76c-2.56 0-5.12-1.28-6.4-3.84-1.28-2.56-2.56-6.4-3.84-10.24-1.28-3.84 1.28-7.68 3.84-8.96 3.84-1.28 7.68 1.28 8.96 3.84 1.28 2.56 2.56 6.4 2.56 8.96 1.28 3.84 0 7.68-3.84 8.96 1.28 1.28 0 1.28-1.28 1.28zM751.36 830.72H272.64c-39.68 0-78.08-19.2-101.12-52.48-2.56-2.56-1.28-7.68 1.28-8.96s7.68-1.28 8.96 1.28c20.48 29.44 55.04 46.08 89.6 46.08h480c61.44 0 111.36-49.92 111.36-111.36 0-48.64-32-92.16-78.08-106.24-3.84-1.28-5.12-5.12-3.84-8.96 1.28-3.84 5.12-5.12 8.96-3.84 51.2 16.64 88.32 65.28 88.32 119.04-1.28 70.4-57.6 125.44-126.72 125.44z"
          p-id="1698"
        ></path>
        <path
          d="M615.68 563.2H224c-7.68 0-12.8-6.4-12.8-12.8s6.4-12.8 12.8-12.8h391.68c7.68 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8z"
          p-id="1699"
        ></path>
        <path
          d="M512 431.36H327.68c-7.68 0-12.8-6.4-12.8-12.8s6.4-12.8 12.8-12.8H512c7.68 0 12.8 6.4 12.8 12.8s-5.12 12.8-12.8 12.8z"
          p-id="1700"
        ></path>
      </svg>
    </div>
    <div class="container">
      <h4>重写</h4>
      <svg
        class="miaobian-icon"
        viewBox="0 0 1024 1024"
        width="200"
        height="200"
      >
        <path
          id="miaobian-path"
          d="M279.209096 569.364499c0-29.16525-23.64042-52.809763-52.806693-52.809763-29.16525 0-52.810786 23.644513-52.810786 52.809763 0 29.166273 23.645536 52.806693 52.810786 52.806693C255.568676 622.171192 279.209096 598.529749 279.209096 569.364499L279.209096 569.364499zM841.031828 569.364499C841.031828 569.364499 841.031828 598.529749 841.031828 569.364499c0-29.16525-23.645536-52.809763-52.810786-52.809763-29.16525 0-52.809763 23.644513-52.809763 52.809763l0 0 0 0c0 29.166273 23.644513 52.806693 52.809763 52.806693S841.031828 598.529749 841.031828 569.364499L841.031828 569.364499 841.031828 569.364499zM227.622184 500.416174l0 0.004093c37.264719 0 67.477834 30.213116 67.477834 67.477834 0 7.92653-1.62194 15.425318-4.13211 22.490224l433.449993 0c-2.192945-6.65456-3.672646-13.633508-3.672646-21.023826 0-37.264719 30.207999-67.477834 67.476811-67.477834 37.264719 0 67.472717 30.209022 67.472717 67.477834 0 7.390317-1.479701 14.369266-3.672646 21.023826l123.961266 0 0-48.895617c0-23.471574-60.627822-91.926666-129.08803-91.926666L721.721489 449.566042c0 0-89.971128-111.487164-205.365274-103.660918-125.175931-1.958608-181.892677-0.39295-181.892677-0.39295s-82.143858 10.16757-148.643412 102.094236c-72.366168-2.929726-93.882204 5.870708-93.882204 5.870708s-12.932544 7.334036-11.738345 25.424042c2.305509 25.418926-1.194198 111.48307-1.194198 111.48307l85.272106 0c-2.509147-7.065929-4.126994-14.559601-4.126994-22.490224C160.15049 530.629289 190.357466 500.416174 227.622184 500.416174L227.622184 500.416174zM668.916842 457.929524c0 0-355.969341 0.982374-422.463778 0 1.954515-28.361955 74.320683-71.38891 74.320683-71.38891s217.099527-3.911076 260.127506 0C623.928209 390.456806 668.916842 457.929524 668.916842 457.929524L668.916842 457.929524zM436.173011 385.066029l0 82.584903-13.204743 0 0-82.584903L436.173011 385.066029 436.173011 385.066029z"
          p-id="1700"
        ></path>
      </svg>
    </div>

    <!-- 动画 -->
    <div class="container">
      <h4>svg动画- set</h4>
      <svg width="200" height="200" viewBox="0 0 400 400">
        <line
          x1="0"
          y1="0"
          x2="200"
          y2="0"
          stroke="red"
          fill="none"
          stroke-width="20"
        >
          <set attributeType="XML" attributeName="y1" to="30" begin="3s"></set>
          <set attributeType="XML" attributeName="y2" to="30" begin="3s"></set>
          <set
            attributeType="XML"
            attributeName="stroke"
            to="blue"
            begin="5s"
          ></set>
        </line>
      </svg>
    </div>
    <!-- animate:
      from 起始状态，to终止状态，
      fill结束状态 : freeze保持结束状态，| remove 移除返回起始状态
      dur 过渡时间=duration  1s
     -->
    <div class="container">
      <h4>svg动画- Animation</h4>
      <svg width="200" height="200" viewBox="0 0 400 400">
        <circle
          cx="0"
          cy="0"
          r="100"
          stroke="red"
          fill="blue"
          stroke-width="10"
        >
          <animate
            attributeType="XML"
            attributeName="cx"
            from="0"
            to="200"
            dur="3s"
            fill="freeze"
          ></animate>
          <animate
            attributeType="XML"
            attributeName="cy"
            from="0"
            to="200"
            dur="3s"
            fill="freeze"
          ></animate>
          <animateTransform
            attributeType="XML"
            attributeName="transfrom"
            type="scale"
            from="1"
            to="1.5"
            begin="0"
            dur="3s"
            fill="freeze"
          ></animateTransform>
        </circle>
      </svg>
    </div>
    <!-- 重点
      path属性 M起始点，Z终止 中间是过程 L是线Lx y 坐标（x,y）
     -->
    <div class="container">
      <h4>svg动画-animateMotion</h4>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect x="0" y="0" width="10" height="10" fill="red">
          <animateMotion
            path="M10 10 L110 10 L110 110 L10 110 Z"
            dur="5s"
            rotate="0"
            fill="freeze"
            repeatCount="2"
          />
        </rect>
        <path
          d="M10 10 L110 10 L110 110 L10 110 Z"
          fill="none"
          stroke="green"
          stroke-width="1"
        ></path>
      </svg>
    </div>

    <div class="container">
      <h4>svg动画-animateMotion backward</h4>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect x="0" y="0" width="10" height="10" fill="red">
          <animateMotion
            id="forward-rect"
            path="M10 10 L110 10 L110 110 L10 110 "
            dur="5s"
            rotate="0"
            fill="freeze"
            begin="0;backward-rect.end + 0.5s"
          />
          <animateMotion
            id="backward-rect"
            path="M10 110 L110 110 L110 10 L10 10"
            dur="5s"
            rotate="0"
            fill="freeze"
            begin="forward-rect.end + 0.5s"
          />
        </rect>
        <path
          d="M10 10 L110 10 L110 110 L10 110"
          fill="none"
          stroke="green"
          stroke-width="1"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SvgAnimation',
  mounted() {
    // 算svg的path长度l
    // let miaobianPath = document.getElementById('miaobian-path')
    // let pathLen = miaobianPath.getTotalLength()
  }
}
</script>
<style scoped lang="scss">
.svg-wrp {
  display: flex;
  flex-wrap: wrap;
}
.container {
  margin-right: 30px;
  svg {
    border: 1px solid #ccc;
  }
  .circle {
    animation: loadingCircle 5s linear infinite;
  }

  .rect {
    animation: loadingRect 5s linear infinite;
  }

  .miaobian-icon {
    fill: none;
    stroke: rgb(192, 133, 5);
    stroke-width: 20;
    animation: miaobian 5s linear infinite;
  }
}

@keyframes loadingCircle {
  from {
    stroke-dasharray: 0 1131; //开始时：填充色0 到1131周长空白
  }
  to {
    stroke-dasharray: 1131 0; // 结束：1131填充色 0空白
  }
}

@keyframes loadingRect {
  from {
    stroke-dasharray: 0 1600; //开始时：填充色0 周长1600空白
  }
  to {
    stroke-dasharray: 1600 0; // 结束：1600填充色 0空白
  }
}

// 描边动画
@keyframes miaobian {
  from {
    stroke-dasharray: 4124;
    stroke-dashoffset: 4124;
  }
  to {
    stroke-dasharray: 4124;
    stroke-dashoffset: 0;
  }
}
</style>
