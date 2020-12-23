import { useState, useEffect, useRef } from 'react'
import { images } from '../utils/imgs'
import './Carousel.css'

const Carousel = () => {

    const [img, setImage] = useState({ index: 0, pause: false })

    const id = useRef()

    const handleLeftClick = () => {
        if (img.index === 0) {
            setImage({ index: images.length - 1, pause: true })
        } else setImage({ index: img.index - 1, pause: true })
    }

    const handleRightClick = () => {
        if (img.index === images.length - 1) {
            setImage({ index: 0, pause: true })
        } else setImage({ index: img.index + 1, pause: true })
    }

    useEffect(() => {
        if (img.pause) {
            clearInterval(id.current)
        } else {
            id.current = setInterval(() => {
                if (img.index === images.length - 1) {
                    setImage({ index: 0 })

                } else setImage({ index: img.index + 1 })
            }, 3000)
        }

        return () => clearInterval(id.current)
    }, [img])



    return (
        <div className='carousel-container'>
            <div className="carousel-inner" style={{ backgroundImage: `url(${images[img.index].url})` }}>
                <div className="left">
                    <i onClick={handleLeftClick} className="fas fa-angle-double-left fa-3x"></i>
                </div>
                <div className="center" >
                    {img.pause && <i onClick={() => setImage({ ...img, pause: false })} className="fa fa-play fa-2x"></i>}
                </div>
                <div onClick={handleRightClick} className="right">
                    <i className="fas fa-angle-double-right fa-3x"></i>
                </div>
            </div>
        </div>
    )
}

export default Carousel
