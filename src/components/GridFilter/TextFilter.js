import React, { useRef, useState, useEffect, useCallback } from 'react';

const TextFilter = React.memo((props) => {

    const { onLoadedList, filterField } = props;

    const [filterValue, setFilterValue] = useState('');

    const filterRef = useRef();

    /************************** We are using useEffect for behavioral change management ****************************** */
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (filterValue === filterRef.current.value) {

    //             // const filteredList = loadedList.filter(elem => elem[filterField].toString().toLowerCase().includes(filterValue.toLowerCase()));

    //             onLoadedList(filterValue, filterField);

    //         }
    //     }, 500);
    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, [filterValue, filterRef, onLoadedList,filterField]);




    /********************************** This is the best solution as it renders
     *  only 3 times at the beginning and we'd 
     * still be able to set the timeout
     * **************** *********************************** */

    const searchHandler = useCallback((event) => {
        const val = event.target.value;
        setFilterValue(val);

        const timer = setTimeout(() => {
            if(val === filterRef.current.value){
                
                onLoadedList(val,filterField);
            }
            
        }, 500);

        return () => {
            clearTimeout(timer);
        }
      
    
    },[filterValue,filterRef,onLoadedList,filterField]);





    // const searchHandler = useCallback((event) => {

    //     setFilterValue(event.target.value);

    //     const timer = setTimeout(() => {
    //         if (event.target.value === filterRef.current.value) {

    //             // const filteredList = loadedList.filter(elem => elem[filterField].toString().toLowerCase().includes(filterValue.toLowerCase()));
    //             onLoadedList(event.target.value, filterField);

    //         }

    //     }, 500);

    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, [filterValue, filterField, onLoadedList]);

    return (
        <div>
            {/* <input ref={filterRef} type="text" value={filterValue} onChange={(event) => { setFilterValue(event.target.value) }} /> */}
            <input ref={filterRef} type="text" value={filterValue} onChange={searchHandler} />
        </div>
    )
});

export default TextFilter;