<template>
  <div>
    <!-- viewBox视口 内部图形 实际大小= （svg宽度/viewBox） * 自己的大小
    如： circle大小= 50/100* 50 = 25~ -->
    <!-- <svg width="100" height="100" viewBox="0 0 100 100">
      <circle r="5" cx="20" cy="25" fill="currentColor" />
      <circle r="5" cx="20" cy="50" fill="currentColor" />
      <circle r="5" cx="20" cy="75" fill="currentColor" />
      <line x1="40" y1="25" x2="90" y2="25" stroke-width="8" stroke="currentColor" />
      <line x1="40" y1="50" x2="90" y2="50" stroke-width="8" stroke="currentColor" />
      <line x1="40" y1="75" x2="90" y2="75" stroke-width="8" stroke="currentColor" />
    </svg> -->
    <!-- svg内部文件放到defs中 g设置id-->
    <!-- g 作用设置一个id -->
    <!-- <svg width="0" height="0" viewBox="0 0 100 100" >
      <defs>
        <g id="more">
          <circle r="5" cx="20" cy="25" fill="currentColor" />
          <circle r="5" cx="20" cy="50" fill="currentColor" />
          <circle r="5" cx="20" cy="75" fill="currentColor" />
          <line x1="40" y1="25" x2="90" y2="25" stroke-width="8" stroke="currentColor" />
          <line x1="40" y1="50" x2="90" y2="50" stroke-width="8" stroke="currentColor" />
          <line x1="40" y1="75" x2="90" y2="75" stroke-width="8" stroke="currentColor" />
        </g>
      </defs>
    </svg> -->
    <svg width="0" height="0">
      <defs>
        <symbol id="more" viewBox="0 0 100 100">
          <circle r="5" cx="20" cy="25" fill="currentColor" />
          <circle r="5" cx="20" cy="50" fill="currentColor" />
          <circle r="5" cx="20" cy="75" fill="currentColor" />
          <line
            x1="40"
            y1="25"
            x2="90"
            y2="25"
            stroke-width="8"
            stroke="currentColor"
          />
          <line
            x1="40"
            y1="50"
            x2="90"
            y2="50"
            stroke-width="8"
            stroke="currentColor"
          />
          <line
            x1="40"
            y1="75"
            x2="90"
            y2="75"
            stroke-width="8"
            stroke="currentColor"
          />
        </symbol>
        <!-- 实心箭头 -->
        <symbol id="filledArrowRight" viewBox="0 0 100 100">
          <polyline points="20 10, 80 50, 20 90" fill="currentColor"></polyline>
        </symbol>
        <!-- 箭头 -->
        <symbol id="arrowRight" viewBox="0 0 100 100">
          <polyline
            points="20 10, 80 50, 20 90"
            fill="transparent"
            stroke-width="4"
            stroke="currentColor"
          ></polyline>
        </symbol>

        <!-- 官方库里的svg -->
        <symbol
          viewBox="0 0 1024 1024"
          id="car123"
        >
          <path
            d="M689.536 192c26.816 0 50.794667 16.64 60.202667 41.706667l78.08 207.978666 67.754666-39.125333 27.562667 47.786667-50.709333 29.269333a64.213333 64.213333 0 0 1 27.157333 52.522667v202.368a64.298667 64.298667 0 0 1-64.298667 64.298666h-27.648V874.666667h-55.146666v-75.861334H255.957333V874.666667H200.853333v-75.861334H173.184a64.298667 64.298667 0 0 1-64.32-64.298666v-202.368a64.213333 64.213333 0 0 1 27.2-52.522667L85.333333 450.346667l27.584-47.786667 67.733334 39.104 78.08-207.957333A64.298667 64.298667 0 0 1 318.933333 192h370.602667z m145.728 342.954667H173.184v199.552h662.101333v-199.552z m-556.288 50.090666a41.386667 41.386667 0 1 1 0 82.752 41.386667 41.386667 0 0 1 0-82.752z m455.125333 0a41.386667 41.386667 0 1 1 0 82.752 41.386667 41.386667 0 0 1 0-82.752z m-44.565333-328.746666H318.933333l-79.402666 211.52h529.386666l-79.36-211.52z m-79.573333 46.037333v62.058667h-206.869334v-62.08h206.869334z"
            fill="currentColor"
          ></path>
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CustomSvg'
}
</script>
