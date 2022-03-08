import React, { useState, useEffect, useContext } from 'react';
import { SearchBar } from '../components';
import { AuthContext } from '../App';
import axios from "axios";
import '../styles/Board.css';
import { getApi } from '../api';
import { useNavigate } from "react-router-dom";


const Board = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const initialList =
        [
            {
                "_id": "6226ecb59ae535d10e6e484c",
                "title": "제목1",
                "content": "내용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ\
                dlㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ이렇게 내용이 길면은ㅇ잘려요ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ\
                sdfㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇsdlflk",
                "postNumber": 1,
                "date": "2022-03-08 14:42:13"
            },
            {
                "_id": "6226ecba9ae535d10e6e4851",
                "title": "제목2",
                "content": "내용2",
                "postNumber": 2,
                "date": "2022-03-08 14:42:18"
            },
            {
                "_id": "6226ecbd9ae535d10e6e4856",
                "title": "제목3",
                "content": "내용3",
                "postNumber": 3,
                "date": "2022-03-08 14:42:21"
            }
        ];

    // const [list, setList] = useState([]);
    const [list, setList] = useState(initialList);

    const contentsClickHandler = (postNumber) => {  // 클릭 시 글 상세 페이지로 이동
        console.log(postNumber);
        navigate(`/post/${postNumber}`);
    }


    useEffect(() => {
        // setList([]);
        const getList = async () => {
            await getApi({},
                `/api/post/getAllPost`,
                authContext.state.token
                )
                .then(({ status, data }) => {
                    console.log(status, data);
                    if (data.allPost) {
                        setList(data.allPost);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        };
        getList();

        // const getPostList = async () => {
        //     const config = {
        //         headers: {
        //             "Content-type": "application/json",
        //             Accept: "application/json",
        //         },
        //     };
        //     // const token = authContext.state.token;
        //     // if (token) {
        //     //     config.headers["Authorization"] = `Bearer ${token}`;
        //     // }
        //     await axios.get(`http://--/api/post/getAllPost`, config)
        //         .then(({ status, data }) => {
        //             console.log(status, data);
        //             if (data.allPost) setList(data.allPost);
        //         })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // };
        // // getPostList();

    }, [authContext.state.token]);

    return (
        <div className='board-page'>
            {/* 추후 Search Bar */}
            <SearchBar />

            <div className="board-list-contents">
                {
                    list.length ?
                    list.map((e, idx) => (
                            <div 
                                className="content-section" 
                                key={idx}
                                onClick={() => contentsClickHandler(e.postNumber)}
                            >
                                <div className='content-section-contents'>
                                    <div className="content-section-title">{e.title}</div>
                                    <div className="content-section-content">{e.content}</div>
                                    <div className="content-section-date">{e.date}</div>
                                </div>
                            </div>
                        )) :
                        <div className="empty-title">
                            글 없음
                        </div>
                }
            </div>
        </div>
    );
};

export default Board;