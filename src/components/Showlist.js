import {useCallback, useRef} from "react"
import Lists from "./Lists"


function Showlist({datas, scrollOptions, setScrollOptions}){
    const fullContent = useRef();
    const childContent = useRef();
    
    const onScroll = useCallback(
      (event) => {
        const scrollAreaHeight = fullContent.current.clientHeight; // 한 눈에 보이는 스크롤 영역
        const myScroll = event.target.scrollTop + scrollAreaHeight; // 사용자의 스크롤 위치
        const childHeight = childContent.current.clientHeight; // 스크롤안의 아이템의 높이
        scrollOptions.fullHeight = event.nativeEvent.target.scrollHeight;
        const showMoreData = () => {
            setScrollOptions({ ...scrollOptions,
            childLength : scrollOptions.childLength + 30,
            fullHeight : childHeight * scrollOptions.childLength
          })
        }
  
        myScroll === scrollOptions.fullHeight && showMoreData(); // 사용자의 스크롤 영역이 하단에 도달했을때 shoowMoreData함수를 실행시킨다.
      }, [scrollOptions, setScrollOptions]
    )

    return(
        <div className="scroll-container" onScroll={onScroll} ref={fullContent}>
            {datas.map( (items) => (
                <div ref={childContent} key={items.id} className="scroll-children">
                    <Lists
                    id={items.id}
                    userName={items.user_name}
                    subject={items.subject}
                    create_date={items.create_date}
                    confirm={items.confirm}
                    />
                </div>
            ))
            }
        </div>
    );
}

export default Showlist