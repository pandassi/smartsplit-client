import React, { Component } from "react";

export class SVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couleur: props.couleur
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.couleur !== nextProps.couleur) {
      this.setState({ couleur: nextProps.couleur });
    }
  }

  render() {
    return <></>;
  }
}

export class MenuMusiqueSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17H5C4.46957 17 3.96086 17.2107 3.58579 17.5858C3.21071 17.9609 3 18.4696 3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H7C7.53043 21 8.03914 20.7893 8.41421 20.4142C8.78929 20.0391 9 19.5304 9 19V17ZM21 15H17C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17C15 17.5304 15.2107 18.0391 15.5858 18.4142C15.9609 18.7893 16.4696 19 17 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V15Z"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 17V5L21 3V15"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export class MenuProfilSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="5"
          width="22"
          height="14"
          rx="2"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12C9.10457 12 10 11.1046 10 10C10 8.89543 9.10457 8 8 8C6.89543 8 6 8.89543 6 10C6 11.1046 6.89543 12 8 12Z"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18V17C12 15.8954 11.1046 15 10 15H7C5.89543 15 5 15.8954 5 17V18"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9H19M14 12H17"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export class MenuCollaborateurSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 20.9999V18.9999C22.9993 18.1136 22.7044 17.2527 22.1614 16.5522C21.6184 15.8517 20.8581 15.3515 20 15.1299"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799"
          stroke={this.state.couleur}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export class LogoSmartsplit extends SVG {
  render() {
    return (
      <svg
        className="tdb--navigation__svg"
        width="148"
        height="19"
        viewBox="0 0 148 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.912 12.432C0.912 13.392 1.08 14.232 1.392 14.976C1.704 15.72 2.16 16.368 2.736 16.872C3.288 17.376 3.96 17.76 4.752 18.048C5.52 18.312 6.36 18.432 7.248 18.432C8.184 18.432 9.024 18.312 9.792 18.096C10.56 17.856 11.232 17.496 11.784 17.04C12.336 16.584 12.792 16.032 13.104 15.36C13.416 14.688 13.56 13.92 13.56 13.056C13.56 12.216 13.392 11.52 13.032 10.92C12.672 10.344 12.192 9.84 11.64 9.432C11.088 9.024 10.44 8.688 9.744 8.4C9.048 8.136 8.352 7.872 7.656 7.632C6.936 7.368 6.36 7.08 5.928 6.744C5.472 6.432 5.256 5.976 5.256 5.424C5.256 4.848 5.448 4.416 5.856 4.128C6.264 3.84 6.744 3.696 7.296 3.696C7.968 3.696 8.496 3.912 8.856 4.344C9.216 4.776 9.384 5.376 9.384 6.12H13.272C13.272 5.4 13.152 4.728 12.912 4.08C12.648 3.432 12.288 2.88 11.784 2.376C11.28 1.872 10.656 1.488 9.912 1.2C9.168 0.912 8.28 0.767999 7.296 0.767999C6.528 0.767999 5.784 0.863999 5.088 1.056C4.368 1.272 3.744 1.56 3.192 1.968C2.64 2.376 2.208 2.856 1.896 3.456C1.56 4.056 1.392 4.728 1.392 5.496C1.392 6.336 1.536 7.056 1.848 7.632C2.16 8.208 2.568 8.688 3.072 9.096C3.576 9.504 4.2 9.864 4.896 10.152C5.592 10.44 6.312 10.728 7.08 11.016L8.112 11.424C8.424 11.568 8.712 11.736 8.952 11.904C9.168 12.072 9.36 12.288 9.504 12.504C9.624 12.744 9.696 13.032 9.696 13.368C9.696 13.968 9.48 14.424 9.072 14.784C8.64 15.144 8.112 15.336 7.488 15.336C6.696 15.336 6.048 15.072 5.544 14.568C5.04 14.064 4.8 13.344 4.8 12.432H0.912ZM34.9947 1.2H30.5787L26.1387 12.888L21.6507 1.2H17.1627V18H20.9547V7.584L24.6987 18H27.5787L31.2027 7.584V18H34.9947V1.2ZM53.3456 18L47.2736 1.2H43.6976L37.6976 18H41.8496L42.4976 15.96H48.4736L49.1216 18H53.3456ZM47.5136 12.912H43.4336L45.4976 6L47.5136 12.912ZM56.0533 18H59.9413V13.344H61.7653L64.7413 18H69.2533L65.8933 12.696C66.9493 12.192 67.7653 11.472 68.3653 10.488C68.9413 9.528 69.2293 8.448 69.2293 7.272C69.2293 6.456 69.0853 5.688 68.7973 4.944C68.5093 4.2 68.1013 3.552 67.5733 3C67.0213 2.448 66.3733 2.016 65.6293 1.68C64.8853 1.368 64.0453 1.2 63.1093 1.2H56.0533V18ZM59.9413 10.176V4.368H62.6053C63.0133 4.368 63.3733 4.44 63.7093 4.608C64.0453 4.776 64.3333 4.968 64.5733 5.232C64.7893 5.496 64.9813 5.808 65.1013 6.168C65.2213 6.528 65.2933 6.888 65.2933 7.272C65.2933 7.656 65.2213 8.016 65.1013 8.376C64.9813 8.736 64.7893 9.024 64.5733 9.288C64.3333 9.552 64.0453 9.768 63.7093 9.936C63.3733 10.104 63.0133 10.176 62.6053 10.176H59.9413ZM74.6911 18H78.5791V4.56H82.3951V1.2H70.8991V4.56H74.6911V18Z"
          fill="white"
        />
        <path
          d="M84.662 12.432C84.662 13.392 84.83 14.232 85.142 14.976C85.454 15.72 85.91 16.368 86.486 16.872C87.038 17.376 87.71 17.76 88.502 18.048C89.27 18.312 90.11 18.432 90.998 18.432C91.934 18.432 92.774 18.312 93.542 18.096C94.31 17.856 94.982 17.496 95.534 17.04C96.086 16.584 96.542 16.032 96.854 15.36C97.166 14.688 97.31 13.92 97.31 13.056C97.31 12.216 97.142 11.52 96.782 10.92C96.422 10.344 95.942 9.84 95.39 9.432C94.838 9.024 94.19 8.688 93.494 8.4C92.798 8.136 92.102 7.872 91.406 7.632C90.686 7.368 90.11 7.08 89.678 6.744C89.222 6.432 89.006 5.976 89.006 5.424C89.006 4.848 89.198 4.416 89.606 4.128C90.014 3.84 90.494 3.696 91.046 3.696C91.718 3.696 92.246 3.912 92.606 4.344C92.966 4.776 93.134 5.376 93.134 6.12H97.022C97.022 5.4 96.902 4.728 96.662 4.08C96.398 3.432 96.038 2.88 95.534 2.376C95.03 1.872 94.406 1.488 93.662 1.2C92.918 0.912 92.03 0.767999 91.046 0.767999C90.278 0.767999 89.534 0.863999 88.838 1.056C88.118 1.272 87.494 1.56 86.942 1.968C86.39 2.376 85.958 2.856 85.646 3.456C85.31 4.056 85.142 4.728 85.142 5.496C85.142 6.336 85.286 7.056 85.598 7.632C85.91 8.208 86.318 8.688 86.822 9.096C87.326 9.504 87.95 9.864 88.646 10.152C89.342 10.44 90.062 10.728 90.83 11.016L91.862 11.424C92.174 11.568 92.462 11.736 92.702 11.904C92.918 12.072 93.11 12.288 93.254 12.504C93.374 12.744 93.446 13.032 93.446 13.368C93.446 13.968 93.23 14.424 92.822 14.784C92.39 15.144 91.862 15.336 91.238 15.336C90.446 15.336 89.798 15.072 89.294 14.568C88.79 14.064 88.55 13.344 88.55 12.432H84.662ZM100.913 18H104.801V13.344H107.945C108.881 13.344 109.721 13.176 110.465 12.84C111.209 12.528 111.857 12.072 112.409 11.52C112.937 10.968 113.345 10.344 113.633 9.6C113.921 8.856 114.065 8.088 114.065 7.272C114.065 6.456 113.921 5.688 113.633 4.944C113.345 4.2 112.937 3.552 112.409 3C111.857 2.448 111.209 2.016 110.465 1.68C109.721 1.368 108.881 1.2 107.945 1.2H100.913V18ZM104.801 10.176V4.368H107.465C107.873 4.368 108.233 4.44 108.569 4.608C108.905 4.776 109.193 4.968 109.433 5.232C109.649 5.496 109.841 5.808 109.961 6.168C110.081 6.528 110.153 6.888 110.153 7.272C110.153 7.656 110.081 8.016 109.961 8.376C109.841 8.736 109.649 9.024 109.433 9.288C109.193 9.552 108.905 9.768 108.569 9.936C108.233 10.104 107.873 10.176 107.465 10.176H104.801ZM121.035 14.64V1.2H117.147V18H125.811V14.64H121.035ZM129.022 18H132.958V1.2H129.022V18ZM139.715 18H143.603V4.56H147.419V1.2H135.923V4.56H139.715V18Z"
          fill="#2DA84F"
        />
      </svg>
    );
  }
}

export class LogoPochette extends SVG {
  render() {
    return (
      <svg
        className="tdb--navigation__svg"
        width="200"
        height="32"
        viewBox="0 0 148 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M41.8233 14.9991H44.3193V12.8511H45.8553C46.3353 12.8511 46.7673 12.7671 47.1633 12.5991C47.5473 12.4311 47.8833 12.2031 48.1593 11.9151C48.4353 11.6391 48.6393 11.3031 48.7953 10.9311C48.9393 10.5591 49.0113 10.1511 49.0113 9.73109C49.0113 9.31109 48.9393 8.90309 48.7953 8.51909C48.6393 8.14709 48.4353 7.81109 48.1593 7.52309C47.8833 7.24709 47.5473 7.01909 47.1633 6.85109C46.7673 6.68309 46.3353 6.59909 45.8553 6.59909H41.8233V14.9991ZM44.3193 10.9191V8.54309H45.3633C45.6993 8.54309 45.9633 8.66309 46.1673 8.89109C46.3713 9.11909 46.4673 9.40709 46.4673 9.73109C46.4673 10.0551 46.3713 10.3431 46.1673 10.5711C45.9633 10.7991 45.6873 10.9191 45.3513 10.9191H44.3193Z"
          fill="white"
        />
        <path
          d="M59.5855 10.7991C59.5855 10.2231 59.4895 9.67109 59.2855 9.13109C59.0815 8.59109 58.7815 8.12309 58.3975 7.71509C58.0015 7.30709 57.5215 6.98309 56.9575 6.73109C56.3935 6.49109 55.7455 6.37109 55.0255 6.37109C54.3055 6.37109 53.6695 6.49109 53.1055 6.73109C52.5415 6.98309 52.0615 7.30709 51.6775 7.71509C51.2815 8.12309 50.9935 8.59109 50.7895 9.13109C50.5855 9.67109 50.4775 10.2231 50.4775 10.7991C50.4775 11.3751 50.5855 11.9271 50.7895 12.4671C50.9935 13.0071 51.2815 13.4751 51.6775 13.8831C52.0615 14.2911 52.5415 14.6151 53.1055 14.8551C53.6695 15.1071 54.3055 15.2271 55.0255 15.2271C55.7455 15.2271 56.3935 15.1071 56.9575 14.8551C57.5215 14.6151 58.0015 14.2911 58.3975 13.8831C58.7815 13.4751 59.0815 13.0071 59.2855 12.4671C59.4895 11.9271 59.5855 11.3751 59.5855 10.7991ZM52.9975 10.7991C52.9975 10.5231 53.0455 10.2471 53.1415 9.98309C53.2255 9.73109 53.3575 9.50309 53.5375 9.29909C53.7055 9.10709 53.9215 8.95109 54.1735 8.83109C54.4255 8.71109 54.7015 8.65109 55.0255 8.65109C55.3495 8.65109 55.6375 8.71109 55.8895 8.83109C56.1415 8.95109 56.3455 9.10709 56.5255 9.29909C56.6935 9.50309 56.8255 9.73109 56.9215 9.98309C57.0055 10.2471 57.0535 10.5231 57.0535 10.7991C57.0535 11.0751 57.0055 11.3511 56.9215 11.6031C56.8255 11.8671 56.6935 12.0951 56.5255 12.2871C56.3455 12.4911 56.1415 12.6471 55.8895 12.7671C55.6375 12.8871 55.3495 12.9471 55.0255 12.9471C54.7015 12.9471 54.4255 12.8871 54.1735 12.7671C53.9215 12.6471 53.7055 12.4911 53.5375 12.2871C53.3575 12.0951 53.2255 11.8671 53.1415 11.6031C53.0455 11.3511 52.9975 11.0751 52.9975 10.7991Z"
          fill="white"
        />
        <path
          d="M67.5761 11.6871C67.4921 12.0351 67.3001 12.3351 67.0001 12.5871C66.7001 12.8391 66.3161 12.9591 65.8481 12.9591C65.5241 12.9591 65.2241 12.8991 64.9721 12.7911C64.7201 12.6831 64.5041 12.5271 64.3241 12.3351C64.1441 12.1431 64.0001 11.9151 63.9041 11.6511C63.8081 11.3871 63.7601 11.0991 63.7601 10.7991C63.7601 10.5111 63.8081 10.2351 63.8921 9.97109C63.9761 9.71909 64.1081 9.49109 64.2761 9.28709C64.4441 9.09509 64.6601 8.93909 64.9121 8.81909C65.1641 8.69909 65.4641 8.63909 65.8001 8.63909C66.3161 8.63909 66.7241 8.77109 67.0241 9.04709C67.3241 9.32309 67.5041 9.65909 67.5761 10.0551H70.1921C70.1321 9.55109 70.0001 9.07109 69.7841 8.62709C69.5561 8.18309 69.2681 7.78709 68.8961 7.45109C68.5241 7.11509 68.0681 6.85109 67.5401 6.65909C67.0121 6.46709 66.4121 6.37109 65.7281 6.37109C65.0201 6.37109 64.3841 6.49109 63.8321 6.73109C63.2681 6.98309 62.8001 7.30709 62.4041 7.71509C62.0081 8.12309 61.7201 8.59109 61.5161 9.11909C61.3121 9.65909 61.2041 10.2111 61.2041 10.7991C61.2041 11.3871 61.3121 11.9391 61.5161 12.4791C61.7201 13.0191 62.0201 13.4871 62.4161 13.8951C62.8121 14.3031 63.2921 14.6271 63.8681 14.8671C64.4321 15.1071 65.0801 15.2271 65.8001 15.2271C66.4481 15.2271 67.0241 15.1311 67.5401 14.9391C68.0561 14.7591 68.5001 14.5071 68.8721 14.1831C69.2441 13.8591 69.5441 13.4871 69.7721 13.0551C70.0001 12.6231 70.1441 12.1671 70.2161 11.6871H67.5761Z"
          fill="white"
        />
        <path
          d="M77.0694 14.9991H79.5774V6.59909H77.0694V9.79109H74.7294V6.59909H72.2334V14.9991H74.7294V11.8671H77.0694V14.9991Z"
          fill="white"
        />
        <path
          d="M87.4579 8.47109V6.59909H82.0459V14.9991H87.4579V13.1271H84.5419V11.7231H87.4579V9.93509H84.5419V8.47109H87.4579Z"
          fill="white"
        />
        <path
          d="M91.0788 14.9991H93.5748V8.73509H95.3028V6.59909H89.3508V8.73509H91.0788V14.9991Z"
          fill="white"
        />
        <path
          d="M98.5124 14.9991H101.008V8.73509H102.736V6.59909H96.7844V8.73509H98.5124V14.9991Z"
          fill="white"
        />
        <path
          d="M110.122 8.47109V6.59909H104.71V14.9991H110.122V13.1271H107.206V11.7231H110.122V9.93509H107.206V8.47109H110.122Z"
          fill="white"
        />
        <path
          d="M38.1991 25.1431C38.4031 25.1431 38.6071 25.1071 38.7871 25.0351C38.9671 24.9511 39.1231 24.8431 39.2551 24.7111C39.3871 24.5791 39.4831 24.4351 39.5671 24.2551C39.6391 24.0871 39.6751 23.9071 39.6751 23.7031C39.6751 23.4991 39.6391 23.3191 39.5671 23.1391C39.4831 22.9711 39.3871 22.8151 39.2551 22.6831C39.1231 22.5511 38.9671 22.4551 38.7871 22.3711C38.6071 22.2991 38.4031 22.2631 38.1991 22.2631C37.9951 22.2631 37.8031 22.2991 37.6231 22.3711C37.4431 22.4551 37.2991 22.5511 37.1671 22.6831C37.0351 22.8151 36.9391 22.9711 36.8671 23.1391C36.7831 23.3191 36.7471 23.4991 36.7471 23.7031C36.7471 23.9071 36.7831 24.0871 36.8671 24.2551C36.9391 24.4351 37.0351 24.5791 37.1671 24.7111C37.2991 24.8431 37.4431 24.9511 37.6231 25.0351C37.8031 25.1071 37.9951 25.1431 38.1991 25.1431Z"
          fill="white"
        />
        <path
          d="M41.8897 24.9991H44.4097V16.5991H41.8897V24.9991Z"
          fill="white"
        />
        <path
          d="M49.4181 16.5991H46.8741V24.9991H49.3701V20.1871L52.1181 24.9991H54.6621V16.5991H52.1541V21.5791L49.4181 16.5991Z"
          fill="white"
        />
        <path
          d="M62.5439 18.6391V16.5991H57.1319V24.9991H59.6279V22.4671H62.5439V20.4991H59.6279V18.6391H62.5439Z"
          fill="white"
        />
        <path
          d="M73.5464 20.7991C73.5464 20.2231 73.4504 19.6711 73.2464 19.1311C73.0424 18.5911 72.7424 18.1231 72.3584 17.7151C71.9624 17.3071 71.4824 16.9831 70.9184 16.7311C70.3544 16.4911 69.7064 16.3711 68.9864 16.3711C68.2664 16.3711 67.6304 16.4911 67.0664 16.7311C66.5024 16.9831 66.0224 17.3071 65.6384 17.7151C65.2424 18.1231 64.9544 18.5911 64.7504 19.1311C64.5464 19.6711 64.4384 20.2231 64.4384 20.7991C64.4384 21.3751 64.5464 21.9271 64.7504 22.4671C64.9544 23.0071 65.2424 23.4751 65.6384 23.8831C66.0224 24.2911 66.5024 24.6151 67.0664 24.8551C67.6304 25.1071 68.2664 25.2271 68.9864 25.2271C69.7064 25.2271 70.3544 25.1071 70.9184 24.8551C71.4824 24.6151 71.9624 24.2911 72.3584 23.8831C72.7424 23.4751 73.0424 23.0071 73.2464 22.4671C73.4504 21.9271 73.5464 21.3751 73.5464 20.7991ZM66.9584 20.7991C66.9584 20.5231 67.0064 20.2471 67.1024 19.9831C67.1864 19.7311 67.3184 19.5031 67.4984 19.2991C67.6664 19.1071 67.8824 18.9511 68.1344 18.8311C68.3864 18.7111 68.6624 18.6511 68.9864 18.6511C69.3104 18.6511 69.5984 18.7111 69.8504 18.8311C70.1024 18.9511 70.3064 19.1071 70.4864 19.2991C70.6544 19.5031 70.7864 19.7311 70.8824 19.9831C70.9664 20.2471 71.0144 20.5231 71.0144 20.7991C71.0144 21.0751 70.9664 21.3511 70.8824 21.6031C70.7864 21.8671 70.6544 22.0951 70.4864 22.2871C70.3064 22.4911 70.1024 22.6471 69.8504 22.7671C69.5984 22.8871 69.3104 22.9471 68.9864 22.9471C68.6624 22.9471 68.3864 22.8871 68.1344 22.7671C67.8824 22.6471 67.6664 22.4911 67.4984 22.2871C67.3184 22.0951 67.1864 21.8671 67.1024 21.6031C67.0064 21.3511 66.9584 21.0751 66.9584 20.7991Z"
          fill="white"
        />
        <path
          d="M6.0498 16C6.0498 8.26801 12.4345 2 20.1665 2C27.8985 2 34.2831 8.26801 34.2831 16C34.2831 23.732 27.8985 30 20.1665 30C12.4345 30 6.0498 23.732 6.0498 16Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.2499 2H2.0166V30H30.2499V2ZM16.1333 20C18.3608 20 20.1666 18.2091 20.1666 16C20.1666 13.7909 18.3608 12 16.1333 12C13.9057 12 12.0999 13.7909 12.0999 16C12.0999 18.2091 13.9057 20 16.1333 20Z"
          fill="#F5752C"
        />
      </svg>
    );
  }
}

export class SettingsSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke="#8DA0B3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z"
          stroke="#8DA0B3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export class LogOutSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H10"
          stroke="#8DA0B3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 16L21 12L17 8"
          stroke="#8DA0B3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12H9"
          stroke="#8DA0B3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export class AvatarInitialsSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="12" fill="black" fillOpacity="0.1" />
      </svg>
    );
  }
}

export class ChevronDownSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="#8DA0B3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export class LangueSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        id="Calque_1"
        data-name="Calque 1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path class="cls-1" d="M0,0H24V24H0Z" />
        <path
          class="cls-2"
          d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm6.93,6H16a15.65,15.65,0,0,0-1.38-3.56A8,8,0,0,1,18.92,8ZM12,4a14.09,14.09,0,0,1,1.91,4H10.09A14.09,14.09,0,0,1,12,4ZM4.26,14a7.82,7.82,0,0,1,0-4H7.64a16.52,16.52,0,0,0-.14,2,16.52,16.52,0,0,0,.14,2Zm.82,2H8a15.65,15.65,0,0,0,1.38,3.56A8,8,0,0,1,5.08,16ZM8,8H5.08A8,8,0,0,1,9.41,4.44,15.65,15.65,0,0,0,8,8Zm4,12a14.09,14.09,0,0,1-1.91-4h3.82A14.09,14.09,0,0,1,12,20Zm2.34-6H9.66a14.71,14.71,0,0,1-.16-2,14.58,14.58,0,0,1,.16-2h4.68a14.58,14.58,0,0,1,.16,2A14.71,14.71,0,0,1,14.34,14Zm.25,5.56A15.65,15.65,0,0,0,16,16h3A8,8,0,0,1,14.59,19.56ZM16.36,14a16.52,16.52,0,0,0,.14-2,16.52,16.52,0,0,0-.14-2h3.38a7.82,7.82,0,0,1,0,4Z"
          fill="#8DA0B3"
        />
      </svg>
    );
  }
}
export class CopyrightSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.7071 14.2928C8.44076 13.0265 8.44076 10.9734 9.7071 9.70703C10.9734 8.44069 13.0266 8.44069 14.2929 9.70703C14.6834 10.0975 15.3166 10.0975 15.7071 9.70703C16.0976 9.3165 16.0976 8.68334 15.7071 8.29281C13.6597 6.24543 10.3403 6.24543 8.29288 8.29281C6.2455 10.3402 6.2455 13.6597 8.29288 15.707C10.3403 17.7544 13.6597 17.7544 15.7071 15.707C16.0976 15.3165 16.0976 14.6834 15.7071 14.2928C15.3166 13.9023 14.6834 13.9023 14.2929 14.2928C13.0266 15.5592 10.9734 15.5592 9.7071 14.2928Z"
          fill="#2DA84F"
        />
      </svg>
    );
  }
}
export class StarSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.4443 6.7706C12.3585 6.6044 12.1871 6.5 12 6.5C11.813 6.5 11.6416 6.6044 11.5557 6.7706L9.975 9.8319L6.43083 10.3271C6.2398 10.3538 6.08116 10.488 6.02316 10.6719C5.96516 10.8559 6.01813 11.0568 6.1593 11.1882L8.70972 13.5629L8.10887 16.9117C8.07543 17.0981 8.15016 17.2874 8.30192 17.4007C8.45367 17.514 8.6564 17.5318 8.82559 17.4467L12 15.8509L15.1744 17.4467C15.3436 17.5318 15.5464 17.514 15.6981 17.4007C15.8499 17.2874 15.9246 17.0981 15.8912 16.9117L15.2903 13.5629L17.8407 11.1882C17.9819 11.0568 18.0349 10.8559 17.9769 10.6719C17.9189 10.488 17.7602 10.3538 17.5692 10.3271L14.025 9.8319L12.4443 6.7706Z"
          fill="#2DA84F"
        />
      </svg>
    );
  }
}
export class RecordSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9 6C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7V17C8 17.5523 8.44772 18 9 18C9.55228 18 10 17.5523 10 17V14H13C15.2091 14 17 12.2091 17 10C17 7.79086 15.2091 6 13 6H9ZM13 12H10V8H13C14.1046 8 15 8.89543 15 10C15 11.1046 14.1046 12 13 12Z"
          fill="#2DA84F"
        />
      </svg>
    );
  }
}
export class PlusHorizontalSVG extends SVG {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"
          fill="#8DA0B3"
        />
      </svg>
    );
  }
}
