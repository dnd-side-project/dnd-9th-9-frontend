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
};
