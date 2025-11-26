/*************************************
 컴포넌트 들에서 공통으로 사용하는 기능 작성하는 js
 ********************************** */

// 기능을 나눌 때 여러 ui 태그에서 반복적으로 사용하는 기능인가?
/***********************************************************
                         로딩 관련 함수
 ***********************************************************/
/**
 * 로딩상태 ui 컴포넌트 함수
 * @param message 초기값 로딩중
 * @returns {JSX.Element} 인자값으로 전달받은 message 가 존재한다면 인자값을 활용한 ui를 반환
 */
export  const renderLoading = (message = '로딩중') => {
    return(
        <div className="page-container">
            <div className="loading-container">
                <div className="loading-spinner">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}
/**
 * 데이터가 존재하지 않을 경우 보여주는 ui 컴포넌트 함수
 * @param message 초기값 데이터가 없습니다.
 * @returns {JSX.Element} 인자값으로 전달받은 message 가 존재한다면 인자값을 활용한 ui를 반환
 */
export const renderNoData = (message = '데이터가 없습니다.') => {
    return(
        <div className="no-data">
            <p>{message}</p>
        </div>
    )
}



/*
goToPage 하나면 navigateToBoard navigateToProduct 필요하지 않는다.
export  const navigateToBoard = (navigate, boardId) => {
    navigate(`/board/${boardId}`);
}

export  const navigateToProduct = (navigate, productId) => {
    navigate(`/product/${productId}`);
}

//  navigateToBoard navigateToProduct goToPage 만 있으면 필요 없음
*/
/**
 * 페이지 이동 함수
 * @param navigate 인자값으로 들어오는 기능 활용
 * @param path     인자값으로 들어오는 경로 활용 하여 페이지 이동 처리
 * @ 만일 path 자리에 -1 을 작성하면 뒤로가기 버튼으로 사용할 수 있다.
 */
export  const goToPage = (navigate, path) => {
    navigate(path);
}




/***********************************************************
                   날짜, 가격 포멧팅 함수
 ***********************************************************/
/**
 * 날짜 포멧팅 함수
 * @param dateString 백엔드로 가져오거나, 작성해놓은  특정 날짜데이터 매개변수 = 인자값으로 가져오기
 * @returns {string} 백엔드로 가져오거나, 작성해놓은  특정 날짜가 null 값으로 존재하지 않을 경우
 * @'-' 형태로 존재하지 않는 날짜입니다. 대신 표기
 * @특정 날짜 데이터를 dateString 으로 가져와 사용할 수 있다면 날짜를 한국기준으로 포멧팅하여 반환
 */
export const formatDate = (dateString) => {
    if(!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month:'long',
        date: 'numeric'
    });
};

/**
 * 가격 포멧팅 함수
 * @param price      백엔드로 가져오거나, 작성해놓은  특정 가격 데이터 매개변수 = 인자값으로 가져오기
 * @returns {string} 백엔드로 가져오거나, 작성해놓은  특정 가격이 null 값으로 존재하지 않을 경우
 * @'-' 형태로 존재하지 않는 가격입니다. 대신 표기
 * @특정 가격 데이터를 dateString 으로 가져와 사용할 수 있다면 가격를 한국기준으로 포멧팅하여 반환
 * @ 만일 한국이 아니라 전세계를 기준으로 판매하길 원한다면
 * @return new Intl.NumberFormat("특정나라 ip를 조회하여, 나라에 맞는 가격으로 보일 수 있도록 세팅").format(price);
 * ex ) 넷플릭스, 유튜브, 구글 결제 등 다양한 회사에서 활용
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
}

/**
 * input 태그 상태관리 함수
 * @param e 특정 input 에 이벤트(=행동)이 감지되면 동작
 * @param setFormData 백엔드로 전달할 formData 는 setter 를 이용하여 데이터 변환을 추가 적용
 * @logic { name, value } = e.target 행동이 감지된 input 타겟의 name 과 value 데이터를 가져와서 name = 키 명칭, value = 데이터 가져오기
 * @logic p =>({...p, [name]:value}  기존에 존재하던 formData 를 p 변수이름 내부에 그대로 복제하여 담아둔 후
 * 변화가 감지된 키의 데이터를 p 변수에 추가하고, 키 명칭이 존재한다면 데이터 수정, 키 명칭이 존재하지 않다는다면 키:데이터 추가
 * 변화된 p 전체 데이터는 setter 를 이용해서 formData 에 저장
 * @id         js 상태관리 할 때 주로 사용
 * @name       백엔드로 데이터를 주고 받을 때 사용
 * @className  스타일 세팅 사용
 */
export const handleInputChange = (e, setFormData) => {
    // id 키 명칭에 해당하는 데이터를 갖고오길 원한다면 name 대신 id 활용
    const { name, value } = e.target;
    setFormData(p => ({
        ...p,
        [name]: value
    }))
}


/***********************************************************
                유효성 검사 함수
 ***********************************************************/
const regexPw= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regexPhone = /^01[0-9]{8,9}$/;

const validatePassword = (password) => {
    if(!password) return true; // 비밀번호가 존재하지 않는게 맞다면 유효성검사 하지 않음
    return  regexPw.test(password);

}
const validatePhone = (phone) => {
    if(!phone) return true; // 비밀번호가 존재하지 않는게 맞다면 유효성검사 하지 않음
    return  regexPhone.test(phone);

}

// 비밀번호 형식확인

// 형빈 : 카테고리









