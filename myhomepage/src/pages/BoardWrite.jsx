// 글쓰기
import {useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {handleChangeImage, handleInputChange} from "../service/commonService";
import {boardSave} from "../service/ApiService";
/*
user?.memberEmail = 삼항연산자의 줄임표현
user 객체가 존재하면 user.memberEmail 반환
user 가  null 또는 undefined 라면 에러 없이 undefined 반환

const email = user.memberEmail;
        의 경우 user가 null 일 경우 error 발생

const email = user?.memberEmail'
        의 경우 user가 null 일 경우 undefined 발생


user?.memberEmail 아래와 동일하게 작동

user ? user.memberEmail : undefined 형태

let email;
if (user) {
      email = user.memberEmail;
} else {
      email = undefined;
}
* */

const BoardWrite = () => {
    const navigate = useNavigate();
    const {user, isAuthenticated, logoutFn} = useAuth();

    // 메인 이미지 관련
    const mainImgFileInputRef = useRef(null);
    const [uploadedMainBoardImageFile, setuploadedMainBoardImageFile] = useState(null);
    const [boardMainImagePreview, setboardMainImagePreview] = useState(null);

    // 상세 이미지 관련 (최대 5장)
    const detailImgsFileInputRef = useRef(null);
    const [uploadedDetailBoardImageFiles, setuploadedDetailBoardImageFiles] = useState(null);
    const [boardDetailImagePreviews, setboardDetailImagePreviews] = useState([]);


    // 상세 이미지 관련 (최대 5장)
    const [board, setBoard] = useState({
        title: '',
        content: '',
        writer: user?.memberEmail,

    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        const boardUploadFromData = new FormData();

        const boardData = {
            title: board.title,
            content: board.content,
            writer: user?.memberEmail,

        }

        const boardDataBlob = new Blob(
            [JSON.stringify(boardData)],
            {type: 'application/json'}
        );

        boardUploadFromData.append('board', boardDataBlob);

        if (uploadedMainBoardImageFile) boardUploadFromData.append('imageFile', uploadedMainBoardImageFile);

        await boardSave(axios, boardUploadFromData, navigate);


    };
    //export const formatPrice = (price) => {
    //     return new Intl.NumberFormat("ko-KR").format(price);
    // }

    const handleChange = (e) => {
        handleInputChange(e, setBoard);
    }

    // 상세 이미지 여러 장 변경 핸들러
    const handleDetailImagesChanges = (e) => {
        const files = Array.from(e.target.files);

        // 최대 5장 까지만 허용
        if (files.length > 5) {
            alert("상세 이미지는 최대 5장 까지  업로드 가능합니다.");
            return;
        }

        // 각 파일이 5MB 가 넘는지 검증
        for (let f of files) {
            if (f.size > 5 * 1024 * 1024) {
                alert(`${f.name}의 크기가 5MB 를 초과합니다.`);
                return;
            }

            if (!f.type.startsWith('image/')) {
                alert(`${f.name}은(는) 이미지 파일이 아닙니다.`);
                return;
            }
        }
        // for 문을 통해 모든 사진에 대한 검증이 종료되면, 상세이미지 파일에 파일명칭 저장
        setuploadedDetailBoardImageFiles(files);

        // 미리보기 생성
        const 미리보기할_상세사진들 = [];
        let 사진개수 = 0;

        files.forEach((file, 사진순서) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                미리보기할_상세사진들[사진순서] = reader.result;
                사진개수++;

                // 모든 파일 로드 완료 시
                if(사진개수 === files.length) {
                    // 미리보기화면에서 보일 수 있도록 setter 를 이용하여 미리보기 변수에 저장
                    setboardDetailImagePreviews(미리보기할_상세사진들);
                }
            };
            // 파일 하나씩 하나씩 미리보기 생성~
            reader.readAsDataURL(file);
        })

    }


    const handleCancel = () => {
        if (window.confirm("작성을 취소하시겠습니까?")) navigate('/board');
    }

    return (
        <div className="page-container">
            {isAuthenticated ? /* return 이 생략된 형태 */(
                <>
                    <h1>글쓰기</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="writer-section">
                            <label>작성자 :</label>
                            <div className="writer-display">
                                <span className="writer-email">{user?.memberName}</span>
                            </div>
                        </div>

                        <label>제목 :
                            <input type="text"
                                   id="title"
                                   name="title"
                                   value={board.title}
                                   onChange={handleChange}
                                   placeholder="제목을 입력하세요."
                                   maxLength={200}
                                   required
                            />
                        </label>

                        <div className="form-group">
                            <label htmlFor="imageUrl" className="btn-upload">
                                게시물 이미지 추가하기
                            </label>
                            <input
                                type="file"
                                id="imageUrl"
                                name="imageUrl"
                                ref={mainImgFileInputRef}
                                onChange={handleChangeImage(setboardMainImagePreview, setuploadedMainBoardImageFile, setBoard)}
                                accept="image/*"
                                style={{display: 'none'}}
                            />
                            <small className="form-hint">
                                게시물 이미지를 업로드 하세요. (최대 5MB, 이미지 파일만 가능)
                            </small>

                            {boardMainImagePreview && (
                                <div className="image-preview">
                                    <img
                                        src={boardMainImagePreview}
                                        alt="미리보기"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '400px',
                                            marginTop: '10px',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px',
                                            padding: '5px'
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 상세 이미지 여러 장 업로드 & 미리보기 */}
                        <div className="form-group">
                            <label htmlFor="detailImages" className="btn-upload">
                                상세 이미지 추가하기 (최대 5장)
                            </label>
                            <input
                            type="file"
                            id="detailImages"
                            name="detailImages"
                            ref={detailImgsFileInputRef}
                            onChange={handleDetailImagesChanges}
                            accept="image/*"
                            multiple
                            style={{display: 'none'}}
                            />
                            <small className="form-hint">
                                상세 이미지를 업로드하세요. (최대 5개, 각 5MB이하)
                            </small>

                            {boardDetailImagePreviews.length > 0 && (
                                <div className="multiple-images-preview">
                                    <p className="detail-images-selected-text">
                                        선택된 이미지 : {boardDetailImagePreviews.length} 개
                                    </p>
                                    {boardDetailImagePreviews.map((image, index) => (
                                        <div key={index} className="detail-image-item">
                                            <img src={image}
                                                 alt={`상세이미지 ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <label>내용 :
                            <textarea
                                id="content"
                                name="content"
                                value={board.content}
                                onChange={handleChange}
                                placeholder="내용을 입력하세요."
                                rows={15}
                                required
                            />
                        </label>
                        <div className="form-buttons">
                            <button type="submit"
                                    className="btn-submit">
                                작성하기
                            </button>
                            <button
                                type="button"
                                className="btn-cancel "
                                onClick={handleCancel}
                            >
                                돌아가기
                            </button>
                        </div>

                    </form>
                </>
            ) : (
                navigate('/login')
            )
            }
        </div>
    )
};


export default BoardWrite;