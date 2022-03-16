import React, { useState, useEffect, useContext } from "react";
import { getApi } from "../api";
import { AuthContext } from "../App";
import { Post } from '../components';



const MypageScrap = () => {
    let dumpdata = {
        "scraps": [
            1,    //postNumber�� ������.
            5
        ]
    };

    const authContext = useContext(AuthContext);
    const [myScrapList, setMyScrapList] = useState([]);

    useEffect(() => {
        const getMyScrap = async() => {
            await getApi(
                {},
                '/mypage/scrap',
                authContext.state.token
            )
            .then(({ status, data }) => {
                if (status === 200) {
                    console.log(data);
                    setMyScrapList(data.myPost);
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
        getMyScrap();
    }, []);

    return (
        <div>
            MypageScrap
        </div>
    )
}

export default MypageScrap; 