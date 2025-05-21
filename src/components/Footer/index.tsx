import { FooterStyled } from "./styled";

const Footer = () => {
  return (
    <FooterStyled>
      <div className="footer-wrap">
        <div className="footer-textBox">
          <div className="fontcolor">주식회사 PLANIT | 대표 안상현</div>
          <div className="fontcolor">사업자 등록번호 623-29-10284</div>
          <div className="fontcolor">서울특별시 염리동 숭문 4길 6, B1F</div>
          <div className="fontcolor">jinsoon6230@naver.com</div>
        </div>
        <div>
          <div className="fontcolor">
            Copyright © PlANIT. All Rights Reserved.
          </div>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
