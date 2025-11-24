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
import {fetchAllBoards, goToPage} from "../context/scripts";

const Board = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetchAllBoards(axios,setBoards);
    }, []);

    const handleIDClick = (id) => {
        navigate(`/board/${id}`);
    }

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
                            <td onClick={() => handleIDClick(b.id)}>{b.id}</td>
                            <td onClick={() => handleIDClick(b.id)}>{b.title}</td>
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