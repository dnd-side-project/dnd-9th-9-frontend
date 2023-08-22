const lockXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
  <g clip-path="url(#clip0_676_14891)">
    <path d="M28 18.6667H27V16.7619C27 14.1333 24.76 12 22 12C19.24 12 17 14.1333 17 16.7619V18.6667H16C14.9 18.6667 14 19.5238 14 20.5714V30.0952C14 31.1429 14.9 32 16 32H28C29.1 32 30 31.1429 30 30.0952V20.5714C30 19.5238 29.1 18.6667 28 18.6667ZM22 27.2381C20.9 27.2381 20 26.381 20 25.3333C20 24.2857 20.9 23.4286 22 23.4286C23.1 23.4286 24 24.2857 24 25.3333C24 26.381 23.1 27.2381 22 27.2381ZM19 18.6667V16.7619C19 15.181 20.34 13.9048 22 13.9048C23.66 13.9048 25 15.181 25 16.7619V18.6667H19Z" fill="#525463"/>
  </g>
  <defs>
    <clipPath id="clip0_676_14891">
      <rect width="44" height="44" fill="white"/>
    </clipPath>
  </defs>
</svg>
`;

const filterXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="11" viewBox="0 0 16 11" fill="none">
<path d="M7.11111 10.9091H8.88889C9.37778 10.9091 9.77778 10.5 9.77778 10C9.77778 9.5 9.37778 9.09091 8.88889 9.09091H7.11111C6.62222 9.09091 6.22222 9.5 6.22222 10C6.22222 10.5 6.62222 10.9091 7.11111 10.9091ZM0 0.909091C0 1.40909 0.4 1.81818 0.888889 1.81818H15.1111C15.6 1.81818 16 1.40909 16 0.909091C16 0.409091 15.6 0 15.1111 0H0.888889C0.4 0 0 0.409091 0 0.909091ZM3.55556 6.36364H12.4444C12.9333 6.36364 13.3333 5.95455 13.3333 5.45455C13.3333 4.95455 12.9333 4.54545 12.4444 4.54545H3.55556C3.06667 4.54545 2.66667 4.95455 2.66667 5.45455C2.66667 5.95455 3.06667 6.36364 3.55556 6.36364Z" fill="white"/>
</svg>`;

const searchingXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <circle cx="10" cy="10" r="7" stroke="#CDCED6" stroke-width="2"/>
  <rect x="14" y="15.4141" width="2" height="7.97296" rx="0.8" transform="rotate(-45 14 15.4141)" fill="#CDCED6"/>
</svg>`;

const arrowRightXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M18.3554 26.4958L23.0692 21.7821L18.3554 17.0683C17.8816 16.5945 17.8816 15.8292 18.3554 15.3554C18.8292 14.8815 19.5946 14.8815 20.0684 15.3554L25.6447 20.9317C26.1185 21.4055 26.1185 22.1708 25.6447 22.6446L20.0684 28.221C19.5946 28.6948 18.8292 28.6948 18.3554 28.221C17.8938 27.7472 17.8816 26.9696 18.3554 26.4958Z" fill="black"/>
</svg>`;

const matchingFloatingXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102" fill="none">
  <g filter="url(#filter0_d_912_18323)">
    <circle cx="51" cy="52" r="36" fill="#4EE0A7"/>
    <circle cx="51" cy="52" r="37" stroke="#E8E8EE" stroke-width="2"/>
  </g>
  <path d="M48.5097 53.5858C48.1422 44.572 51.4476 38.9148 53.3577 36.0587C53.6964 35.5522 54.4951 35.7407 54.5901 36.3426C54.9478 38.6087 55.6107 41.6986 56.9344 41.1162C58.8421 40.2767 60.1142 35.2742 60.6147 30.6083C60.6786 30.0121 61.4296 29.7776 61.791 30.2561C65.8477 35.6283 71.1489 44.9226 70.9715 52.081C70.9904 52.3591 71 52.6398 71 52.9229C71 59.4088 65.9648 64.6667 59.7537 64.6667C54.2579 64.6667 49.6828 60.5501 48.7019 55.1088C48.5965 54.618 48.5311 54.1099 48.5097 53.5858Z" fill="#C781FF" stroke="#C781FF" stroke-width="0.296296"/>
  <path d="M31.0282 62.4747C30.6608 53.4609 33.9662 47.8037 35.8762 44.9476C36.2149 44.4411 37.0137 44.6296 37.1087 45.2315C37.4663 47.4976 38.1292 50.5875 39.4529 50.0051C41.3606 49.1657 42.6327 44.1631 43.1332 39.4972C43.1972 38.901 43.9482 38.6665 44.3095 39.145C48.3663 44.5172 53.6675 53.8115 53.4901 60.9699C53.5089 61.248 53.5185 61.5287 53.5185 61.8118C53.5185 68.2977 48.4834 73.5556 42.2722 73.5556C36.7764 73.5556 32.2013 69.4391 31.2204 63.9977C31.115 63.5069 31.0496 62.9988 31.0282 62.4747Z" fill="white" stroke="#4EE0A7" stroke-width="0.296296"/>
  <defs>
    <filter id="filter0_d_912_18323" x="0" y="0" width="102" height="102" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="-1"/>
      <feGaussianBlur stdDeviation="6.5"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_912_18323"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_912_18323" result="shape"/>
    </filter>
  </defs>
</svg>
`;

const closeXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
  <g clip-path="url(#clip0_912_18320)">
    <path d="M42.9816 25.0588L35.5137 32.5267L42.9816 39.9947C43.8031 40.8162 43.8031 42.1604 42.9817 42.9819C42.1602 43.8034 40.816 43.8034 39.9945 42.9819L32.5265 35.5139L25.0586 42.9818C24.2371 43.8033 22.8929 43.8033 22.0714 42.9818C21.2499 42.1603 21.2499 40.8161 22.0714 39.9946L29.5393 32.5267L22.0713 25.0587C21.2498 24.2372 21.2498 22.893 22.0713 22.0715C22.8928 21.2501 24.237 21.2501 25.0585 22.0715L32.5265 29.5395L39.9944 22.0716C40.8158 21.2501 42.1601 21.2502 42.9816 22.0716C43.803 22.8931 43.803 24.2373 42.9816 25.0588Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_912_18320">
      <rect width="46" height="46.0004" fill="white" transform="translate(0 32.5269) rotate(-45)"/>
    </clipPath>
  </defs>
</svg>
`;

const addXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="34" height="33" viewBox="0 0 34 33" fill="none">
  <g clip-path="url(#clip0_1175_3675)">
    <path d="M26.1168 17.8549H18.5194V25.3483C18.5194 26.1725 17.8356 26.8469 16.9999 26.8469C16.1642 26.8469 15.4804 26.1725 15.4804 25.3483V17.8549H7.88301C7.04729 17.8549 6.36353 17.1805 6.36353 16.3563C6.36353 15.532 7.04729 14.8576 7.88301 14.8576H15.4804V7.36427C15.4804 6.54 16.1642 5.8656 16.9999 5.8656C17.8356 5.8656 18.5194 6.54 18.5194 7.36427V14.8576H26.1168C26.9525 14.8576 27.6363 15.532 27.6363 16.3563C27.6363 17.1805 26.9525 17.8549 26.1168 17.8549Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_1175_3675">
      <rect width="33.0909" height="32.6376" fill="white" transform="translate(0.45459 0.0377197)"/>
    </clipPath>
  </defs>
</svg>`;

const fireXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="26" viewBox="0 0 18 26" fill="none">
  <path d="M0.748048 17.5114C0.478045 10.8885 2.90667 6.73187 4.31009 4.63337C4.55896 4.26126 5.14583 4.39975 5.21563 4.84195C5.47843 6.50698 5.96549 8.7773 6.93808 8.34935C8.33977 7.73259 9.27442 4.05697 9.64217 0.628703C9.68916 0.19064 10.2409 0.0183617 10.5064 0.36994C13.4871 4.31715 17.3822 11.1461 17.2518 16.4058C17.2657 16.6101 17.2727 16.8163 17.2727 17.0243C17.2727 21.7899 13.5732 25.6531 9.00956 25.6531C4.97151 25.6531 1.60997 22.6284 0.889248 18.6304C0.811797 18.2698 0.763746 17.8965 0.748048 17.5114Z" fill="white"/>
</svg>`;

const verticalDotsData = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="4" viewBox="0 0 20 4" fill="none">
<circle cx="2" cy="2" r="2" fill="#252730"/>
<circle cx="10" cy="2" r="2" fill="#252730"/>
<circle cx="18" cy="2" r="2" fill="#252730"/>
</svg>`;

const homeXmlData = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.3887 7.15896L11.5758 1.15064C11.4124 1.02466 11.2095 0.956055 11.0005 0.956055C10.7915 0.956055 10.5887 1.02466 10.4252 1.15064L2.61141 7.15896C2.39363 7.32648 2.21774 7.53935 2.09684 7.78172C1.97593 8.0241 1.91312 8.28973 1.91309 8.55884V16.9832C1.91309 17.5525 2.14696 18.0986 2.56326 18.5012C2.97956 18.9038 3.54418 19.13 4.13291 19.13H9.15065V14.8793C9.15065 14.6421 9.2481 14.4146 9.42155 14.2468C9.59501 14.0791 9.83027 13.9848 10.0756 13.9848H11.9254C12.1707 13.9848 12.406 14.0791 12.5795 14.2468C12.7529 14.4146 12.8504 14.6421 12.8504 14.8793V19.13H17.8672C18.4559 19.13 19.0205 18.9038 19.4368 18.5012C19.8531 18.0986 20.087 17.5525 20.087 16.9832V8.55973C20.087 8.29063 20.0242 8.02499 19.9032 7.78262C19.7823 7.54024 19.6065 7.32648 19.3887 7.15896Z" fill="currentColor"/>
</svg>
`;

const recordXmlData = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1648_19634)">
<path d="M2.75 16.0053V18.792C2.75 19.0487 2.95167 19.2503 3.20833 19.2503H5.995C6.11417 19.2503 6.23333 19.2045 6.31583 19.1128L16.3258 9.112L12.8883 5.6745L2.8875 15.6753C2.79583 15.767 2.75 15.877 2.75 16.0053ZM18.9842 6.45367C19.3417 6.09617 19.3417 5.51867 18.9842 5.16117L16.8392 3.01617C16.4817 2.65867 15.9042 2.65867 15.5467 3.01617L13.8692 4.69367L17.3067 8.13117L18.9842 6.45367Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_1648_19634">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>
`;

const matchXmlData = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1648_19637)">
<path d="M17.857 11.3206C16.4178 7.58064 11.2937 7.37897 12.5312 1.94314C12.6228 1.5398 12.192 1.22814 11.8437 1.43897C8.51616 3.40064 6.12366 7.33314 8.13116 12.4848C8.29616 12.9065 7.80116 13.3006 7.44366 13.0256C5.78449 11.7698 5.61033 9.96397 5.75699 8.67147C5.81199 8.1948 5.18866 7.96564 4.92283 8.3598C4.29949 9.31314 3.66699 10.8531 3.66699 13.1723C4.01533 18.3056 8.35116 19.8823 9.90949 20.084C12.137 20.3681 14.5478 19.9556 16.2803 18.3698C18.187 16.6006 18.8837 13.7773 17.857 11.3206ZM9.35033 15.9315C10.6703 15.6106 11.3487 14.6573 11.532 13.814C11.8345 12.5031 10.652 11.2198 11.4495 9.14814C11.752 10.8623 14.447 11.9348 14.447 13.8048C14.5203 16.124 12.0087 18.1131 9.35033 15.9315Z" fill="currentColor"/>
<path d="M17.857 11.3206C16.4178 7.58064 11.2937 7.37897 12.5312 1.94314C12.6228 1.5398 12.192 1.22814 11.8437 1.43897C8.51616 3.40064 6.12366 7.33314 8.13116 12.4848C8.29616 12.9065 7.80116 13.3006 7.44366 13.0256C5.78449 11.7698 5.61033 9.96397 5.75699 8.67147C5.81199 8.1948 5.18866 7.96564 4.92283 8.3598C4.29949 9.31314 3.66699 10.8531 3.66699 13.1723C4.01533 18.3056 8.35116 19.8823 9.90949 20.084C12.137 20.3681 14.5478 19.9556 16.2803 18.3698C18.187 16.6006 18.8837 13.7773 17.857 11.3206ZM9.35033 15.9315C10.6703 15.6106 11.3487 14.6573 11.532 13.814C11.8345 12.5031 10.652 11.2198 11.4495 9.14814C11.752 10.8623 14.447 11.9348 14.447 13.8048C14.5203 16.124 12.0087 18.1131 9.35033 15.9315Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_1648_19637">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>
`;

const myXmlData = `
<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.17391 6.34146H19.8261C20.1374 6.34146 20.436 6.21812 20.6562 5.99856C20.8763 5.77901 21 5.48123 21 5.17073C21 4.86023 20.8763 4.56245 20.6562 4.3429C20.436 4.12334 20.1374 4 19.8261 4H4.17391C3.86257 4 3.56398 4.12334 3.34383 4.3429C3.12368 4.56245 3 4.86023 3 5.17073C3 5.48123 3.12368 5.77901 3.34383 5.99856C3.56398 6.21812 3.86257 6.34146 4.17391 6.34146ZM19.8261 10.8293H4.17391C3.86257 10.8293 3.56398 10.9526 3.34383 11.1722C3.12368 11.3917 3 11.6895 3 12C3 12.3105 3.12368 12.6083 3.34383 12.8278C3.56398 13.0474 3.86257 13.1707 4.17391 13.1707H19.8261C20.1374 13.1707 20.436 13.0474 20.6562 12.8278C20.8763 12.6083 21 12.3105 21 12C21 11.6895 20.8763 11.3917 20.6562 11.1722C20.436 10.9526 20.1374 10.8293 19.8261 10.8293ZM19.8261 17.6585H4.17391C4.01975 17.6585 3.8671 17.6888 3.72468 17.7477C3.58225 17.8065 3.45284 17.8927 3.34383 18.0014C3.23482 18.1101 3.14835 18.2392 3.08936 18.3812C3.03036 18.5233 3 18.6755 3 18.8293C3 18.983 3.03036 19.1352 3.08936 19.2773C3.14835 19.4193 3.23482 19.5484 3.34383 19.6571C3.45284 19.7658 3.58225 19.852 3.72468 19.9109C3.8671 19.9697 4.01975 20 4.17391 20H19.8261C19.9802 20 20.1329 19.9697 20.2753 19.9109C20.4177 19.852 20.5472 19.7658 20.6562 19.6571C20.7652 19.5484 20.8516 19.4193 20.9106 19.2773C20.9696 19.1352 21 18.983 21 18.8293C21 18.6755 20.9696 18.5233 20.9106 18.3812C20.8516 18.2392 20.7652 18.1101 20.6562 18.0014C20.5472 17.8927 20.4177 17.8065 20.2753 17.7477C20.1329 17.6888 19.9802 17.6585 19.8261 17.6585Z" fill="currentColor"/>
</svg>
`;

const minusXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5.9998 13.2C5.68154 13.2 5.37632 13.0736 5.15128 12.8485C4.92623 12.6235 4.7998 12.3182 4.7998 12C4.7998 11.6817 4.92623 11.3765 5.15128 11.1515C5.37632 10.9264 5.68154 10.8 5.9998 10.8H17.9998C18.3181 10.8 18.6233 10.9264 18.8483 11.1515C19.0734 11.3765 19.1998 11.6817 19.1998 12C19.1998 12.3182 19.0734 12.6235 18.8483 12.8485C18.6233 13.0736 18.3181 13.2 17.9998 13.2H5.9998Z" fill="currentColor"/>
</svg>`;

const plusXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M13.1429 10.8571V5.14286C13.1429 4.83975 13.0225 4.54906 12.8081 4.33474C12.5938 4.12041 12.3031 4 12 4C11.6969 4 11.4062 4.12041 11.1919 4.33474C10.9776 4.54906 10.8571 4.83975 10.8571 5.14286V10.8571H5.14286C4.83975 10.8571 4.54906 10.9776 4.33474 11.1919C4.12041 11.4062 4 11.6969 4 12C4 12.3031 4.12041 12.5938 4.33474 12.8081C4.54906 13.0225 4.83975 13.1429 5.14286 13.1429H10.8571V18.8571C10.8571 19.1602 10.9776 19.4509 11.1919 19.6653C11.4062 19.8796 11.6969 20 12 20C12.3031 20 12.5938 19.8796 12.8081 19.6653C13.0225 19.4509 13.1429 19.1602 13.1429 18.8571V13.1429H18.8571C19.1602 13.1429 19.4509 13.0225 19.6653 12.8081C19.8796 12.5938 20 12.3031 20 12C20 11.6969 19.8796 11.4062 19.6653 11.1919C19.4509 10.9776 19.1602 10.8571 18.8571 10.8571H13.1429Z" fill="currentColor"/>
</svg>`;

const heartXmlData = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_666_13943)">
    <path d="M15.243 3.7427C13.2638 2.39322 10.8197 3.02298 9.50021 4.56739C8.18071 3.02298 5.73665 2.38573 3.75741 3.7427C2.70782 4.46243 2.04807 5.67696 2.00309 6.95897C1.89813 9.86785 4.47714 12.1995 8.41312 15.7756L8.48809 15.8431C9.05788 16.3604 9.93504 16.3604 10.5048 15.8356L10.5873 15.7606C14.5233 12.192 17.0948 9.86035 16.9973 6.95147C16.9523 5.67696 16.2926 4.46243 15.243 3.7427ZM9.57518 14.6585L9.50021 14.7335L9.42523 14.6585C5.85661 11.4272 3.50251 9.29057 3.50251 7.1239C3.50251 5.62448 4.62708 4.49991 6.1265 4.49991C7.28106 4.49991 8.40563 5.24213 8.80297 6.26923H10.2049C10.5948 5.24213 11.7194 4.49991 12.8739 4.49991C14.3733 4.49991 15.4979 5.62448 15.4979 7.1239C15.4979 9.29057 13.1438 11.4272 9.57518 14.6585Z" fill="#252730"/>
  </g>
  <defs>
    <clipPath id="clip0_666_13943">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

export {
  lockXmlData,
  filterXmlData,
  searchingXmlData,
  arrowRightXmlData,
  matchingFloatingXmlData,
  closeXmlData,
  addXmlData,
  fireXmlData,
  verticalDotsData,
  homeXmlData,
  recordXmlData,
  matchXmlData,
  myXmlData,
  minusXmlData,
  plusXmlData,
  heartXmlData,
};
