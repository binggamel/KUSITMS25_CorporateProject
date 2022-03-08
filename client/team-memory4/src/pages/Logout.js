import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { getApi } from "../api";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getLogout = async () => {
            await getApi({}, "/api/user/logout")
            .then(({ status, data }) => {
                console.log('status:', status);
                if(status === 200 || status === 201 || status === 204) {
                    navigate('/');
                    authContext.dispatch({
                        type: "logout",
                        token: null,
                        email: null,
                        name: null,
                        role: null,
                    });
                    alert('�α׾ƿ� �Ǿ����ϴ�.');
                    localStorage.clear();
                } else {
                    alert('�α׾ƿ��� �����߽��ϴ�. �ٽ� �õ����ּ���.');
                }
            })
            .catch((e) => {
                console.log(e);
            });
        };

        getLogout();

    }, [authContext, navigate]);

    return (
        <div>
            Logout
        </div>
    );
};

export default Logout;