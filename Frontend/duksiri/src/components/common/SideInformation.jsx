import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

export default function SideInformation() {
  let responsePersondata, totalCredit;

  useEffect(() => {
    fetch('http://localhost:8080/duxby/smartschedule')
      .then((response) => response.json())
      .then((infoData) => {
        console.log(infoData);
        responsePersondata = responseJson.persondata;
        totalCredit =
          responsePersondata.GECredit +
          responsePersondata.setBaseMajorCredit +
          responsePersondata.firstMajorCredit +
          responsePersondata.secondMajorCredit;
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  }, []);

  return (
    <SideWrapper>
      <InfoTitle>학적정보 요약</InfoTitle>
      <InfoTable>
        <InfoTh>학번</InfoTh>
        <InfoTd>{responsePersondata && responsePersondata.userStudentNumber}</InfoTd>
        <tr></tr>
        <InfoTh>성명</InfoTh>
        <InfoTd>{responsePersondata && responsePersondata.userName}</InfoTd>
        <tr></tr>
        <InfoTh>수강학년(학기)</InfoTh>
        <InfoTd>
          {responsePersondata && responsePersondata.userGrade}학년{' '}
          {responsePersondata && responsePersondata.userSemester % 2 === 1 ? '1학기' : '2학기'}(
          {responsePersondata && responsePersondata.userSemester}){' '}
        </InfoTd>
        <tr></tr>
        <tr>
          <InfoTh rowSpan={2}>전공</InfoTh>
          <InfoTd>1전공 {responsePersondata && responsePersondata.userFirstMajor}</InfoTd>
        </tr>
        <InfoTd>2전공 {responsePersondata && responsePersondata.userSecondMajor}</InfoTd>
      </InfoTable>
      <InfoTitle>이수내역 요약</InfoTitle>
      <InfoTable>
        <InfoTh>졸업학점</InfoTh>
        <InfoTd>
          {totalCredit}/130(남은 학점 : {130 - totalCredit})
        </InfoTd>
        <tr></tr>
        <InfoTh>교양</InfoTh>
        <InfoTd>
          <InfoTd>
            {responsePersondata && responsePersondata.userStudentNumber < 20210000
              ? (responsePersondata && responsePersondata.A1Credit >= 3 ? 1 : 0) +
                  (responsePersondata && responsePersondata.A2Credit >= 3 ? 1 : 0) +
                  (responsePersondata && responsePersondata.A3Credit >= 3 ? 1 : 0) >=
                2
                ? ''
                : (responsePersondata && responsePersondata.A1Credit < 3 ? 'A1영역 미이수<br /> ' : '') +
                  (responsePersondata && responsePersondata.A2Credit < 3 ? 'A2영역 미이수<br /> ' : '') +
                  (responsePersondata && responsePersondata.A3Credit < 3 ? 'A3영역 미이수<br /> ' : '')
              : (responsePersondata && responsePersondata.A1Credit < 3 ? 'A1영역 미이수<br /> ' : '') +
                (responsePersondata && responsePersondata.A2Credit < 3 ? 'A2영역 미이수<br /> ' : '') +
                (responsePersondata && responsePersondata.A3Credit < 3 ? 'A3영역 미이수<br /> ' : '')}
            {responsePersondata && responsePersondata.BCredit < 3 ? 'B영역 미이수<br /> ' : ''}
            {responsePersondata && responsePersondata.CCredit < 3 ? 'C영역 미이수<br /> ' : ''}
            {responsePersondata && responsePersondata.SelfDisingCredit < 3 ? '자기설계 미이수<br /> ' : ''}
          </InfoTd>
        </InfoTd>
        <tr></tr>
        <InfoTh>전탐</InfoTh>
        <InfoTd>
          {responsePersondata && responsePersondata.userStudentNumber < 20200000
            ? '해당사항 없음'
            : responsePersondata && responsePersondata.setBaseMajorCredit >= 12
            ? '이수 완료'
            : `남은학점: ${12 - responsePersondata && responsePersondata.setBaseMajorCredit}`}
        </InfoTd>
        <tr></tr>
        <InfoTh>1전공</InfoTh>
        <InfoTd>
          {responsePersondata && responsePersondata.firstMajorCredit}/36<br></br>(남은 학점:
          {36 - (responsePersondata && responsePersondata.firstMajorCredit)})
        </InfoTd>
        <tr></tr>
        <InfoTh>2전공</InfoTh>
        <InfoTd>
          {responsePersondata && responsePersondata.secondMajorCredit}/36<br></br>(남은 학점:
          {36 - (responsePersondata && responsePersondata.secondMajorCredit)})
        </InfoTd>
      </InfoTable>
    </SideWrapper>
  );
}

const SideWrapper = styled.aside`
  width: 35rem;
  height: 100vh;

  background-color: #fff;

  padding: 5rem 3.5rem;
  position: fixed;
  right: 0;
`;
const InfoTitle = styled.p`
  color: #000;
  font-family: Noto Sans KR;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const InfoTable = styled.table`
  width: 28rem;
  font-family: Noto Sans KR;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 3;
  text-align: left;

  margin-top: 1rem;
  margin-bottom: 6rem;
`;
const InfoTh = styled.th`
  width: 14rem;
  color: #808080;
  padding-left: 1rem;
  border-bottom: 1px solid #bbb;
`;
const InfoTd = styled.td`
  color: #000;
  border-bottom: 1px solid #bbb;
`;
