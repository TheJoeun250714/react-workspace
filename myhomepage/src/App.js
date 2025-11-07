import React from 'react';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Board from "./pages/Board";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Write from "./pages/Write";
import './App.css';
// 단순히 가져와서 적용할 때는 from 생략
// 1. 라우팅에 필요한 컴포넌트 임포트
//    공통 스타일 임포트
// 2. useAuth 훅 임포트

function App() {
    return (
        <div className="App">
            {/* --- 5. 공통 내비게이션 바 --- */}
            <nav className="navbar">
                <Link to="/" className="logo">myhomepage</Link>
                <div className="nav-links">
                    <NavLink to="/">메인</NavLink>
                    <NavLink to="/board">게시판</NavLink>
                    <NavLink to="/write">글쓰기</NavLink>
                </div>

            </nav>

            {/* --- 6. 페이지가 렌더링될 영역 --- */}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/board" element={<Board />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/write" element={<Write />} />
            </Routes>
        </div>
    );
}

export default App;
