// 전체 게시판
// 1. const Board = () => () -> {} 형태로 변경
// 2. useEffect 이용해서 8085/api/board/all 데이터 가져오기
//    axios.get 이용
// const [boards, setBoards] = useState([]);
//  boards 에 백엔드에서 가져온 데이터 데이터 추가
//


import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {fetchAllBoards, goToPage, renderLoading} from "../context/scripts";

const Board = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    // 데이터를 가져오기 전이기 때문에 로딩 활성화 상태로 설정
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // 백엔드 호출할 때 axios, 백엔드에서 res.data를 담아올 setBoards 변수이름만 전달, setLoading = true 형태로 전달
        fetchAllBoards(axios,   setBoards, setLoading);
    }, []);

    if(loading) return renderLoading('게시물 가져오는 중');

    /*
    * 게시물이 하나도 존재하지 않을 경우
    * 둘 중 편한 방법 사용
    *
    *  1. board 가 없는게 사실이라면 renderLoading 이용해서 상품을 찾을 수 없습니다. 표기
    *
    *  2. 삼항연산자를 이용해서 게시물의 length가 0 이하라면 false 에 renderLoading 표기 가능
    *
    *
    * */
        return (
        <div className="page-container">
            <div className="board-header">
                <h1>게시판</h1>
                <button className="button" onClick={() =>goToPage(navigate, '/witer')}>
                    글쓰기
                </button>
            </div>

            <div className="board-info">
                <p>전체 게시물: {boards.length}개</p>
            </div>

            <table className="board-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {/*
                        content: "nice to meet you!"
                        createdAt: "2025-11-07 11:38:18"
                        id: 11
                        popularUpdateAt: null
                        ranking: null
                        title: "hello"
                        updatedAt: "2025-11-07 11:38:18"
                        viewCount: 0
                        writer: "user1"
                    */}

                    {/*
                    1. 제목 클릭해도 게시물에 들어가도록 설정
                    2. error 해결

                     시도 방법
                     1. table 제목 눌렀을 때 link onClick 후
                    */}
                    {boards .map((b) => (
                        <tr key={b.id}>
                            <td onClick={() => goToPage(navigate, `/board/${b.id}`)}>{b.id}</td>
                            <td onClick={() => goToPage(navigate, `/board/${b.id}`)}>{b.title}</td>
                            <td>{b.writer}</td>
                            <td>{b.viewCount}</td>
                            <td>{b.createdAt}</td> {/* 2025-11-07 11:38:18  -> 2025-11-07*/}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default Board;