import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function SideNavigation() {
  const navigate = useNavigate();
  const MenuList = ['학생 정보', '이수 내역', '커리어 플래너', '스마트 시간표', '추천 강의'];

  function handleMovePage(menu) {
    switch (menu) {
      case '학생 정보':
        navigate('/career');
        break;
      case '이수 내역':
        navigate('/course');
        break;
      case '커리어 플래너':
        navigate('/career');
        break;
      case '스마트 시간표':
        navigate('/plan');
        break;
      default:
        navigate('/ready');
    }
  }
  return (
    <SideWrapper>
      <MenuUl>
        {MenuList.map((menu, idx) => (
          <MenuLi key={idx} onClick={() => handleMovePage(menu)}>
            {menu}
          </MenuLi>
        ))}
      </MenuUl>
    </SideWrapper>
  );
}

const SideWrapper = styled.aside`
  display: block;
  position: fixed;
  left: 0;

  width: 24rem;
  height: 100%;

  background-color: #2f3033;
`;

const MenuUl = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 6.7rem;

  color: #999;
`;

const MenuLi = styled.li`
  width: 23rem;
  margin: 0.3rem;
  padding: 2rem 5rem;

  font-size: 1.8rem;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;
