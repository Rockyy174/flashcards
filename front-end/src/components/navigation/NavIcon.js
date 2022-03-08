import { useEffect, useRef, useState } from 'react';
import {S3_BUCKET} from '../../constants/urls';

import css from '../../styles/navigation/Navbar.module.css';


const NavIcon = ({icon, iconSize, options}) => {
    const [showOptions, setShowOptions] = useState(false);

    const imgRef = useRef(null);
    const divRef = useRef(null);

    useEffect(() => {
        imgRef?.current?.style.setProperty('height', iconSize)

        const handleMousedown = e => {
            if(divRef.current && !divRef.current.contains(e.target)) {
                setShowOptions(false);
            }
        }

        window.addEventListener('mousedown', e => handleMousedown(e));

        return () => window.removeEventListener('mousedown', e => handleMousedown(e));
    }, [imgRef])

    return (
        <div onClick={() => setShowOptions(!showOptions)} ref={divRef} className={css.icon_container}>
            <img ref={imgRef} alt="" src={`${S3_BUCKET}icons/${icon}`}/>
            {showOptions && <div className={css.nav_options}>
                {options.map((item, idx) => {
                    return <span onClick={item.action} key={idx}>{item.text}</span>
                })}
            </div>}
        </div>
    )
}

export default NavIcon;