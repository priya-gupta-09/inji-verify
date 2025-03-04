import React from 'react';
import Navbar from "./Navbar";
import Copyrights from "./Copyrights";
import CheckingForInternetConnectivity from "../misc/CheckingForInternetConnectivity";
import Header from '../Home/Header';

const PageTemplate = (props: any) => {
    return (
        <div>
            <Navbar fromComposableBanking = {props.fromComposableBanking} />
            <div className="w-full bg-pageBackGroundColor text-center">
                <Header headerProps={props} />
            </div>
            {props.children}
            <Copyrights fromComposableBanking = {props.fromComposableBanking}/>
            <CheckingForInternetConnectivity/>
        </div>
    );
}

export default PageTemplate;
