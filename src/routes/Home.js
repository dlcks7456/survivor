import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faFileCircleXmark } from '@fortawesome//free-solid-svg-icons'
import Showlist from "../components/Showlist"
import REST_API from "../config"
import Add from "../components/Add"

function Home({userName}){
    const [loading, setLoading] = useState(true);
    const dates = new Date()
    const [updateDate, setUpdateDate] = useState(dates.getTime());

    const [allList, setAllList] = useState([])
    const [datas, setDatas] = useState(null);

    const [cnt, setCnt] = useState(0);
    const [chkCnt, setChkCnt] = useState(0);


    const [filt, setFilt] = useState("all");
    const [sort, setSort] = useState("asc");

    const getData = async () => {
        let json = await (
            await fetch(`${REST_API}/lists`)
        ).json();

        setCnt(json.length.toLocaleString('ko-KR'));
        
        const confirm_cnt = json.filter( (items) => items.confirm == 1 );
        setChkCnt(confirm_cnt.length.toLocaleString('ko-KR'));

        if( filt !== "all" ){
            let confirmFilter = null;
            if( filt === "confirm" ){
                confirmFilter = 1;
            }
            if( filt === "notconfirm" ){
                confirmFilter = 0;
            }
            json = json.filter( (items) => items.confirm == confirmFilter);
        }

        if( sort === "desc" ){
            json = json.reverse();
        }

        setAllList(json);
        setLoading(false);
    }

    const [scrollOptions, setScrollOptions] = useState({
        childLength: 30, // 첫 렌더될 아이템의 개수
        fullHeight: 0, // 총 스크롤의 크기
    });

    useEffect( () => {
        setLoading(true);
        getData();
    }, [updateDate, filt, sort]);

    useEffect( () => {
        const sliceData = allList.slice(0, scrollOptions.childLength);
        setDatas(sliceData);
    },[allList, scrollOptions.childLength]);

    const AddUpdateDate = (updateDate) => {
        setUpdateDate(updateDate)
    }


    return (
        <div>
            <div style={{marginTop: "20px"}}>
                <Add updateDate={AddUpdateDate} filt={filt} setFilt={setFilt} sort={sort} setSort={setSort}/>
                <div className="container">
                {userName !== null ? <div style={{textAlign:"right", fontSize: "12px", marginBottom: "10px"}}>user : {userName}</div> : null}
                {loading ? <div className={"loading"}><FontAwesomeIcon icon={faSpinner} pulse/></div> :  
                    datas.length === 0 ? (
                        <div className={"nodata show-fade-in"}>
                            <div><FontAwesomeIcon icon={faFileCircleXmark} style={{fontSize:"50px"}}/></div>
                            <div style={{fontSize:"40px"}}>없어요 😱</div>
                        </div>
                        ) : 
                        <Showlist
                            datas={datas}
                            scrollOptions={scrollOptions}
                            setScrollOptions={setScrollOptions}/>
                }
                {loading ? null : 
                    datas.length === 0 ? null : (<div style={{textAlign: "center", marginTop: "50px"}}>총 <span style={{color:"#0d6efd"}}>{cnt}개</span>의 콘탠츠 중 <span style={{color:"#0d6efd"}}>{chkCnt}개</span> 확인 😃</div>)
                }
                </div>
            </div>
        </div>
    );
}

export default Home;