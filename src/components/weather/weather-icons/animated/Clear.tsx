export default function ClearSvgIcon() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="90"
      height="90"
      viewBox="0 0 64 64"
    >
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style type="text/css">
          {`
            @keyframes am-weather-cloud-1 {
              0% { transform: translate(-5px,0px); }
              50% { transform: translate(10px,0px); }
              100% { transform: translate(-5px,0px); }
            }

            .am-weather-cloud-1 {
              animation: am-weather-cloud-1 7s linear infinite;
            }

            @keyframes am-weather-cloud-2 {
              0% { transform: translate(0px,0px); }
              50% { transform: translate(2px,0px); }
              100% { transform: translate(0px,0px); }
            }

            .am-weather-cloud-2 {
              animation: am-weather-cloud-2 3s linear infinite;
            }

            @keyframes am-weather-sun {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            .am-weather-sun {
              animation: am-weather-sun 9s linear infinite;
            }

            @keyframes am-weather-sun-shiny {
              0% { strokeDasharray: 3px 10px; stroke-dashoffset: 0px; }
              50% { strokeDasharray: 0.1px 10px; stroke-dashoffset: -1px; }
              100% { strokeDasharray: 3px 10px; stroke-dashoffset: 0px; }
            }

            .am-weather-sun-shiny line {
              animation: am-weather-sun-shiny 2s linear infinite;
            }

            @keyframes am-weather-moon {
              0% { transform: rotate(0deg); }
              50% { transform: rotate(15deg); }
              100% { transform: rotate(0deg); }
            }

            .am-weather-moon {
              animation: am-weather-moon 6s linear infinite;
              transform-origin: 12.5px 15.15px 0;
            }

            @keyframes am-weather-moon-star-1 {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }

            .am-weather-moon-star-1 {
              animation: am-weather-moon-star-1 5s linear 1 3s;
            }

            @keyframes am-weather-moon-star-2 {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }

            .am-weather-moon-star-2 {
              animation: am-weather-moon-star-2 4s linear 1 5s;
            }

            @keyframes am-weather-rain {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -100; }
            }

            .am-weather-rain-1 {
              animation: am-weather-rain 8s linear infinite;
            }

            .am-weather-rain-2 {
              animation: am-weather-rain 8s linear infinite 0.25s;
            }

            @keyframes am-weather-snow {
              0% { transform: translateX(0) translateY(0); }
              33.33% { transform: translateX(-1.2px) translateY(2px); }
              66.66% { transform: translateX(1.4px) translateY(4px); opacity: 1; }
              100% { transform: translateX(-1.6px) translateY(6px); opacity: 0; }
            }

            @keyframes am-weather-snow-reverse {
              0% { transform: translateX(0) translateY(0); }
              33.33% { transform: translateX(1.2px) translateY(2px); }
              66.66% { transform: translateX(-1.4px) translateY(4px); opacity: 1; }
              100% { transform: translateX(1.6px) translateY(6px); opacity: 0; }
            }

            .am-weather-snow-1 {
              animation: am-weather-snow 2s linear infinite;
            }

            .am-weather-snow-2 {
              animation: am-weather-snow 2s linear infinite 1.2s;
            }

            .am-weather-snow-3 {
              animation: am-weather-snow-reverse 2s linear infinite;
            }

            .am-weather-easing-ease-in-out {
              animation-timing-function: ease-in-out;
            }
          `}
        </style>
      </defs>
      <g filter="url(#blur)" id="day">
        <g transform="translate(32,32)">
          <g className="am-weather-sun am-weather-sun-shiny am-weather-easing-ease-in-out">
            <g>
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(45)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(90)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(135)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(180)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(225)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(270)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(315)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
          </g>
          <circle
            cx="0"
            cy="0"
            fill="orange"
            r="5"
            stroke="orange"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  )
}
